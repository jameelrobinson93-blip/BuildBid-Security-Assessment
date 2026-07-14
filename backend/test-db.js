require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Connected!");
    console.log(result.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection Failed");
    console.error(err);
    process.exit(1);
  }
})();