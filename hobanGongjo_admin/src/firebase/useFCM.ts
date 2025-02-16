import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../core/notification/settingFCM";

export function useFCM() {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("📩 FCM 메시지 수신:", payload);

      const title = payload?.notification?.title || payload?.data?.title || "알림";
      const body = payload?.notification?.body || payload?.data?.body || "새로운 알림이 있습니다.";

      // 🔥 브라우저 알림 표시
      new Notification(title, { body });
    });

    return () => unsubscribe(); // Cleanup (메모리 누수 방지)
  }, []);
}
