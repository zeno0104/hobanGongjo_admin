import { supabase } from "../utils/SupabaseClient";
import { requestNotificationPermission } from "../firebase/notifications";

export async function listenForNewRequests() {
  await requestNotificationPermission();

  supabase
    .channel("guest")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "guest" },
      (payload) => {
        console.log("새 상담 요청 감지:", payload.new);

        // payload.new를 Data 타입으로 단언
        const data = payload.new as Data;
        sendPushNotification(data);
      }
    )
    .subscribe();
}

type Data = {
  content: string;
  created_at: string;
  id: number;
  install_location: string;
  install_type: string;
  is_counsel_completed: boolean;
  is_reserve_completed: boolean;
  name: string;
  phone_number: string;
  region: string;
  type: string;
};

async function sendPushNotification(data: Data) {
  if (Notification.permission === "granted") {
    new Notification("새 상담 신청!", {
      body: `${data.name}님이 상담을 신청했습니다.`,
    });
  }
}
