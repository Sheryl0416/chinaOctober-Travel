const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const checkToken = require("../middleware/checkToken");

router.post("/register", authController.register);
router.post("/login", authController.loginUser);
router.get("/verify", checkToken, authController.verifyUser);

module.exports = router;
