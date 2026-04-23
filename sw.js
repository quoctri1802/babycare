const CACHE_NAME = 'baby-care-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Nhắc nhở bé', body: 'Đến giờ chăm sóc bé rồi mẹ ơi!' };
  const options = {
    body: data.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069172.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3069/3069172.png',
    vibrate: [200, 100, 200]
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
