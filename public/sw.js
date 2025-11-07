const CACHE_NAME = 'markdown-editor-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instalar o service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Ativar o service worker e limpar caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia: Cache First, falling back to Network
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Fallback para arquivo offline se houver
        return caches.match('/offline.html').catch(() => {
          return new Response('Offline - Application not available');
        });
      });
    })
  );
});

// Sincronização em background
self.addEventListener('sync', event => {
  if (event.tag === 'sync-documents') {
    event.waitUntil(syncDocuments());
  }
});

const syncDocuments = async () => {
  try {
    const data = await getAllStorageData();
    // Aqui você enviaria dados para seu backend
    console.log('Sincronizando documentos:', data);
  } catch (error) {
    console.error('Erro ao sincronizar:', error);
  }
};

const getAllStorageData = () => {
  return new Promise(resolve => {
    const request = indexedDB.open('markdown-db');
    request.onsuccess = () => {
      // Retornar dados do IndexedDB
      resolve({});
    };
  });
};
