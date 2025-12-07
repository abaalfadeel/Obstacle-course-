self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("runner-game").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/css/styles.css",
        "/js/main.js"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
