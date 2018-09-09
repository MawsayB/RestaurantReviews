// service worker as learned at https://www.sitepoint.com/getting-started-with-service-workers/



// var CACHE_VERSION = 'app-v1';
// var CACHE_FILES = [
//     '/',
//     'img',
//     'js/dbhelper.js',
//     'js/main.js',
//     'js/restaurant_info.js',
//     'css/styles.css',
//     'css/responsive_index_styles.css',
//     'css/responsive_restaurant_styles.css',
// ];

// // installs the Service Worker
// self.addEventListener('install', function (event) {
//     event.waitUntil(
//         caches.open(CACHE_VERSION)
//             .then(function (cache) {
//                 console.log('Opened cache');
//                 return cache.addAll(CACHE_FILES);
//             })
//     );
// });


// fetches requests made to the server
 self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(res){
            if(res){
                return res;
            }
            requestBackend(event);
        })
    )
});

// function requestBackend(event){
//     var url = event.request.clone();
//     return fetch(url).then(function(res){
//         //if not a valid response send the error
//         if(!res || res.status !== 200 || res.type !== 'basic'){
//             return res;
//         }

//         var response = res.clone();

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