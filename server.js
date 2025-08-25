const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const open = require("open");

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// 1️⃣ Force root to redirect to login.html BEFORE static middleware
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// 2️⃣ Static files (after redirect so index.html doesn't override)
app.use(express.static("public"));

// 3️⃣ Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const commentRoutes = require("./routes/commentRoutes");
app.use("/api/comments", commentRoutes);

// 4️⃣ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  open.default(`http://localhost:${PORT}`);
});
