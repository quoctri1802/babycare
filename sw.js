const CACHE_NAME = 'baby-care-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './style.css',
  './main.js'
];

// Cài đặt và lưu trữ các file tĩnh cơ bản
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Dùng return cache.addAll(STATIC_ASSETS).catch(...) để tránh lỗi nếu file chưa có
      return cache.addAll(STATIC_ASSETS).catch(err => console.log('Cài đặt cache lỗi:', err));
    })
  );
  self.skipWaiting();
});

// Kích hoạt và dọn dẹp cache cũ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Chiến lược: Network First, falling back to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Sao lưu bản copy vào cache để dùng lần sau
        const resClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Mẹ ơi!', body: 'Đến giờ chăm sóc bé rồi nhé!' };
  const options = {
    body: data.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069172.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3069/3069172.png',
    vibrate: [200, 100, 200]
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
