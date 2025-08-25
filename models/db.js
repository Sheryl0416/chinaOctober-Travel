const mysql = require("mysql2");
const mysqlPromise = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

// Callback-based connection (used in auth)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Promise-based pool (used in comments)
const dbPromise = mysqlPromise.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Failed to connect to MySQL:", err);
  } else {
    console.log("✅ Connected to MySQL (callback)!");
  }
});

module.exports = {
  db,
  dbPromise,
};
