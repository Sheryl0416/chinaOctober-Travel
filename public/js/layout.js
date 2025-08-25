async function loadLayout() {
  const header = await fetch("header.html").then((res) => res.text());
  document.getElementById("header").innerHTML = header;

  const footer = await fetch("footer.html").then((res) => res.text());
  document.getElementById("footer").innerHTML = footer;
}

window.addEventListener("DOMContentLoaded", loadLayout);
