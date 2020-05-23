var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
  '/',
];

// Install a service worker
// An install event is triggered the first time a user visits the page. 
// During this phase, the service worker is installed in the browser. 
// During this installation, you can cache all the static assets in your web app like so
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
// This event helps serve the app shell from the cache.
//  caches.match() dissects the web request that triggered the event, 
//  and checks to see if it's available in the cache. 
//  It then either responds with the cached version, or uses fetch to get a copy from the network. 
//  The response is returned to the web page with e.respondWith().

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Here the service worker updates its cache whenever any of the app shell files change.