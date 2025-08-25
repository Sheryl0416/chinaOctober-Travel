const { db } = require("./db");

exports.findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};

exports.insertUser = (email, password, callback) => {
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], callback);
};
