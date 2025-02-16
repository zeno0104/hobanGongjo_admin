import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from '../../core/notification/settingFCM';

export function useFCM() {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("📩 FCM 메시지 수신:", payload);

      if (payload.data) {
        const { title, body } = payload.data;

        // 🔥 직접 알림 표시
        new Notification(title, { body });
      }
    });

    return () => unsubscribe(); // Cleanup (메모리 누수 방지)
  }, []);
}
