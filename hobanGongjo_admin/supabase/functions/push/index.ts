import { createClient } from 'npm:@supabase/supabase-js@2'
import { JWT } from 'npm:google-auth-library@9'
import serviceAccount from '../service-account.json' with { type: 'json' }

interface WebhookPayload {
  type: 'INSERT'
  table: string
  record: {
    id: string  // 새로 추가된 알림 ID
    body: string // 알림 메시지 내용
  }
  schema: 'public'
}

// ✅ Supabase 클라이언트 생성
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  try {
    const payload: WebhookPayload = await req.json()
    console.log("📩 Webhook Payload:", payload)

    // 🔥 모든 Admin의 FCM 토큰 가져오기 (`role = 'admin'`)
    const { data, error } = await supabase
      .from('profiles')
      .select('fcm_token')
      .eq('role', 'admin')

    if (error || !data || data.length === 0) {
      console.error("❌ Admin의 FCM 토큰을 찾을 수 없음:", error)
      return new Response(JSON.stringify({ error: "Admin의 FCM 토큰이 없음" }), { status: 400 })
    }

    const fcmTokens = data.map((row) => row.fcm_token) // 🔥 모든 Admin의 FCM 토큰 리스트
    console.log("📨 FCM Tokens:", fcmTokens)

    // 🔥 Firebase Access Token 생성
    const accessToken = await getAccessToken({
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    })

    // 🔥 모든 Admin에게 푸시 알림 전송
    for (const fcmToken of fcmTokens) {
      await sendPushNotification(fcmToken, payload.record.body, accessToken)
    }

    return new Response(JSON.stringify({ message: "FCM 전송 성공" }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error("🔥 알 수 없는 오류 발생:", err)
    return new Response(JSON.stringify({ error: "서버 오류 발생" }), { status: 500 })
  }
})

// ✅ FCM 알림 전송 함수 (여러 개의 토큰에 대해 반복 실행됨)
const sendPushNotification = async (fcmToken: string, body: string, accessToken: string) => {
  try {
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
              title: `호반공조 알리미`,
              body: body,  // Webhook에서 받은 메시지
            },
          },
        }),
      }
    )

    const resData = await res.json()
    if (res.status < 200 || res.status > 299) {
      throw resData
    }

    console.log(`✅ FCM 전송 성공 (Token: ${fcmToken}):`, resData)
  } catch (error) {
    console.error(`❌ FCM 전송 실패 (Token: ${fcmToken}):`, error)
  }
}

// ✅ Firebase Access Token 생성 함수
const getAccessToken = ({
  clientEmail,
  privateKey,
}: {
  clientEmail: string
  privateKey: string
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const jwtClient = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
    })
    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err)
        return
      }
      resolve(tokens!.access_token!)
    })
  })
}
