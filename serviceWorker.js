//listen to the instal event
self.addEventListener("install", (e) => {
  console.log("service worker has been installed");
});

//Every time you install the service worker for the first time, it becomes active automatically
//BUT after that, you need to actice it through the active event
self.addEventListener("activate", (e) => {
  console.log("service worker has been activated");
});
