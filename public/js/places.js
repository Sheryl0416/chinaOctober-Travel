document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("commentForm");
  const commentInput = document.getElementById("comment");
  const commentMessage = document.getElementById("comment-message");
  const commentsList = document.getElementById("commentsList");

  loadComments();

  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const commentText = commentInput.value.trim();
    const token = localStorage.getItem("token");

    if (!token) {
      showMessage("❌ Please login and enter a comment.", false);
      return;
    }

    if (!commentText) {
      showMessage("❌ Please enter a comment.", false);
      return;
    }

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: commentText,
          page: "places", // ✅ THIS IS THE FIX
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showMessage("✅ Comment posted!", true);
        commentInput.value = "";
        loadComments();
      } else {
        showMessage("❌ " + (data.error || "Failed to post comment."), false);
      }
    } catch (err) {
      showMessage("❌ Error submitting comment.", false);
    }
  });

  async function loadComments() {
    try {
      const res = await fetch("/api/comments?page=places"); // ✅ use ?page=places
      const data = await res.json();

      commentsList.innerHTML = "";

      data.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${item.user}</strong>: ${item.comment}`;
        commentsList.appendChild(li);
      });
    } catch (err) {
      commentsList.innerHTML = "<li>❌ Failed to load comments.</li>";
    }
  }

  function showMessage(text, isSuccess) {
    commentMessage.textContent = text;
    commentMessage.className = isSuccess ? "message success" : "message error";
  }
});
