async function register() {
  const email = document.getElementById("reg_email").value;
  const password = document.getElementById("reg_password").value;

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const msg = await res.text();
  alert(msg);
}

async function login() {
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const msg = await res.text();
  alert(msg);
  if (res.ok) window.location.href = "index.html";
}

function openModal() {
  document.getElementById("pdfModal").style.display = "block";
}

function closeModal() {
  document.getElementById("pdfModal").style.display = "none";
}
