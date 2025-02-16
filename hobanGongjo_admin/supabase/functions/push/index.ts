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

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  try {
    const payload: WebhookPayload = await req.json()
    console.log("📩 Webhook Payload:", payload)

    // 🔥 Admin의 FCM 토큰 가져오기 (profiles 테이블에서 id=Admin UUID)
    const { data, error } = await supabase
      .from('profiles')
      .select('fcm_token')
      .eq('id', "ae359e55-71e0-4b66-883d-6b16a7ae68a2")  // Admin ID (고정)
      .single()

    if (error || !data || !data.fcm_token) {
      console.error("❌ FCM 토큰을 찾을 수 없음:", error)
      return new Response(JSON.stringify({ error: "Admin의 FCM 토큰이 없음" }), { status: 400 })
    }

    const fcmToken = data.fcm_token as string
    console.log("📨 FCM Token:", fcmToken)

    const accessToken = await getAccessToken({
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    })

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
              title: `새로운 알림`,
              body: payload.record.body,
            },
          },
        }),
      }
    )

    const resData = await res.json()
    if (res.status < 200 || res.status > 299) {
      throw resData
    }

    console.log("✅ FCM 전송 성공:", resData)

    return new Response(JSON.stringify(resData), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error("🔥 알 수 없는 오류 발생:", err)
    return new Response(JSON.stringify({ error: "서버 오류 발생" }), { status: 500 })
  }
})

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
