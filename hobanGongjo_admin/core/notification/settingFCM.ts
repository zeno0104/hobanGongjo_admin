import { initializeApp } from "firebase/app";
import { getMessaging } from 'firebase/messaging';
const firebaseConfig = {
  apiKey: "AIzaSyASii34KA75psfB3F78ZrdbTKzF-AOVPsc",
  authDomain: "hobangongjo-ee302.firebaseapp.com",
  projectId: "hobangongjo-ee302",
  storageBucket: "hobangongjo-ee302.firebasestorage.app",
  messagingSenderId: "21697129732",
  appId: "1:21697129732:web:0cebd39d503f9aee6ef451",
  measurementId: "G-5Q8KDZC86Z"
};


const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);