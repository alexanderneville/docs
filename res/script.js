function _toggleMenu() {
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

function toggleMenu() {
  if (
    window
      .getComputedStyle(document.querySelector("main"))
      .getPropertyValue("grid-template-areas") === '"content"'
  ) {
    _toggleMenu();
  }
}

function is_touch_enabled() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

function enableStylesheet(node) {
  node.rel = "stylesheet";
}

function disableStylesheet(node) {
  node.rel = "stylesheet alternate";
}

function lightTheme() {
  let preference = window.matchMedia("(prefers-color-scheme: dark)");
  if (preference.matches) {
    document.documentElement.classList.add("light-theme");
  } else {
    document.documentElement.classList.remove("dark-theme");
  }
  var light_stylesheet = document.getElementById("code-blocks-light");
  var dark_stylesheet = document.getElementById("code-blocks-dark");
  disableStylesheet(dark_stylesheet);
  enableStylesheet(light_stylesheet);
  var moon = document.createElement("i");
  moon.classList = "nf nf-oct-moon";
  var themeButton = document.getElementById("theme-switch-button");
  themeButton.innerHTML = null;
  themeButton.appendChild(moon);
}

function darkTheme() {
  let preference = window.matchMedia("(prefers-color-scheme: dark)");
  if (preference.matches) {
    document.documentElement.classList.remove("light-theme");
  } else {
    document.documentElement.classList.add("dark-theme");
  }
  var light_stylesheet = document.getElementById("code-blocks-light");
  var dark_stylesheet = document.getElementById("code-blocks-dark");
  disableStylesheet(light_stylesheet);
  enableStylesheet(dark_stylesheet);
  var sun = document.createElement("i");
  sun.classList = "nf nf-oct-sun";
  var themeButton = document.getElementById("theme-switch-button");
  themeButton.innerHTML = null;
  themeButton.appendChild(sun);
}

function switchTheme() {
  var light_stylesheet = document.getElementById("code-blocks-light");
  if (light_stylesheet.rel === "stylesheet alternate") {
    lightTheme();
  } else {
    darkTheme();
  }
  hljs.highlightAll();
}

let pageStartButtons = document.querySelectorAll(".page-start-button");
pageStartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    scrollToTop();
  });
});

function scrollToTop() {
  window.scrollTo(0, 0);
}

function scrollFunction() {
  if (
    document.body.scrollTop > 1 ||
    document.documentElement.scrollTop > 1
  ) {
    document
      .querySelectorAll(".page-start-button")
      .forEach((button) => (button.style.display = "block"));
  } else {
    document
      .querySelectorAll(".page-start-button")
      .forEach((button) => (button.style.display = "none"));
  }
}

window.onscroll = function () {
  scrollFunction();
};

async function copyCode(block, copyButton) {
  let text = block.innerText;
  await navigator.clipboard.writeText(text);
  let para = copyButton.querySelector("p");
  para.innerHTML = null;
  let icon = document.createElement("i");
  icon.classList = "nf nf-md-clipboard_check_outline";
  let message = document.createTextNode(" Copied!");
  para.appendChild(icon);
  para.appendChild(message);
  setTimeout(
    (copyButton) => {
      let para = copyButton.querySelector("p");
      let icon = document.createElement("i");
      icon.classList = "nf nf-md-clipboard_text_outline";
      para.innerHTML = null;
      para.appendChild(icon);
    },
    500,
    copyButton
  );
}

function addClipboardItems() {
  let blocks = document.getElementsByTagName("pre");
  for (var i = 0; i < blocks.length; i++) {
    if (navigator.clipboard) {
      let copyButton = document.createElement("div");
      copyButton.classList = "copyButton";
      let para = document.createElement("p");
      let icon = document.createElement("i");
      icon.classList = "nf nf-md-clipboard_text_outline";
      para.appendChild(icon);
      copyButton.appendChild(para);
      blocks[i].appendChild(copyButton);
      let block = blocks[i].querySelector("code");
      copyButton.addEventListener("click", async () => {
        await copyCode(block, copyButton);
      });
    }
  }
}

function addAnchorLinks() {
  let headings = document
    .querySelector("main article")
    .querySelectorAll("h2, h3, h4, h5, h6");
  for (let i = 0; i < headings.length; i++) {
    let link = document.createElement("a");
    link.classList = "heading-anchor-link";
    link.href = `#${headings[i].id}`;
    let icon = document.createElement("i");
    icon.classList = "nf nf-oct-link";
    link.appendChild(icon);
    headings[i].appendChild(document.createTextNode(" "));
    headings[i].appendChild(link);
  }
}

function addTOC() {
  let list = document.querySelector("main aside nav ul");
  let article = document.querySelector("main article");
  let headings = article.querySelectorAll("h2");
  if (headings.length === 0) {
    document.querySelector("main aside").style.display = "none";
    document.querySelector("main").style.display = "block";
    return;
  }
  for (let i = 0; i < headings.length; i++) {
    let newEntry = document.createElement("li");
    let newLink = document.createElement("a");
    newLink.href = headings[i].querySelector("a").href;
    newLink.innerText = headings[i].innerText;
    newLink.onclick = () => {
      toggleMenu();
      location.hash = newLink.href;
    };
    newEntry.appendChild(newLink);
    list.appendChild(newEntry);
  }
}

function highlightCurrentSection() {
  if (
    typeof anchors != "undefined" &&
    anchors != null &&
    typeof links != "undefined" &&
    links != null
  ) {
    let scrollTop = window.scrollY;

    // highlight the last scrolled-to: set everything inactive first
    links.forEach((link, index) => {
      link.classList.remove("active");
    });

    // then iterate backwards, on the first match highlight it and break
    for (var i = anchors.length - 1; i >= 0; i--) {
      if (scrollTop > anchors[i].offsetTop - 100) {
        links[i].classList.add("active");
        break;
      }
    }
  }
}

function highlightCurrentDocument() {
  let pages =
    window.frames[
      "section-contents-iframe"
    ].contentDocument.querySelectorAll("li");
  for (let i = 0; i < pages.length; i++) {
    if (
      pages[i].querySelector("a").href.split("/").reverse()[0] ===
      location.pathname.split("/").reverse()[0]
    ) {
      pages[i].classList.add("active");
      break;
    }
  }
}

addClipboardItems();
addAnchorLinks();
addTOC();

const anchors = document
  .querySelector("article")
  .querySelectorAll("h2");
const links = document
  .querySelector("aside")
  .querySelectorAll("nav > ul > li");

window.addEventListener("scroll", highlightCurrentSection);

document
  .getElementById("menu-button")
  .addEventListener("click", toggleMenu);

let resizedIframe = false;

if (
  window
    .getComputedStyle(document.querySelector("main"))
    .getPropertyValue("grid-template-areas") !== '"content"'
) {
  resizedIframe = true;
}

window.addEventListener(
  "resize",
  function (event) {
    if (
      window
        .getComputedStyle(document.querySelector("main"))
        .getPropertyValue("grid-template-areas") !== '"content"'
    ) {
      if (resizedIframe === false) {
        resizeIframe(document.querySelector("iframe"));
        resizedIframe = true;
      }
      if (document.querySelector("article").style.display === "none") {
        _toggleMenu();
      }
    }
  },
  true
);

function testMessage() {
  console.log("testMesssage");
}

let positionInArticle = window.scrollY;

// const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
// if (systemTheme.matches) {
//   darkTheme();
// }

document
  .querySelectorAll(".light-theme-button")
  .forEach((button) => button.addEventListener("click", testMessage));
