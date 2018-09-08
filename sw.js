// self.addEventListener('install', function(event) {
//     event.waitUntil(
//         caches.open('restaurant-static-v1').then(function(cache) {
//             return cacheAll(
//                 '/',
//                 'js/main.js',
//                 'js/restaurant_info.js',
//                 'css/styles.css',
//                 'css/responsive_index_styles.css',
//                 'css/responsive_restaurant_styles.css',
//                 'img/',
//                 'restaurant.html?'
//             );
//         })

//     );
// });


// self.addEventListener('fetch', function() {
//     event.respondWith(
//         catches.match(event.request).then(function(response) {
//             if(response) return response;
//             return fetch(event.request);
//         })
//     );
// });