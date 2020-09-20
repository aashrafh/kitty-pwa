// Set a realtime listener to the database
db.collection("cats").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type == "added") {
      console.log(change, change.doc.data());
    }
    if (change.type == "removed") {
    }
  });
});
