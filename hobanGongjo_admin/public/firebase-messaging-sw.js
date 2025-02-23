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

  const notificationTitle = pushData.data?.title || "알림";
  const notificationOptions = {
    body: pushData.data?.body || "새로운 알림이 있습니다.",
    icon: "/hoban_logo.jpg",
    data: { url: pushData.data?.screen || "/" }, // 클릭 시 이동할 URL 저장
    requireInteraction: true, // 알림이 자동으로 사라지지 않도록 설정
    vibrate: [200, 100, 200], // 진동 효과 추가
    badge: "/hoban_logo.jpg", // 배지 아이콘 설정 (상단바에 표시되는 아이콘)
    priority: "high", // 알림 우선순위를 높게 설정
  };

  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // 알림 닫기

  // 클릭하면 이동할 URL (기본값: 루트 "/")
  const urlToOpen = event.notification.data?.screen || "/";

  const promiseChain = clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(urlToOpen)) {
          return client.focus();
        }
      }
      return clients.openWindow(urlToOpen);
    });

  event.waitUntil(promiseChain);
});
