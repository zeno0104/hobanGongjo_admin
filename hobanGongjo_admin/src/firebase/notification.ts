import { getToken } from 'firebase/messaging';
import { messaging } from '../../core/notification/settingFCM';
import { supabase } from '../utils/SupabaseClient';
import { v4 as uuidv4 } from 'uuid';

export async function handleAllowNotification() {
  const permission = await Notification.requestPermission();
  
  if (permission === "granted") {
      console.log("알림 권한이 허용되었습니다.");
      registerServiceWorker();
      
      // 🔥 FCM 토큰을 받아서 saveFcmToken에 전달
      const fcmToken = await getDeviceToken();
      if (fcmToken) {
          await saveFcmToken(fcmToken);
      }
  } else if (permission === "denied") {
      console.log("알림 권한이 거부되었습니다.");
  } else {
      console.log("사용자가 알림 권한을 결정하지 않았습니다.");
  }
}

async function getDeviceToken(): Promise<string | null> {
  try {
      const currentToken = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_VAPID_KEY,
      });

      if (currentToken) {
          console.log("토큰: ", currentToken);
          return currentToken; // 🔥 토큰을 반환하도록 수정
      } else {
          console.log("토큰을 가져오지 못했습니다. 권한을 다시 요청하세요.");
          return null;
      }
  } catch (err) {
      console.error("토큰을 가져오는 중 에러 발생: ", err);
      return null;
  }
}

function registerServiceWorker() {
    navigator.serviceWorker
      .register("firebase-messaging-sw.js")
      .then(function (registration) {
        console.log("Service Worker 등록 성공:", registration);
      })
      .catch(function (error) {
        console.log("Service Worker 등록 실패:", error);
      });
}

function getOrCreateUserId() {
  let userId = localStorage.getItem('user_id');
  
  if (!userId) {
    userId = uuidv4(); // 새로운 UUID 생성
    localStorage.setItem('user_id', userId);
  }
  
  return userId;
}

async function saveFcmToken(fcmToken: string) {
  const userId = getOrCreateUserId();
  
  // `fcm_token`과 `user_id`를 `localStorage`에 저장
  localStorage.setItem('fcm_token', fcmToken);

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: userId, fcm_token: fcmToken });  // Upsert to avoid duplicates

  if (error) {
      console.error("Error saving FCM token:", error);
  } else {
      console.log("FCM token saved successfully!");
  }
}
