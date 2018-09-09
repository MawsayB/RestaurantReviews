// Service Worker fetching per https://developers.google.com/web/fundamentals/primers/service-workers/

var CACHE_VERSION = 'app-v1';
var CACHE_FILES = [
    '/',
    '/index.html',
    '/restaurant.html',
    'css/styles.css',
    'css/responsive_index_styles.css',
    'css/responsive_restaurant_styles.css',
    'data/restaurants.json',
    '/img/',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    '/sw.js'
];

// installs the Service Worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});


// // fetches requests made to the server
//  self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request).then(function(response){
//             if(response){
//                 return response;
//             }
//             requestBackend(event);
//         })
//     )
// });

// function requestBackend(event){
//     var url = event.request.clone();
//     return fetch(url).then(function(response){
//         //if not a valid response send the error
//         if(!response || res.status !== 200 || response.type !== 'basic'){
//             return res;
//         }

//         var response = response.clone();

//         caches.open(CACHE_VERSION).then(function(cache){
//             cache.put(event.request, response);
//         });

//         return res;
//     })
// }

// // finds all keys different from current version and cleans them
// self.addEventListener('activate', function (event) {
//     event.waitUntil(
//         caches.keys().then(function(keys){
//             return Promise.all(keys.map(function(key, i){
//                 if(key !== CACHE_VERSION){
//                     return caches.delete(keys[i]);
//                 }
//             }))
//         })
//     )
// });