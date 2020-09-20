const cats = document.querySelector(".cats");

document.addEventListener("DOMContentLoaded", function() {
  //Open the sidenav
  const sidenav = document.querySelectorAll(".side-nav");
  M.Sidenav.init(sidenav, { edge: "right" });

  //add new cat
  const form = document.querySelectorAll(".side-form");
  M.Sidenav.init(form, { edge: "left" });
});

// add a cat details to the UI
const renderCat = (data, id) => {
  const cat = `
  <div class="card-panel cat white row" data-id="${id}">
    <img src="/img/cat.png" alt="Cat thumb">
    <div class="cat-details">
      <div class="cat-name">${data.name}</div>
      <div class="cat-bio">${data.bio}</div>
    </div>
    <div class="cat-delete"><i class="material-icons" data-id="${id}">delete_outline</i></div>
  </div>
  `;

  cats.innerHTML += cat;
};
