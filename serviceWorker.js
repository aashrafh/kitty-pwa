//listen to the instal event
self.addEventListener("install", (e) => {
  console.log("service worker has been installed");
});

//Every time you install the service worker for the first time, it becomes active automatically
//BUT after that, you need to actice it through the active event
self.addEventListener("activate", (e) => {
  console.log("service worker has been activated");
});

//The fetch event ==> when fetching something from the server (for ex. css file, js file, images)
//or even from a js file (for example http request)
//The fetch event listen to any fetch request and at that point you can intercept the fetch request
//You can do nothing, modify, or stop the request
//Why to intercept the request?
//1- Maybe to stop the request and get the data fromt the cached assets instead of the server
self.addEventListener("fetch", (e) => {
  console.log("fetch event", e);
});
