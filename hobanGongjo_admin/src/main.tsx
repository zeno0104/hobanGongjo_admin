<<<<<<< HEAD
import "../core/notification/settingFCM";
=======
>>>>>>> parent of f9133b9 ([Update] 푸시 알리미)
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./firebase/firebase.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
