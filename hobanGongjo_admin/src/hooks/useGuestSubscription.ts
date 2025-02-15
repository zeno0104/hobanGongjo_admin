import { useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";

export default function useGuestSubscription() {
  useEffect(() => {
    console.log("🔔 useGuestSubscription 실행됨!");

    const guestSubscription = supabase
      .channel("guest-channel") // ✅ 최신 방식
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guest" },
        (payload) => {
          console.log("✨ 새로운 상담 요청 감지:", payload.new);
          sendPushNotification(payload.new);
        }
      )
      .subscribe();

    return () => {
      console.log("🛑 구독 해제됨!");
      supabase.removeChannel(guestSubscription);
    };
  }, []);
}

async function sendPushNotification(data: any) {
  console.log("🚀 푸시 알림 전송 시도!");

  if (Notification.permission === "granted") {
    new Notification("새로운 상담 요청", {
      body: `${data.name}님이 상담을 요청했습니다.`,
    });
    console.log("✅ 푸시 알림 전송 완료!");
  } else {
    console.log("❌ 알림 권한이 허용되지 않음.");
  }
}
