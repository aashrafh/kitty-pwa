const staticCacheName = "site-static";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/script.js",
  "/js/materialize.min.js",
  "/css/style.css",
  "/css/materialize.min.css",
  "img/cat.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
];

// listen to the instal event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// Every time you install the service worker for the first time, it becomes active automatically
// BUT after that, you need to actice it through the active event
self.addEventListener("activate", (e) => {});

// The fetch event ==> when fetching something from the server (for ex. css file, js file, images)
// or even from a js file (for example http request)
// The fetch event listen to any fetch request and at that point you can intercept the fetch request
// You can do nothing, modify, or stop the request
// Why to intercept the request?
// 1- Maybe to stop the request and get the data fromt the cached assets instead of the server
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cacheResponse) => {
      return cacheResponse || fetch(e.request); // If there is a match with a cached request then return it, otherwise do the normal fetch
    })
  );
});
