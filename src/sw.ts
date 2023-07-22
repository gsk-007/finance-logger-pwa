const assets = [
  "/",
  "app.js",
  "styles.css",
  "sw-register.js",
  "interfaces/*",
  "classes/*",
  "icons/*",
]

self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open("assets").then((cache) => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response: any) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open("assets").then((cache) => {
          cache.put(event.request, networkResponse.clone())
          return networkResponse
        })
      })
      return response || fetchPromise
    })
  )
})
