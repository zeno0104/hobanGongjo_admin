import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

export async function requestNotificationPermission() {
  console.log("🔔 알림 권한 요청 중...");

  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("✅ 알림 권한 허용됨");

      const token = await getToken(messaging, {
        vapidKey:
          "BPFSOm498XIcQEO53qcTksmAFTT-LxSdLm3nrnXr0N1Wpwv-OG4INTtg6KdqJp3XzbZTnewzDj2vj6ULM6bkTxE",
      });

      if (token) {
        console.log("✅ FCM Token:", token);
        return token;
      } else {
        console.error("❌ FCM 토큰을 가져오지 못했습니다.");
      }
    } else {
      console.warn("🚫 알림 권한이 거부되었습니다.");
    }
  } catch (error) {
    console.error("⚠️ FCM 토큰 요청 중 오류 발생:", error);
  }
}
