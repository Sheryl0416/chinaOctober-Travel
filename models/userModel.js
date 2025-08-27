const { dbPromise } = require("../db");

exports.findUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = $1`;
  const { rows } = await dbPromise.query(sql, [email]);
  return rows;
};

exports.insertUser = async (email, password) => {
  const sql = `INSERT INTO users (email, password) VALUES ($1, $2)`;
  await dbPromise.query(sql, [email, password]);
};
