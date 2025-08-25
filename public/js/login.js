function showMessage(id, message, isSuccess) {
  const msgDiv = document.getElementById(id);
  msgDiv.textContent = message;
  msgDiv.className = "message " + (isSuccess ? "success" : "error");
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

async function register() {
  const email = document.getElementById("reg_email").value.trim();
  const password = document.getElementById("reg_password").value.trim();

  if (!email || !password) {
    showMessage("register-msg", "❌ Please fill in all fields.", false);
    return;
  }

  if (!isValidEmail(email)) {
    showMessage(
      "register-msg",
      "❌ Please enter a valid email address.",
      false
    );
    return;
  }

  if (password.length < 6) {
    showMessage(
      "register-msg",
      "❌ Password must be at least 6 characters.",
      false
    );
    return;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const msg = await res.text();
    showMessage("register-msg", msg, res.ok);
  } catch (err) {
    showMessage("register-msg", "❌ Something went wrong.", false);
  }
}

async function login() {
  const email = document.getElementById("login_email").value.trim();
  const password = document.getElementById("login_password").value.trim();

  if (!email || !password) {
    showMessage("login-msg", "❌ Please fill in all fields.", false);
    return;
  }

  if (!isValidEmail(email)) {
    showMessage("login-msg", "❌ Invalid email format.", false);
    return;
  }

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (res.ok) {
      showMessage("login-msg", "✅ " + result.message, true);
      localStorage.setItem("token", result.token); // store token
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);
    } else {
      showMessage(
        "login-msg",
        "❌ " + (result.message || "Login failed."),
        false
      );
    }
  } catch (err) {
    showMessage("login-msg", "❌ Something went wrong.", false);
  }
}
