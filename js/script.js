document.addEventListener("DOMContentLoaded", function() {
  //Open the sidenav
  const sidenav = document.querySelectorAll(".side-nav");
  M.Sidenav.init(sidenav, { edge: "right" });

  //add new cat
  const form = document.querySelectorAll(".side-form");
  M.Sidenav.init(form, { edge: "left" });
});
