// db.js
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const isRender = process.env.DATABASE_URL.includes("render");

// Create a new connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isRender ? { rejectUnauthorized: false } : false,
});

// Test connection
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
