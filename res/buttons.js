function _toggleCompactMenu() {
  let menuIcon = document
    .getElementById("menu-button")
    .querySelector("i");
  let menu = document.querySelector("aside");
  if (menu.style.display !== "block") {
    positionInArticle = window.scrollY;
    window.removeEventListener("scroll", highlightCurrentSection);
    document.querySelector("article").style.display = "none";
    menu.style.display = "block";
    resizeIframe(document.querySelector("iframe"));
    menuIcon.classList = "nf nf-md-close";
  } else {
    menu.removeAttribute("style");
    document.querySelector("article").removeAttribute("style");
    window.scrollTo({
      top: positionInArticle,
      left: 0,
      behavior: "instant",
    });
    window.addEventListener("scroll", highlightCurrentSection);
    // highlightCurrentSection();
    menuIcon.classList = "nf nf-md-menu";
  }
}
function _toggleDropdownMenu() {
  let menuIcon = document
    .getElementById("menu-button")
    .querySelector("i");
  let menu = document.querySelector(
    "#menu-dropdown-container .dropdown-menu"
  );
  if (menu.style.display !== "block") {
    menuIcon.classList = "nf nf-md-close";
    menu.style.display = "block";
  } else {
    menu.removeAttribute("style");
    menuIcon.classList = "nf nf-md-menu";
  }
}

function toggleMenu() {
  document.querySelectorAll(".dropdown-menu").forEach((menu) => {
    menu.removeAttribute("style");
  });
  if (
    window
      .getComputedStyle(document.querySelector("main"))
      .getPropertyValue("grid-template-areas") === '"content"'
  ) {
    _toggleCompactMenu();
  } else {
    _toggleDropdownMenu();
  }
}

function _toggleThemeMenu() {
  let menuIcon = document
    .getElementById("theme-switch-button")
    .querySelector("i");
  let menu = document.querySelector(
    "#theme-dropdown-container .dropdown-menu"
  );
  if (menu.style.display !== "block") {
    menuIcon.classList = "nf nf-md-close";
    menuIcon.style.fontSize = "2rem";
    menu.style.display = "block";
  } else {
    menu.removeAttribute("style");
    menuIcon.removeAttribute("style");
    menuIcon.classList = "nf nf-md-circle_half_full";
  }
}

function toggleThemeMenu() {
  if(
  document.querySelector(
    "#menu-dropdown-container .dropdown-menu"
  ).style.display === "block") {
    toggleMenu();
  }
  _toggleThemeMenu();
}
