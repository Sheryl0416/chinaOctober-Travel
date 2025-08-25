const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const open = require("open");

dotenv.config();

app.use(cors());
app.use(express.json());

// Force root to login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Serve static files
app.use(express.static("public"));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const commentRoutes = require("./routes/commentRoutes");
app.use("/api/comments", commentRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);

  // 🟡 Only open browser locally, not on Render
  if (process.env.NODE_ENV !== "production") {
    open.default(`http://localhost:${PORT}`);
  }
});
