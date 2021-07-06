
workbox.core.setCacheNameDetails({ prefix: "emarifer-trackmap" });

workbox.routing.registerRoute(
    new RegExp('.*www.ign.es\/wms-inspire.*'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'cache-map',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 300,// Limitamos a 60 el  número de recursos de ese directorio que queremos cachear.
                maxAgeSeconds: 24 * 60 * 60// Tiempo de vida de la cache 
            })
        ]
    })
); // NetworkFirst, CacheFirst, StaleWhileRevalidate

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("index.html"));

/**
 * LIMITAR EL NUMERO DE ENTRADAS DE UNA CACHE. VER:
 * https://pablomagaz.com/blog/escribiendo-service-workers-con-workbox
 */