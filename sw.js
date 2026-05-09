const CACHE_NAME = 'que-cocino-v2';
const STATIC_ASSETS = [
  '/cocinando/',
  '/cocinando/index.html',
  '/cocinando/offline.html',
  '/cocinando/manifest.json',
  '/cocinando/favicon.ico',
  '/cocinando/icons/icon-192.png',
  '/cocinando/icons/icon-512.png'
];

// ─── INSTALL: pre-cache shell ─────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Silently fail if some assets aren't available yet
      });
    }).then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE: clean old caches ──────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ─── FETCH: network-first with cache fallback ─────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin API requests (like Anthropic API)
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts')) return;

  // Google Fonts: cache-first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // App shell: network-first, fallback to cache
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then(cached => {
          if (cached) return cached;
          // Offline fallback for navigation
          if (request.mode === 'navigate') {
            return caches.match('/cocinando/offline.html') || caches.match('/cocinando/index.html');
          }
        });
      })
  );
});

// ─── BACKGROUND SYNC (for future use) ────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-favorites') {
    // Placeholder for future sync functionality
  }
});

// ─── PUSH NOTIFICATIONS (for future use) ─────────────────────────────
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title || '¿Qué cocino hoy?', {
    body: data.body || 'Tenés una nueva sugerencia de comida 🍽',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-96.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' }
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/cocinando/')
  );
});
