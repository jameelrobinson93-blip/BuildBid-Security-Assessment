const db = require("../database/database");

// Create a new user
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

// Find user by email
function findUserByEmail(email, callback) {
  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, row) => {
      callback(err, row);
    }
  );
}

module.exports = {
  createUser,
  findUserByEmail,
};const db = require("../database/database");

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

function findUserByEmail(email, callback) {
  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, row) => {
      callback(err, row);
    }
  );
}

module.exports = {
  createUser,
  findUserByEmail,
};