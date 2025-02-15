// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const messaging = getMessaging(app);
