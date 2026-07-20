const pool = require("../database/postgres");

/* ===========================
   LOG SECURITY EVENT
=========================== */

async function logEvent(email, status, ip) {
  try {
    await pool.query(
      `
      INSERT INTO security_logs (
        email,
        status,
        ip_address
      )
      VALUES ($1, $2, $3)
      `,
      [email, status, ip]
    );
  } catch (err) {
    console.error("Security Log Error:", err);
    throw err;
  }
}

/* ===========================
   GET SECURITY LOGS
=========================== */

async function getLogs(limit = 100) {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        email,
        status,
        ip_address,
        event_time
      FROM security_logs
      ORDER BY event_time DESC
      LIMIT $1
      `,
      [limit]
    );

    return result.rows;

  } catch (err) {
    console.error("Get Security Logs Error:", err);
    throw err;
  }
}

module.exports = {
  logEvent,
  getLogs,
};