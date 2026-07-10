const db = require("../database/database");

// Create Review
function createReview(name, rating, comment, callback) {

  db.run(
    `
    INSERT INTO reviews
    (name, rating, comment)
    VALUES (?, ?, ?)
    `,
    [name, rating, comment],
    callback
  );

}

// Get All Reviews
function getReviews(callback) {

  db.all(
    `
    SELECT *
    FROM reviews
    ORDER BY created_at DESC
    `,
    [],
    callback
  );

}

module.exports = {
  createReview,
  getReviews
};