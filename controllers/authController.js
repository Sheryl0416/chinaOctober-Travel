const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// ✅ Register a new user
exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("❌ Email and password are required.");
  }

  // Check if user already exists
  userModel.findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).send("❌ Server error.");
    if (results.length > 0) {
      return res.status(400).send("❌ Email already registered.");
    }

    // Insert new user
    userModel.insertUser(email, password, (err2) => {
      if (err2) return res.status(500).send("❌ Failed to register user.");
      res.status(201).send("✅ Registered successfully!");
    });
  });
};

// ✅ Login existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Email not found." });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({ message: "Login successful!", token });
  });
};

// ✅ Verify token
exports.verifyUser = (req, res) => {
  res.send(`✅ Authenticated as ${req.user.email}`);
};
