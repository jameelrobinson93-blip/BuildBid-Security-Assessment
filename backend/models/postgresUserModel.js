const pool = require("../database/postgres");

/* ===========================
   CREATE USER
=========================== */

async function createUser(firstName, lastName, email, password, role) {
  const result = await pool.query(
    `
    INSERT INTO users
    (first_name, last_name, email, password, role)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
    `,
    [firstName, lastName, email, password, role]
  );

  return result.rows[0];
}

/* ===========================
   FIND USER
=========================== */

async function findUserByEmail(email) {

  const result = await pool.query(

    `
    SELECT *
    FROM users
    WHERE email = $1
    `,

    [email]

  );

  return result.rows[0];

}

/* ===========================
   UPDATE FAILED ATTEMPTS
=========================== */

async function updateFailedAttempts(userId, attempts) {

  await pool.query(

    `
    UPDATE users
    SET failed_attempts = $1
    WHERE id = $2
    `,

    [attempts, userId]

  );

}

/* ===========================
   LOCK ACCOUNT
=========================== */

async function lockAccount(userId, lockedUntil) {

  await pool.query(

    `
    UPDATE users
    SET locked_until = $1
    WHERE id = $2
    `,

    [lockedUntil, userId]

  );

}

/* ===========================
   RESET LOGIN ATTEMPTS
=========================== */

async function resetLoginAttempts(userId) {

  await pool.query(

    `
    UPDATE users
    SET
      failed_attempts = 0,
      locked_until = 0
    WHERE id = $1
    `,

    [userId]

  );

}

module.exports = {
  createUser,
  findUserByEmail,
  updateFailedAttempts,
  lockAccount,
  resetLoginAttempts
};