const { dbPromise } = require("./db");

const commentModel = {
  async addComment({ page, user, comment, parentId = null }) {
    const sql = `INSERT INTO comment (page, user, comment, parent_id) VALUES (?, ?, ?, ?)`;
    await dbPromise.query(sql, [page, user, comment, parentId]);
  },

  async getCommentsByPage(page) {
    const sql = `SELECT * FROM comment WHERE page = ? ORDER BY created_at DESC`;
    const [results] = await dbPromise.query(sql, [page]);
    return results;
  },

  async deleteComment(id) {
    const sql = `DELETE FROM comment WHERE id = ?`;
    await dbPromise.query(sql, [id]);
  },

  async updateComment(id, comment) {
    const sql = `UPDATE comment SET comment = ?, updated_at = NOW() WHERE id = ?`;
    await dbPromise.query(sql, [comment, id]);
  },
};

module.exports = commentModel;
