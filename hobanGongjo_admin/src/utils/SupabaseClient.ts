import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yawgyrcyxhdbgzjsbtqe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhd2d5cmN5eGhkYmd6anNidHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MjMxNTUsImV4cCI6MjA1NDQ5OTE1NX0.QX-LxbFJBLQkdXvdFt1aT1o8WC2_0Bl5hcnMXwAXVM4";

// Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCR7PnvdfXTIw_6zYIvby8caInNBeHxejQ",
//   authDomain: "hobangongjo.firebaseapp.com",
//   projectId: "hobangongjo",
//   storageBucket: "hobangongjo.firebasestorage.app",
//   messagingSenderId: "111042203701",
//   appId: "1:111042203701:web:23e4de8e60c658f44c217c",
//   measurementId: "G-7FT6K5LZKY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
