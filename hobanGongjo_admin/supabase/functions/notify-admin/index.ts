import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { initializeApp, cert } from "npm:firebase-admin/app"
import { getMessaging } from "npm:firebase-admin/messaging"

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

initializeApp({
  credential: cert(JSON.parse(Deno.env.get('FIREBASE_SERVICE_ACCOUNT_KEY')!))
})

serve(async (req) => {
  const { record } = await req.json()
  
  const { data: tokens } = await supabase
    .from('fcm_tokens')
    .select('token')

  console.log(tokens);

  if (tokens && tokens.length > 0) {
    const message = {
      notification: {
        title: '새로운 상담 요청',
        body: `${record.name}님의 새로운 상담 요청이 있습니다.`,
      },
      tokens: tokens.map(t => t.token),
    }

    try {
      const response = await getMessaging().sendMulticast(message)
      console.log('Successfully sent message:', response)
      return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error) {
      console.log('Error sending message:', error)
      return new Response(JSON.stringify({ success: false, error }), { status: 500 })
    }
  }

  return new Response(JSON.stringify({ success: false, error: 'No FCM tokens found' }), { status: 404 })
})
