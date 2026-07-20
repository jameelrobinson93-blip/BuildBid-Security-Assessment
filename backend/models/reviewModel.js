const pool = require("../database/postgres");

/* ===========================
   CREATE REVIEW
=========================== */

async function createReview(name, rating, comment) {
  const reviewRating = Number(rating);

  if (
    Number.isNaN(reviewRating) ||
    reviewRating < 1 ||
    reviewRating > 5
  ) {
    throw new Error("Rating must be between 1 and 5.");
  }

  const result = await pool.query(
    `
    INSERT INTO reviews
    (
      name,
      rating,
      comment
    )
    VALUES
    (
      $1,
      $2,
      $3
    )
    RETURNING
      id,
      name,
      rating,
      comment,
      created_at
    `,
    [
      name,
      reviewRating,
      comment
    ]
  );

  return result.rows[0];
}

/* ===========================
   GET ALL REVIEWS
=========================== */

async function getReviews() {
  const result = await pool.query(`
    SELECT
      id,
      name,
      rating,
      comment,
      created_at
    FROM reviews
    ORDER BY created_at DESC
  `);

  return result.rows;
}

module.exports = {
  createReview,
  getReviews,
};