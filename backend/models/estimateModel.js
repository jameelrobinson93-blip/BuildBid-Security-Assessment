const pool = require("../database/postgres");

/* ===========================
   CREATE ESTIMATE
=========================== */

async function createEstimate(
  userId,
  projectType,
  description,
  budget,
  address
) {

  const result = await pool.query(

    `
    INSERT INTO estimates
    (
      user_id,
      project_type,
      description,
      budget,
      address
    )
    VALUES
    ($1,$2,$3,$4,$5)
    RETURNING *
    `,

    [
      userId,
      projectType,
      description,
      budget,
      address
    ]

  );

  return result.rows[0];

}

/* ===========================
   GET USER ESTIMATES
=========================== */

async function getUserEstimates(userId) {

  const result = await pool.query(

    `
    SELECT *
    FROM estimates
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,

    [userId]

  );

  return result.rows;

}

module.exports = {
  createEstimate,
  getUserEstimates
};