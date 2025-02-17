import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "../core/notification/settingFCM";

// 서비스 워커 등록 (PWA 새로고침 문제 해결)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service Worker registered successfully:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
