const express = require("express");
const router = express.Router(); 
const commentController = require("../controllers/commentController");
const checkToken = require("../middleware/checkToken");

// Routes
router.get("/", commentController.getByPage);
router.post("/", checkToken, commentController.add);
router.put("/:id", checkToken, commentController.update);
router.delete("/:id", checkToken, commentController.delete);

module.exports = router;
