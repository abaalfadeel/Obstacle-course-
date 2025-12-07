const CACHE_NAME = 'mrunner-cache-v1';
const FILES = [
  '/',
  '/index.html',
  '/css/styles.css'
];
self.addEventListener('install', evt=>{
  evt.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', evt=> {
  evt.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', evt=>{
  evt.respondWith(caches.match(evt.request).then(res=>res || fetch(evt.request)));
});
