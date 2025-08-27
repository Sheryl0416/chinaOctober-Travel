const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("❌ Email and password are required.");
  }

  try {
    const users = await userModel.findUserByEmail(email);
    if (users.length > 0) {
      return res.status(400).send("❌ Email already registered.");
    }

    await userModel.insertUser(email, password);
    res.status(201).send("✅ Registered successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Server error.");
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await userModel.findUserByEmail(email);
    if (users.length === 0) {
      return res.status(401).json({ message: "Email not found." });
    }

    const user = users[0];
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({ message: "Login successful!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error." });
  }
};

exports.verifyUser = (req, res) => {
  res.send(`✅ Authenticated as ${req.user.email}`);
};
