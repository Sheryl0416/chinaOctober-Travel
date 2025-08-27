const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const jwtMiddleware = require("../middleware/checkToken");

router.get("/", commentController.getByPage);
router.post("/", jwtMiddleware, commentController.add);
router.put("/:id", jwtMiddleware, commentController.update);
router.delete("/:id", jwtMiddleware, commentController.delete);

module.exports = router;
