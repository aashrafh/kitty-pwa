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
