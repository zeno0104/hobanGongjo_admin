import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 원하는 포트 설정
  },
  build: {
    outDir: "dist", // 빌드 디렉토리 설정
  },
  base: "/", // 기본 URL 설정 (PWA에서 필요)
});
