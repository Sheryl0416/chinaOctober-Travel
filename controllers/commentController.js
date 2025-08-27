const commentModel = require("../models/commentModel");

const commentController = {
  async add(req, res) {
    const { page, comment, parentId } = req.body;
    const user = req.user?.email;

    if (!page || !comment || !user) {
      return res.status(400).json({ error: "Missing fields" });
    }

    try {
      await commentModel.addComment({ page, user, comment, parentId });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  async getByPage(req, res) {
    const page = req.query.page;
    try {
      const comments = await commentModel.getCommentsByPage(page);
      res.json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  async delete(req, res) {
    const user = req.user?.email;
    try {
      await commentModel.deleteComment(req.params.id, user);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  async update(req, res) {
    const user = req.user?.email;
    const { comment } = req.body;
    try {
      await commentModel.updateComment(req.params.id, comment, user);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },
};

module.exports = commentController;
