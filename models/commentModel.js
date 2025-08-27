const { dbPromise } = require("../db");

const commentModel = {
  async addComment({ page, user, comment, parentId = null }) {
    const sql = `INSERT INTO comment (page, "user", comment, parent_id) VALUES ($1, $2, $3, $4)`;
    await dbPromise.query(sql, [page, user, comment, parentId]);
  },

  async getCommentsByPage(page) {
    const sql = `SELECT * FROM comment WHERE page = $1 ORDER BY created_at DESC`;
    const { rows } = await dbPromise.query(sql, [page]);
    return rows;
  },

  async deleteComment(id) {
    const sql = `DELETE FROM comment WHERE id = $1`;
    await dbPromise.query(sql, [id]);
  },

  async updateComment(id, comment) {
    const sql = `UPDATE comment SET comment = $1, updated_at = NOW() WHERE id = $2`;
    await dbPromise.query(sql, [comment, id]);
  },
};

module.exports = commentModel;
