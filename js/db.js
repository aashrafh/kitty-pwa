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
      renderCat(change.doc.data(), change.doc.id); // update the UI with the new cat
    }
    if (change.type == "removed") {
      removeCat(change.doc.id); // delete the cat from the UI
    }
  });
});

// Add new cat
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent refresh after submit

  // Cat schema
  const cat = {
    name: form.name.value,
    bio: form.bio.value
  };

  db.collection("cats")
    .add(cat)
    .catch((err) => console.log(err));

  form.name.value = "";
  form.bio.value = "";
});

// Delete cat
const catsContainer = document.querySelector(".cats");
catsContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    const id = e.target.getAttribute("data-id");
    db.collection("cats")
      .doc(id)
      .delete();
  }
});
