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
      userid,
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
    WHERE userid = $1
    ORDER BY created_at DESC
    `,

    [userId]

  );

  return result.rows;

}

/* ===========================
   UPDATE ESTIMATE
=========================== */

async function updateEstimate(
  id,
  projectType,
  description,
  budget,
  address
) {

  const result = await pool.query(

    `
    UPDATE estimates
    SET
      project_type = $1,
      description = $2,
      budget = $3,
      address = $4
    WHERE id = $5
    RETURNING *
    `,

    [
      projectType,
      description,
      budget,
      address,
      id
    ]

  );

  return result.rows[0];

}

/* ===========================
   DELETE ESTIMATE
=========================== */

async function deleteEstimate(id) {

  await pool.query(

    `
    DELETE FROM estimates
    WHERE id = $1
    `,

    [id]

  );

}

module.exports = {
  createEstimate,
  getUserEstimates,
  updateEstimate,
  deleteEstimate
};