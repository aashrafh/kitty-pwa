if ("serviceWorker" in navigator) {
  //if the browser supports service workers,
  navigator.serviceWorker
    .register("/serviceWorker.js") //register it
    .then((reg) => console.log("service worker registered", reg))
    .catch((err) => console.log("service worker did not registered", err));
}
