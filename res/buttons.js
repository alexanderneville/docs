function hideMainMenuDropDown(event) {
  if (
    !document
      .querySelector("#menu-dropdown-container")
      .contains(event.target)
  ) {
    toggleMainMenu();
  }
}

function hideThemeMenuDropDown(event) {
  if (
    !document
      .querySelector("#theme-dropdown-container")
      .contains(event.target)
  ) {
    toggleThemeMenu();
  }
}

function closeCompactMenu(event) {
  toggleMainMenu();
  location.hash = event.target.href;
}

function _toggleCompactMainMenu() {
  let menuIcon = document
    .getElementById("menu-button")
    .querySelector("i");
  let menu = document.querySelector("aside");
  if (menu.style.display !== "block") {
    document
      .querySelectorAll("aside #article-contents a")
      .forEach((link) => {
        link.addEventListener("click", closeCompactMenu);
      });
    positionInArticle = window.scrollY;
    window.scrollTo({top: 0, behavior:'instant'});
    // document.getElementById("page-footer").style.display = "none";
    window.removeEventListener("scroll", highlightCurrentSection);
    window.removeEventListener("scroll", scrollFunction);
    document
      .querySelectorAll(".page-start-button")
      .forEach((button) => (button.style.display = "none"));
    document.querySelector("article").style.display = "none";
    menu.style.display = "block";
    resizeIframe(document.querySelector("iframe"));
    menuIcon.classList = "nf nf-md-close";
    menuIcon.style.color = "var(--fg-secondary)";
    window.scrollTo({top: 0, behavior:'instant'});
  } else {
    document
      .querySelectorAll("aside #article-contents a")
      .forEach((link) => {
        link.removeEventListener("click", closeCompactMenu);
      });
    menu.removeAttribute("style");
    menuIcon.removeAttribute("style");
    document.querySelector("article").removeAttribute("style");
    window.addEventListener("scroll", scrollFunction);
    window.scrollTo({
      top: positionInArticle,
      left: 0,
      behavior: "instant",
    });
    window.addEventListener("scroll", highlightCurrentSection);
    // highlightCurrentSection();
    menuIcon.classList = "nf nf-md-menu";
    document.getElementById("page-footer").removeAttribute("style");
  }
}

function _toggleDropdownMainMenu() {
  let menuIcon = document
    .getElementById("menu-button")
    .querySelector("i");
  let menu = document.querySelector(
    "#menu-dropdown-container .dropdown-menu"
  );
  if (menu.style.display !== "block") {
    // menuIcon.classList = "nf nf-md-close";
    menuIcon.style.color = "var(--fg-secondary)";
    menu.style.display = "block";
    window.addEventListener("click", hideMainMenuDropDown);
  } else {
    window.removeEventListener("click", hideMainMenuDropDown);
    menu.removeAttribute("style");
    // menuIcon.classList = "nf nf-md-menu";
    menuIcon.removeAttribute("style");
  }
}

function toggleMainMenu() {
  if (
    window
      .getComputedStyle(document.querySelector("main"))
      .getPropertyValue("grid-template-areas") === '"content"'
  ) {
    _toggleCompactMainMenu();
    // if (document.querySelector("aside").style.display === "block") {
    //   // window.scrollTo({top:0, behaviour:'instant'});
    // }
  } else {
    _toggleDropdownMainMenu();
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
    menuIcon.style.color = "var(--fg-secondary)";
    menu.style.display = "block";
    window.addEventListener("click", hideThemeMenuDropDown);
  } else {
    window.removeEventListener("click", hideThemeMenuDropDown);
    menu.removeAttribute("style");
    menuIcon.removeAttribute("style");
  }
}

function toggleThemeMenu() {
  _toggleThemeMenu();
}

document
  .getElementById("menu-button")
  .addEventListener("click", toggleMainMenu);

document
  .getElementById("theme-switch-button")
  .addEventListener("click", toggleThemeMenu);
