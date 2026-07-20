require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false,
        }
      : false,

  max: 20, // Maximum number of clients in the pool

  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds

  connectionTimeoutMillis: 5000, // Give up after 5 seconds if a connection can't be made
});

/* ===========================
   POOL EVENTS
=========================== */

pool.on("connect", () => {
  console.log("✅ PostgreSQL client connected");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected PostgreSQL Error");
  console.error(err);
});

/* ===========================
   DATABASE CHECK
=========================== */

async function verifyDatabaseConnection() {
  try {
    const result = await pool.query(`
      SELECT
        current_database(),
        current_user,
        NOW()
    `);

    console.log("");
    console.log("========================================");
    console.log("🗄 PostgreSQL Connected");
    console.table(result.rows);
    console.log("========================================");
    console.log("");

  } catch (err) {

    console.error("");
    console.error("========================================");
    console.error("❌ Unable to connect to PostgreSQL");
    console.error(err);
    console.error("========================================");
    console.error("");

    process.exit(1);
  }
}

verifyDatabaseConnection();

module.exports = pool;