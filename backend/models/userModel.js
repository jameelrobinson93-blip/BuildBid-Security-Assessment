const pool = require("../database/postgres");

/* ===========================
   FIND USER BY EMAIL
=========================== */

async function findUserByEmail(email) {
  const result = await pool.query(
    `
    SELECT
      id,
      first_name,
      last_name,
      email,
      password,
      role,
      failed_attempts,
      locked_until
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0] || null;
}

/* ===========================
   CREATE USER
=========================== */

async function createUser(
  firstName,
  lastName,
  email,
  password,
  role = "customer"
) {
  const result = await pool.query(
    `
    INSERT INTO users
    (
      first_name,
      last_name,
      email,
      password,
      role
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5
    )
    RETURNING
      id,
      first_name,
      last_name,
      email,
      role
    `,
    [
      firstName,
      lastName,
      email,
      password,
      role
    ]
  );

  return result.rows[0];
}

/* ===========================
   GET ALL USERS
=========================== */

async function getAllUsers() {
  const result = await pool.query(`
    SELECT
      id,
      first_name,
      last_name,
      email,
      role,
      failed_attempts,
      locked_until
    FROM users
    ORDER BY id DESC
  `);

  return result.rows;
}

/* ===========================
   GET USER BY ID
=========================== */

async function getUserById(id) {
  const result = await pool.query(
    `
    SELECT
      id,
      first_name,
      last_name,
      email,
      role,
      failed_attempts,
      locked_until
    FROM users
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}

/* ===========================
   UPDATE FAILED ATTEMPTS
=========================== */

async function updateFailedAttempts(id, attempts) {
  const result = await pool.query(
    `
    UPDATE users
    SET failed_attempts = $1
    WHERE id = $2
    RETURNING
      id,
      failed_attempts
    `,
    [
      attempts,
      id
    ]
  );

  return result.rows[0] || null;
}

/* ===========================
   LOCK ACCOUNT
=========================== */

async function lockAccount(id, lockedUntil) {
  const result = await pool.query(
    `
    UPDATE users
    SET
      failed_attempts = 5,
      locked_until = $1
    WHERE id = $2
    RETURNING
      id,
      locked_until
    `,
    [
      lockedUntil,
      id
    ]
  );

  return result.rows[0] || null;
}

/* ===========================
   RESET LOGIN ATTEMPTS
=========================== */

async function resetLoginAttempts(id) {
  const result = await pool.query(
    `
    UPDATE users
    SET
      failed_attempts = 0,
      locked_until = NULL
    WHERE id = $1
    RETURNING
      id
    `,
    [id]
  );

  return result.rows[0] || null;
}

/* ===========================
   DELETE USER
=========================== */

async function deleteUser(id) {
  const result = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  return result.rows[0] || null;
}

module.exports = {
  findUserByEmail,
  createUser,
  getAllUsers,
  getUserById,
  updateFailedAttempts,
  lockAccount,
  resetLoginAttempts,
  deleteUser
};