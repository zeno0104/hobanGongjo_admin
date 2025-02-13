importScripts(
  "https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCR7PnvdfXTIw_6zYIvby8caInNBeHxejQ",
  authDomain: "hobangongjo.firebaseapp.com",
  projectId: "hobangongjo",
  storageBucket: "hobangongjo.firebasestorage.app",
  messagingSenderId: "111042203701",
  appId: "1:111042203701:web:23e4de8e60c658f44c217c",
  measurementId: "G-7FT6K5LZKY",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] 백그라운드에서 메시지 수신: ",
    payload
  );

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/hoban_logo.jpg",
  });
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker 등록 성공:", registration);
    })
    .catch((error) => {
      console.error("Service Worker 등록 실패:", error);
    });
}
