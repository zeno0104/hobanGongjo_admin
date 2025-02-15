import { getToken } from "firebase/messaging";
import { messaging } from "../core/notification/settingFCM";
function registerServiceWorker() {
  navigator.serviceWorker
    .register("firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Service Worker 등록 성공:", registration);
      // alert(`Service Worker 등록 성공:, ${registration}`);
    })
    .catch(function (error) {
      console.log("Service Worker 등록 실패:", error);
      // alert(`Service Worker 등록 실패:, ${error}`);
    });
}

async function getDeviceToken() {
  // 권한이 허용된 후에 토큰을 가져옴
  await getToken(messaging, {
    vapidKey:
      "BPFSOm498XIcQEO53qcTksmAFTT-LxSdLm3nrnXr0N1Wpwv-OG4INTtg6KdqJp3XzbZTnewzDj2vj6ULM6bkTxE",
  })
    .then((currentToken) => {
      if (currentToken) {
        // 토큰을 서버로 전송하거나 UI 업데이트
        console.log("토큰: ", currentToken);
        // alert("토큰: " + currentToken);
      } else {
        console.log("토큰을 가져오지 못했습니다. 권한을 다시 요청하세요.");
      }
    })
    .catch((err) => {
      // alert(err);
      console.log("토큰을 가져오는 중 에러 발생: ", err);
    });
}
export async function handleAllowNotification() {
  const permission = await Notification.requestPermission();
  registerServiceWorker();
  if (permission === "granted") {
    console.log("알림 권한이 허용되었습니다.");
  } else if (permission === "denied") {
    console.log("알림 권한이 거부되었습니다.");
  } else {
    console.log("사용자가 알림 권한을 결정하지 않았습니다.");
  }
  await getDeviceToken();
}
