self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function () {
  console.log("✅ FCM Service Worker Activated!");
});

self.addEventListener("push", function (e) {
  if (!e.data) return;

  const pushData = e.data.json();
  console.log("🔹 Push Event Data:", pushData);

  // `notification` 또는 `data`에서 알림 데이터 가져오기
  const notificationTitle =
    pushData.notification?.title || pushData.data?.title || "알림";
  const notificationOptions = {
    body:
      pushData.notification?.body ||
      pushData.data?.body ||
      "새로운 알림이 있습니다.",
  };

  console.log("📩 알림 데이터:", notificationTitle, notificationOptions);

  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});
