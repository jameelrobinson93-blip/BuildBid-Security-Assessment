require("dotenv").config();

const { Pool } = require("pg");

console.log("========================================");
console.log("🚀 BuildBid PostgreSQL Debug");
console.log("DATABASE_URL Loaded:");
console.log(process.env.DATABASE_URL);
console.log("========================================");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then((client) => {
    console.log("✅ Connected to PostgreSQL Successfully");

    client
      .query("SELECT current_database(), current_user, NOW()")
      .then((result) => {
        console.log("📦 Connected Database:");
        console.table(result.rows);
        client.release();
      })
      .catch((err) => {
        console.error("❌ Query Error");
        console.error(err);
        client.release();
      });
  })
  .catch((err) => {
    console.error("❌ PostgreSQL Connection Failed");
    console.error(err);
  });

module.exports = pool;