// firebase-messaging-sw.js

importScripts(
  "https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js"
);

// Firebase 앱 초기화
firebase.initializeApp({
  apiKey: "AIzaSyCR7PnvdfXTIw_6zYIvby8caInNBeHxejQ",
  authDomain: "hobangongjo.firebaseapp.com",
  projectId: "hobangongjo",
  storageBucket: "hobangongjo.firebasestorage.app",
  messagingSenderId: "111042203701",
  appId: "1:111042203701:web:e6a3e8dc68640fb84c217c",
  measurementId: "G-VCTCKT1PB2",
});

// FCM 메시징 인스턴스 가져오기
const messaging = firebase.messaging();

// 백그라운드 메시지 수신
messaging.onBackgroundMessage((payload) => {
  console.log("📩 백그라운드 푸시 알림 수신:", payload);

  // 알림 표시
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icons/apple-touch-icon-57x57", // 아이콘 경로
  });
});
