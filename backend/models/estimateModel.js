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
      address,
      status
    )
    VALUES
    ($1,$2,$3,$4,$5,'Pending')
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
   GET ALL ESTIMATES
=========================== */

async function getAllEstimates() {

  const result = await pool.query(

    `
    SELECT

      estimates.*,

      contractors.company AS contractor_name

    FROM estimates

    LEFT JOIN contractors

      ON estimates.contractor_id = contractors.id

    ORDER BY estimates.created_at DESC
    `

  );

  return result.rows;

}

/* ===========================
   GET ESTIMATE BY ID
=========================== */

async function getEstimateById(id) {

  const result = await pool.query(

    `
    SELECT *
    FROM estimates
    WHERE id = $1
    `,

    [id]

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
   UPDATE STATUS
=========================== */

async function updateEstimateStatus(
  id,
  status
) {

  const result = await pool.query(

    `
    UPDATE estimates
    SET status = $1
    WHERE id = $2
    RETURNING *
    `,

    [
      status,
      id
    ]

  );

  return result.rows[0];

}

/* ===========================
   ASSIGN CONTRACTOR
=========================== */

async function assignContractor(
  estimateId,
  contractorId
) {

  const result = await pool.query(

    `
    UPDATE estimates
    SET

      contractor_id = $1,

      status = 'Assigned'

    WHERE id = $2

    RETURNING *

    `,

    [

      contractorId,

      estimateId

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
    DELETE
    FROM estimates
    WHERE id = $1
    `,

    [id]

  );

}

module.exports = {

  createEstimate,

  getAllEstimates,

  getEstimateById,

  getUserEstimates,

  updateEstimate,

  updateEstimateStatus,

  assignContractor,

  deleteEstimate

};