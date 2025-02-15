import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";
import "https://deno.land/std@0.168.0/dotenv/load.ts";
import { decode } from "https://deno.land/std@0.168.0/encoding/base64.ts";
console.log("✅ Edge Function 실행됨!");

serve(async (req) => {
  try {
    const { record } = await req.json();
    console.log("📌 새로운 상담 요청 감지:", record);

    if (!record.fcmToken) {
      console.error("❌ FCM 토큰이 없습니다.");
      return new Response("FCM 토큰이 없습니다.", { status: 400 });
    }

    const accessToken = await getAccessToken();
    console.log("🔑 FCM 액세스 토큰:", accessToken);

    const FCM_ENDPOINT = `https://fcm.googleapis.com/v1/projects/${import.meta.env.VITE_PROJECT_ID}/messages:send`;

    const message = {
      message: {
        token: record.fcmToken, // 🔥 요청에서 받은 FCM 토큰 사용
        notification: {
          title: "새로운 상담 요청",
          body: `${record.name}님이 상담을 요청했습니다.`,
        },
      },
    };

    const response = await fetch(FCM_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();
    console.log("📌 FCM 응답:", result);

    return new Response("푸시 알림 전송 완료!", { status: 200 });
  } catch (error) {
    console.error("❌ Edge Function 오류:", error);
    return new Response("에러 발생", { status: 500 });
  }
});

// 🔥 Firebase OAuth 2.0 액세스 토큰 가져오기


async function getAccessToken() {
  const privateKey = import.meta.env.VITE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = import.meta.env.VITE_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error("❌ 환경 변수에서 Firebase 서비스 계정 정보를 찾을 수 없습니다.");
  }

  const jwtHeader = {
    alg: "RS256",
    typ: "JWT",
  };

  const jwtClaimSet = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000),
  };

  const encoder = new TextEncoder();
  const headerBase64 = encode(JSON.stringify(jwtHeader));
  const payloadBase64 = encode(JSON.stringify(jwtClaimSet));
  const unsignedToken = `${headerBase64}.${payloadBase64}`;

  // 🔐 JWT 서명 (OpenSSL 방식으로 직접 변환)
  const keyBuffer = decode(privateKey); // Base64 디코딩
  const key = await crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, encoder.encode(unsignedToken));
  const jwt = `${unsignedToken}.${encode(new Uint8Array(signature))}`;

  // 🔑 OAuth 2.0 액세스 토큰 요청
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json();
  return data.access_token;
}

