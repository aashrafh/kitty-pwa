// Offline data: sync the data to the IndexedDB
db.enablePersistence().catch((err) => {
  if (err.code == "failed-precondition") {
    console.log("Persistence failed");
  } else if (err.code == "unimplemented") {
    console.log("Persistence is not available");
  }
});

// Set a realtime listener to the database
db.collection("cats").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type == "added") {
      renderCat(change.doc.data(), change.doc.id);
    }
    if (change.type == "removed") {
    }
  });
});
