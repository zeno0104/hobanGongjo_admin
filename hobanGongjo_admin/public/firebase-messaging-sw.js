// importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");
// const firebaseConfig = {
//   apiKey: "AIzaSyCR7PnvdfXTIw_6zYIvby8caInNBeHxejQ",
//   authDomain: "hobangongjo.firebaseapp.com",
//   projectId: "hobangongjo",
//   storageBucket: "hobangongjo.firebasestorage.app",
//   messagingSenderId: "111042203701",
//   appId: "1:111042203701:web:23e4de8e60c658f44c217c",
//   measurementId: "G-7FT6K5LZKY",
// };
// firebase.initializeApp(firebaseConfig);
self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
