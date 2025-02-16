import { createClient } from 'npm:@supabase/supabase-js@2';
import { JWT } from 'npm:google-auth-library@9';
import serviceAccount from '../service-account.json' with { type: 'json' };

interface Notification {
  id: string;
  user_id: string;
  body: string;
}

interface WebhookPayload {
  type: 'INSERT';
  table: string;
  record: Notification;
  schema: 'public';
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  try {
    // 🔹 Webhook Payload 확인
    const payload: WebhookPayload = await req.json();
    console.log("🚀 Webhook Payload 수신:", JSON.stringify(payload, null, 2));

    // 🔹 user_id가 존재하는지 확인
    if (!payload.record?.user_id) {
      console.error("❌ 오류: user_id가 Webhook Payload에 없음");
      return new Response(JSON.stringify({ error: "user_id가 존재하지 않습니다" }), { status: 400 });
    }

    // 🔹 Supabase에서 fcm_token 가져오기
    const { data, error } = await supabase
      .from('profiles')
      .select('fcm_token')
      .eq('id', payload.record.user_id)
      .single();

    console.log("🔍 Supabase Query Result:", data, error);

    if (error) {
      console.error("❌ Supabase 오류:", error.message);
      return new Response(JSON.stringify({ error: "Supabase 쿼리 실패", details: error.message }), { status: 500 });
    }

    if (!data || !data.fcm_token) {
      console.error("❌ 오류: FCM 토큰이 존재하지 않음");
      return new Response(JSON.stringify({ error: "해당 user_id의 FCM 토큰이 없습니다" }), { status: 404 });
    }

    const fcmToken = data.fcm_token;
    console.log("✅ FCM Token:", fcmToken);

    // 🔹 FCM 토큰을 이용해 푸시 알림 전송
    const accessToken = await getAccessToken({
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    });

    const res = await fetch(
      `https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          message: {
            token: fcmToken,
            notification: {
              title: `Notification from Supabase`,
              body: payload.record.body,
            },
          },
        }),
      }
    );

    const resData = await res.json();
    console.log("📩 FCM Response:", JSON.stringify(resData, null, 2));

    if (res.status < 200 || res.status > 299) {
      console.error("❌ FCM 전송 오류:", resData);
      return new Response(JSON.stringify({ error: "FCM 전송 실패", details: resData }), { status: res.status });
    }

    return new Response(JSON.stringify({ success: true, fcmResponse: resData }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("❌ 서버 오류:", err);
    return new Response(JSON.stringify({ error: "서버 내부 오류", details: err.message }), { status: 500 });
  }
});

const getAccessToken = ({
  clientEmail,
  privateKey,
}: {
  clientEmail: string;
  privateKey: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const jwtClient = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
    });
    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens!.access_token!);
    });
  });
};
