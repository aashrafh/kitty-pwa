const staticCache = "site-static-v5";
const dynamicCache = "site-dynamic-v5";
const maxCacheSize = 15;
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
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "pages/offline.html"
];

// optimize the cache size
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]); // delete the oldest one
      }
    });
  });
};

// listen to the instal event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCache).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// Every time you install the service worker for the first time, it becomes active automatically
// BUT after that, you need to actice it through the active event
self.addEventListener("activate", (e) => {
  //Cache versioning
  e.waitUntil(
    caches.keys().then((keys) => {
      // loop through all available caches and delete the old versions
      // because maybe this causes in more than one promise, then Promise.all()
      // will wait untill every thing is done
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// The fetch event ==> when fetching something from the server (for ex. css file, js file, images)
// or even from a js file (for example http request)
// The fetch event listen to any fetch request and at that point you can intercept the fetch request
// You can do nothing, modify, or stop the request
// Why to intercept the request?
// 1- Maybe to stop the request and get the data fromt the cached assets instead of the server
self.addEventListener("fetch", (e) => {
  if (
    e.request.url.indexOf("firestore.googleapis.com") === -1 &&
    e.request.url.indexOf("google-analytics.com") === -1 &&
    e.request.url.indexOf("gstatic.com") === -1
  ) {
    e.respondWith(
      caches.match(e.request).then((cacheResponse) => {
        return (
          cacheResponse ||
          fetch(e.request) // If there is a match with a cached request then return it, otherwise do the normal fetch
            .then((response) => {
              // then cache it dynamically!
              return caches.open(dynamicCache).then((cache) => {
                cache.put(e.request.url, response);
                limitCacheSize(dynamicCache, maxCacheSize); //every time add anything to dynamic cache check the max size
                return response;
              });
            })
            .catch(() => {
              // Conditional fallback for different resource types
              // For the .html files
              if (e.request.url.indexOf(".html") > -1) {
                return caches.match("/pages/offline.html");
              }
            })
        );
      })
    );
  }
});
