// import { getMessaging, getToken } from "firebase/messaging";
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCR7PnvdfXTIw_6zYIvby8caInNBeHxejQ",
//   authDomain: "hobangongjo.firebaseapp.com",
//   projectId: "hobangongjo",
//   storageBucket: "hobangongjo.firebasestorage.app",
//   messagingSenderId: "111042203701",
//   appId: "1:111042203701:web:e6a3e8dc68640fb84c217c",
//   measurementId: "G-VCTCKT1PB2",
// };

// const app = initializeApp(firebaseConfig);

// // Firebase Messaging 초기화
// const messaging = getMessaging(app);
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCR7PnvdfXTIw_6zYIvby8caInNBeHxejQ",
  authDomain: "hobangongjo.firebaseapp.com",
  projectId: "hobangongjo",
  storageBucket: "hobangongjo.firebasestorage.app",
  messagingSenderId: "111042203701",
  appId: "1:111042203701:web:e6a3e8dc68640fb84c217c",
  measurementId: "G-VCTCKT1PB2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// // FCM 토큰 가져오기

// messaging을 export하여 다른 파일에서 사용할 수 있도록 함
export { getFcmToken };
const getFcmToken = async () => {
  try {
    const token = await getToken(getMessaging(app), {
      vapidKey:
        "BPFSOm498XIcQEO53qcTksmAFTT-LxSdLm3nrnXr0N1Wpwv-OG4INTtg6KdqJp3XzbZTnewzDj2vj6ULM6bkTxE",
    });
    if (token) {
      console.log("FCM Token:", token);
    } else {
      console.log("FCM 토큰을 받을 수 없습니다.");
    }
  } catch (error) {
    console.error("FCM 토큰 가져오기 실패:", error);
  }
};
