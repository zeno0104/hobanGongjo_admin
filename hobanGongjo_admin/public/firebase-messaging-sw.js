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

  const notificationTitle =
    pushData.notification?.title || pushData.data?.title || "알림";
  const notificationOptions = {
    body:
      pushData.notification?.body ||
      pushData.data?.body ||
      "새로운 알림이 있습니다.",
    icon: "/hoban_logo.jpg", // 아이콘에 이미지 추가
    image: "/hoban_logo.jpg", // 알림 본문에 이미지 추가
  };

  console.log("📩 알림 데이터:", notificationTitle, notificationOptions);

  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});
self.addEventListener("notificationclick", function (event) {
  event.preventDefault();
  // 알림창 닫기
  event.notification.close();

  // 이동할 url
  // 아래의 event.notification.data는 위의 푸시 이벤트를 한 번 거쳐서 전달 받은 options.data에 해당한다.
  // api에 직접 전달한 데이터와 혼동 주의
  const urlToOpen = event.notification.data.click_action;

  // 클라이언트에 해당 사이트가 열려있는지 체크
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then(function (windowClients) {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          matchingClient = windowClient;
          break;
        }
      }

      // 열려있다면 focus, 아니면 새로 open
      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
