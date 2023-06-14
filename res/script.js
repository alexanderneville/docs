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
  let headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  for (let i = 0; i < headings.length; i++) {
    let link = document.createElement("a");
    link.href = `#${headings[i].id}`;
    let icon = document.createElement("i");
    icon.classList = "nf nf-oct-link";
    link.appendChild(icon);
    headings[i].appendChild(document.createTextNode(" "));
    headings[i].appendChild(link);
  }
}

function addTOC() {
  let aside = document.createElement("aside");
  aside.appendChild(document.createElement("nav"));
  let nav = aside.querySelector("nav");
  nav.id = "TOC";
  nav.appendChild(document.createElement("h3"));
  nav.querySelector("h3").innerText = "In this article";
  nav.appendChild(document.createElement("ul"));
  let list = nav.querySelector("ul");
  let article = document.querySelector("article");
  let headings = article.querySelectorAll("h2");
  if (headings.length === 0) {
    document.querySelector("main").style.display = "block";
    return;
  }
  for (let i = 0; i < headings.length; i++) {
    let newEntry = document.createElement("li");
    let newLink = document.createElement("a");
    newLink.href = headings[i].querySelector("a").href;
    newLink.innerText = headings[i].innerText;
    newEntry.appendChild(newLink);
    list.appendChild(newEntry);
  }

  let pageNavigation = document.createElement("div");
  pageNavigation.style.display = "flex";
  pageNavigation.style.gap = "0.5rem";
  let backToTop = document.createElement("button");
  backToTop.classList = "page-start-button";
  backToTop.addEventListener("click", scrollToTop);
  let upIcon = document.createElement("i")
  upIcon.classList = "nf nf-md-arrow_up";
  backToTop.appendChild(upIcon);
  backToTop.appendChild(document.createTextNode(" Top"));

  let upNavigation = document.createElement("a");
  upNavigation.href = "./";
  let backIcon = document.createElement("i");
  backIcon.classList = "nf nf-md-arrow_left";
  upNavigation.appendChild(backIcon);
  upNavigation.appendChild(document.createTextNode(" Back"));

  pageNavigation.appendChild(upNavigation);
  pageNavigation.appendChild(backToTop);
  nav.appendChild(pageNavigation);
  document.querySelector("main").appendChild(aside);
  scrollFunction();
}

addClipboardItems();
addAnchorLinks();
addTOC();

const anchors = document.querySelector("article").querySelectorAll('h2');
const links = document.querySelector("aside").querySelectorAll('nav > ul > li');

window.addEventListener('scroll', (event) => {
  if (typeof(anchors) != 'undefined' && anchors != null && typeof(links) != 'undefined' && links != null) {
    let scrollTop = window.scrollY;
    
    // highlight the last scrolled-to: set everything inactive first
    links.forEach((link, index) => {
      link.classList.remove("active");
    });
    
    // then iterate backwards, on the first match highlight it and break
    for (var i = anchors.length-1; i >= 0; i--) {
      if (scrollTop > anchors[i].offsetTop - 100) {
        links[i].classList.add('active');
        break;
      }
    }
  }
});
