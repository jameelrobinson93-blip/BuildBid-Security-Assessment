const pool = require("../database/postgres");

/* ===========================
   FIND USER BY EMAIL
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
    ($1,$2,$3,$4,$5)
    RETURNING *
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
    ORDER BY id DESC
    `

  );

  return result.rows;

}

/* ===========================
   UPDATE FAILED ATTEMPTS
=========================== */

async function updateFailedAttempts(
  id,
  attempts
) {

  await pool.query(

    `
    UPDATE users
    SET failed_attempts = $1
    WHERE id = $2
    `,

    [
      attempts,
      id
    ]

  );

}

/* ===========================
   LOCK ACCOUNT
=========================== */

async function lockAccount(
  id,
  lockedUntil
) {

  await pool.query(

    `
    UPDATE users
    SET

      failed_attempts = 5,

      locked_until = $1

    WHERE id = $2
    `,

    [
      lockedUntil,
      id
    ]

  );

}

/* ===========================
   RESET LOGIN ATTEMPTS
=========================== */

async function resetLoginAttempts(id) {

  await pool.query(

    `
    UPDATE users
    SET

      failed_attempts = 0,

      locked_until = NULL

    WHERE id = $1
    `,

    [id]

  );

}

/* ===========================
   DELETE USER
=========================== */

async function deleteUser(id) {

  await pool.query(

    `
    DELETE
    FROM users
    WHERE id = $1
    `,

    [id]

  );

}

module.exports = {

  findUserByEmail,

  createUser,

  getAllUsers,

  updateFailedAttempts,

  lockAccount,

  resetLoginAttempts,

  deleteUser

};