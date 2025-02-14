// // firebase-messaging-sw.js

// importScripts(
//   "https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js"
// );

// // Firebase 앱 초기화
// firebase.initializeApp({
//   apiKey: "AIzaSyCR7PnvdfXTIw_6zYIvby8caInNBeHxejQ",
//   authDomain: "hobangongjo.firebaseapp.com",
//   projectId: "hobangongjo",
//   storageBucket: "hobangongjo.firebasestorage.app",
//   messagingSenderId: "111042203701",
//   appId: "1:111042203701:web:e6a3e8dc68640fb84c217c",
//   measurementId: "G-VCTCKT1PB2",
// });

// // FCM 메시징 인스턴스 가져오기
// const messaging = firebase.messaging();

// // 백그라운드 메시지 수신
// messaging.onBackgroundMessage((payload) => {
//   console.log("📩 백그라운드 푸시 알림 수신:", payload);

//   // 알림 표시
//   self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//     icon: "/icons/apple-touch-icon-57x57", // 아이콘 경로
//   });
// });
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  // 필요한 정보 입력
  apiKey: "AIzaSyCR7PnvdfXTIw_6zYIvby8caInNBeHxejQ",
  authDomain: "hobangongjo.firebaseapp.com",
  projectId: "hobangongjo",
  storageBucket: "hobangongjo.firebasestorage.app",
  messagingSenderId: "111042203701",
  appId: "1:111042203701:web:e6a3e8dc68640fb84c217c",
  measurementId: "G-VCTCKT1PB2",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

/**
 * messaging.onBackgroundMessage - 앱 사용하지 않는 중 메시지 수신 (백그라운드)
 */

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // 알림 닫기

  const landing_url = event.notification.data;
  const newPath = landing_url ? landing_url : `/chat`;

  const urlToOpen = new URL(
    `https://주소${"hoban-gongjo-notification.vercel.app"}`
  );

  // 비동기 작업을 수행하기 위한 메서드로 아래 Promise가 완료될 때까지 이벤트 수명을 연장
  event.waitUntil(
    clients // 서비스 워커에서 현재 제어하는 클라이언트 목록
      .matchAll({
        type: "window",
        includeUncontrolled: true, // 제어하고 있지 않은 클라이언트까지 포함 (백그라운드)
      })
      .then((windowClients) => {
        let foundWindowClient = null;
        // 이미 열려 있는 창에서 서비스와 관련된 URL을 찾기 위한 로직 추가
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];

          if (
            new URL(client.url).hostname.includes("docent") &&
            "focus" in client
          ) {
            foundWindowClient = client;
            break;
          }
        }

        // 만약 백그라운드에 해당 서비스가 있다면
        if (foundWindowClient) {
          // 해당 탭을 focus하여 이동시킴
          return foundWindowClient.focus().then((focusedClient) => {
            if ("navigate" in focusedClient) {
              // 원하는 주소로 이동
              focusedClient.postMessage(urlToOpen.href);
            }
          });

          // 그게 아니라면 새창을 열어서 원하는 URL로 이동시킴
        } else if (clients.openWindow) {
          return clients.openWindow(urlToOpen.href);
        }
      })
  );
});

messaging.onBackgroundMessage(function (payload) {
  // FCM 백그라운드 메시지 메서드

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    image: payload.data.image_url,
    icon: "주소/icon.png",
    data: payload.data.landing_url, // 클릭 이벤트 핸들링을 위해 data에 url 주소 넣어주기
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
