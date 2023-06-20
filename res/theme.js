function enableStylesheet(node) {
  node.rel = "stylesheet";
}

function disableStylesheet(node) {
  node.rel = "stylesheet alternate";
}

function lightTheme() {
  preference.removeEventListener("change", toggleCodeBlockTheme);
  document.documentElement.classList.remove("system-theme");
  document.documentElement.classList.add("light-theme");
  document.documentElement.classList.remove("dark-theme");
  try {
    var light_stylesheet = document.getElementById("code-blocks-light");
    var dark_stylesheet = document.getElementById("code-blocks-dark");
    disableStylesheet(dark_stylesheet);
    enableStylesheet(light_stylesheet);
  } catch {}
  localStorage.setItem("theme", "light");
}

function darkTheme() {
  preference.removeEventListener("change", toggleCodeBlockTheme);
  document.documentElement.classList.remove("system-theme");
  document.documentElement.classList.add("dark-theme");
  try {
    var light_stylesheet = document.getElementById("code-blocks-light");
    var dark_stylesheet = document.getElementById("code-blocks-dark");
    disableStylesheet(light_stylesheet);
    enableStylesheet(dark_stylesheet);
  } catch {}
  localStorage.setItem("theme", "dark");
}

function systemTheme() {
  console.log("systemTheme");
  document.documentElement.classList.remove("light-theme");
  document.documentElement.classList.remove("dark-theme");
  document.documentElement.classList.remove("system-theme");
  document.documentElement.classList.add("system-theme");
  try {
    var light_stylesheet = document.getElementById("code-blocks-light");
    var dark_stylesheet = document.getElementById("code-blocks-dark");
    let preference = window.matchMedia("(prefers-color-scheme: dark)");
    if (preference.matches) {
      disableStylesheet(light_stylesheet);
      enableStylesheet(dark_stylesheet);
    } else {
      disableStylesheet(dark_stylesheet);
      enableStylesheet(light_stylesheet);
    }
  } catch {}
  localStorage.clear();
  preference.addEventListener("change", toggleCodeBlockTheme);
}

document
  .querySelectorAll(".light-theme-button")
  .forEach((button) => button.addEventListener("click", lightTheme));

document
  .querySelectorAll(".dark-theme-button")
  .forEach((button) => button.addEventListener("click", darkTheme));

document
  .querySelectorAll(".system-theme-button")
  .forEach((button) => button.addEventListener("click", systemTheme));

const toggleCodeBlockTheme = (setting) => {
  if (setting.matches) {
    try {
      var light_stylesheet = document.getElementById(
        "code-blocks-light"
      );
      var dark_stylesheet = document.getElementById("code-blocks-dark");
      disableStylesheet(light_stylesheet);
      enableStylesheet(dark_stylesheet);
    } catch {}
  } else {
    try {
      var light_stylesheet = document.getElementById(
        "code-blocks-light"
      );
      var dark_stylesheet = document.getElementById("code-blocks-dark");
      disableStylesheet(dark_stylesheet);
      enableStylesheet(light_stylesheet);
    } catch {}
  }
};

let preference = window.matchMedia("(prefers-color-scheme: dark)");
if (localStorage.getItem("theme") === "light") {
  lightTheme();
} else if (localStorage.getItem("theme") === "dark") {
  darkTheme();
} else {
  preference.addEventListener("change", toggleCodeBlockTheme);
}
