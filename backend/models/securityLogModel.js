const pool = require("../database/postgres");

async function logEvent(email, status, ip) {
  await pool.query(
    `INSERT INTO security_logs
    (email, status, ip_address)
    VALUES ($1,$2,$3)`,
    [email, status, ip]
  );
}

async function getLogs() {
  const result = await pool.query(
    `SELECT *
     FROM security_logs
     ORDER BY event_time DESC`
  );

  return result.rows;
}

module.exports = {
  logEvent,
  getLogs,
};