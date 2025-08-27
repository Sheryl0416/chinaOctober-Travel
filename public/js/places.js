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
    const email = localStorage.getItem("email");

    if (!token || !email) {
      showMessage("❌ Cannot detect logged-in user.", false);
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
          page: "places",
          user: email,
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
    } catch {
      showMessage("❌ Network error.", false);
    }
  });

  async function loadComments() {
    try {
      const res = await fetch("/api/comments?page=places");
      const data = await res.json();
      const currentEmail = localStorage.getItem("email");

      commentsList.innerHTML = "";

      data.forEach((item) => {
        const li = document.createElement("li");
        li.className = "comment-item";
        li.innerHTML = `
          <strong>${item.user}</strong>: 
          <span class="comment-text">${item.comment}</span>
          ${
            currentEmail === item.user
              ? `<div class="comment-actions">
                  <button class="edit-btn" data-id="${item.id}">Edit</button>
                  <button class="delete-btn" data-id="${item.id}">Delete</button>
                </div>`
              : ""
          }
        `;
        commentsList.appendChild(li);
      });

      setupEditAndDelete();
    } catch {
      commentsList.innerHTML = "<li>❌ Failed to load comments.</li>";
    }
  }

  function setupEditAndDelete() {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const token = localStorage.getItem("token");
        try {
          const res = await fetch(`/api/comments/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            showMessage("✅ Comment deleted!", true);
            loadComments();
          }
        } catch {
          showMessage("❌ Delete failed.", false);
        }
      });
    });

    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const li = btn.closest("li");
        const textSpan = li.querySelector(".comment-text");
        const oldText = textSpan.textContent;

        // Hide old comment text and buttons
        textSpan.style.display = "none";
        btn.style.display = "none";
        li.querySelector(".delete-btn").style.display = "none";

        // Add input box and save/cancel buttons
        const input = document.createElement("input");
        input.type = "text";
        input.value = oldText;
        input.className = "edit-input";

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.className = "save-btn";

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.className = "cancel-btn";

        const actionDiv = li.querySelector(".comment-actions");
        actionDiv.appendChild(input);
        actionDiv.appendChild(saveBtn);
        actionDiv.appendChild(cancelBtn);

        // Save handler
        saveBtn.addEventListener("click", async () => {
          const newText = input.value.trim();
          if (newText && newText !== oldText) {
            await updateComment(id, newText);
          }
        });

        // Cancel handler
        cancelBtn.addEventListener("click", () => {
          input.remove();
          saveBtn.remove();
          cancelBtn.remove();
          textSpan.style.display = "";
          btn.style.display = "";
          li.querySelector(".delete-btn").style.display = "";
        });
      });
    });
  }

  async function updateComment(id, newComment) {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: newComment }),
      });

      const data = await res.json();

      if (res.ok) {
        showMessage("✅ Comment updated!", true);
        loadComments();
      } else {
        showMessage("❌ " + (data.error || "Update failed."), false);
      }
    } catch {
      showMessage("❌ Network error updating comment.", false);
    }
  }

  function showMessage(msg, success) {
    commentMessage.textContent = msg;
    commentMessage.className = success ? "message success" : "message error";
    setTimeout(() => {
      commentMessage.textContent = "";
      commentMessage.className = "";
    }, 1000);
  }
});
