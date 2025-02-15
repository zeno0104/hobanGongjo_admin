import { initializeApp } from "firebase/app";
import { getMessaging } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbRsPauX2VVBTKSUWU2d8fscMgdDST8rg",
  authDomain: "hobangongjo-bd4e8.firebaseapp.com",
  projectId: "hobangongjo-bd4e8",
  storageBucket: "hobangongjo-bd4e8.firebasestorage.app",
  messagingSenderId: "941615083789",
  appId: "1:941615083789:web:57e1c021c3a3b860234044",
  measurementId: "G-FF2EYNH5LE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);