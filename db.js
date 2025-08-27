const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("render")
    ? { rejectUnauthorized: false }
    : false,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Failed to connect to PostgreSQL:", err);
  } else {
    console.log("✅ Connected to PostgreSQL!");
    release();
  }
});

module.exports = {
  dbPromise: pool,
};
