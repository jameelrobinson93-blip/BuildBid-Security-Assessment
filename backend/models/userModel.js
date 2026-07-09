const db = require("../database/database");

/* ===========================
   CREATE USER
=========================== */

function createUser(firstName, lastName, email, password, role, callback) {

  const sql = `
    INSERT INTO users
    (first_name, last_name, email, password, role)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [firstName, lastName, email, password, role],
    function (err) {
      callback(err, this);
    }
  );

}

/* ===========================
   FIND USER
=========================== */

function findUserByEmail(email, callback) {

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, row) => {
      callback(err, row);
    }
  );

}

/* ===========================
   UPDATE FAILED ATTEMPTS
=========================== */

function updateFailedAttempts(userId, attempts, callback) {

  db.run(
    `
    UPDATE users
    SET failed_attempts = ?
    WHERE id = ?
    `,
    [attempts, userId],
    callback
  );

}

/* ===========================
   LOCK ACCOUNT
=========================== */

function lockAccount(userId, lockedUntil, callback) {

  db.run(
    `
    UPDATE users
    SET locked_until = ?
    WHERE id = ?
    `,
    [lockedUntil, userId],
    callback
  );

}

/* ===========================
   RESET LOGIN ATTEMPTS
=========================== */

function resetLoginAttempts(userId, callback) {

  db.run(
    `
    UPDATE users
    SET
      failed_attempts = 0,
      locked_until = 0
    WHERE id = ?
    `,
    [userId],
    callback
  );

}

module.exports = {
  createUser,
  findUserByEmail,
  updateFailedAttempts,
  lockAccount,
  resetLoginAttempts
};