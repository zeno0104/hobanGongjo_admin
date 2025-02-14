import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

export async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BPFSOm498XIcQEO53qcTksmAFTT-LxSdLm3nrnXr0N1Wpwv-OG4INTtg6KdqJp3XzbZTnewzDj2vj6ULM6bkTxE",
    });
    console.log("FCM Token:", token);
  }
}
