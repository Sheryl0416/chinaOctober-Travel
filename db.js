const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

// Create a new connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("render")
    ? { rejectUnauthorized: false }
    : false,
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

// Export for use in models
module.exports = {
  dbPromise: pool,
};
