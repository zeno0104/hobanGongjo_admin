import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCR7PnvdfXTIw_6zYIvby8caInNBeHxejQ",
  authDomain: "hobangongjo.firebaseapp.com",
  projectId: "hobangongjo",
  storageBucket: "hobangongjo.firebasestorage.app",
  messagingSenderId: "111042203701",
  appId: "1:111042203701:web:23e4de8e60c658f44c217c",
  measurementId: "G-7FT6K5LZKY",
};
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("✅ 서비스 워커 등록 완료:", registration);
    })
    .catch((err) => console.log("❌ 서비스 워커 등록 실패:", err));
}

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
