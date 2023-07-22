"use strict";
const assets = [
    "/",
    "app.js",
    "styles.css",
    "sw-register.js",
    "interfaces/*",
    "classes/*",
    "icons/*",
];
self.addEventListener("install", (event) => {
    event.waitUntil(caches.open("assets").then((cache) => {
        cache.addAll(assets);
    }));
});
self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
            caches.open("assets").then((cache) => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            });
        });
        return response || fetchPromise;
    }));
});
