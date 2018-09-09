// Service Worker fetching per https://developers.google.com/web/fundamentals/primers/service-workers/

var CACHE_NAME = 'my-site-cache-v1';
var CACHE_FILES = [
    '/',
    '/index.html',
    '/restaurant.html',
    'css/styles.css',
    'css/responsive_index_styles.css',
    'css/responsive_restaurant_styles.css',
    'data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png',
    'https://api.tiles.mapbox.com/v4/mapbox.streets/16/19300/24639.jpg70?access_token=pk.eyJ1IjoibWFyY3liIiwiYSI6ImNqbGZ2OHR3bzBoeWYza3JrbDI1c3lpMWUifQ.b9s_J7mObDCETD_0SecVpg',    
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
];

// installs the Service Worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});

// fetches requests made to the server
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          // IMPORTANT: Clone the request. A request is a stream and
          // can only be consumed once. Since we are consuming this
          // once by cache and once by the browser for fetch, we need
          // to clone the response.
          var fetchRequest = event.request.clone();
  
          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });