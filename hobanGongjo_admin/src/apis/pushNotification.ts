import { requestNotificationPermission } from "../notifications";
import { supabase } from "../utils/SupabaseClient";

export async function listenForNewRequests() {
  await requestNotificationPermission(); // 푸시 알림 권한 요청
  console.log("푸시 알림 활성화 했다!!!!");
  supabase
    .channel("guest")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "guest" },
      (payload: { new: Data }) => {
        // any로 받아서, 나중에 강제로 Data 타입으로 바꿔줌
        const newRequest = payload.new as Data; // 타입 단언을 사용해서 Data 타입으로 변환
        console.log("새로운 상담 요청 감지:", newRequest);
        sendPushNotification(newRequest); // 타입 맞춰서 전달
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
  console.log(data, "data다");
  if (Notification.permission === "granted") {
    new Notification("새 상담 신청!", {
      body: `${data.name}님이 상담을 신청했습니다.`,
    });
  } else {
    console.warn("알림 권한이 없습니다.");
  }
}
