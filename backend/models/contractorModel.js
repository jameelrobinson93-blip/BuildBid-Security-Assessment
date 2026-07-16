const pool = require("../database/postgres");

/* ===========================
   GET PUBLIC CONTRACTORS
=========================== */

async function getContractors() {

  const result = await pool.query(`
    SELECT *
    FROM contractors
    ORDER BY company ASC
  `);

  return result.rows;

}

/* ===========================
   GET ALL CONTRACTORS
=========================== */

async function getAllContractors() {

  const result = await pool.query(`
    SELECT *
    FROM contractors
    ORDER BY company ASC
  `);

  return result.rows;

}

/* ===========================
   GET CONTRACTOR BY ID
=========================== */

async function getContractorById(id) {

  const result = await pool.query(
    `
    SELECT *
    FROM contractors
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];

}

/* ===========================
   GET CONTRACTOR JOBS
=========================== */

async function getContractorJobs(contractorId) {

  const result = await pool.query(
    `
    SELECT *
    FROM estimates
    WHERE contractor_id = $1
    ORDER BY created_at DESC
    `,
    [contractorId]
  );

  return result.rows;

}

/* ===========================
   ADD CONTRACTOR
=========================== */

async function addContractor(contractor) {

  const result = await pool.query(
    `
    INSERT INTO contractors
    (
      company,
      specialty,
      city,
      phone,
      rating,
      status
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      5.0,
      'Active'
    )
    RETURNING *
    `,
    [
      contractor.company,
      contractor.specialty,
      contractor.city,
      contractor.phone
    ]
  );

  return result.rows[0];

}

/* ===========================
   UPDATE CONTRACTOR STATUS
=========================== */

async function updateContractorStatus(id, status) {

  const result = await pool.query(
    `
    UPDATE contractors
    SET status = $1
    WHERE id = $2
    RETURNING *
    `,
    [status, id]
  );

  return result.rows[0];

}

/* ===========================
   DELETE CONTRACTOR
=========================== */

async function deleteContractor(id) {

  await pool.query(
    `
    DELETE FROM contractors
    WHERE id = $1
    `,
    [id]
  );

}

module.exports = {

  getContractors,

  getAllContractors,

  getContractorById,

  getContractorJobs,

  addContractor,

  updateContractorStatus,

  deleteContractor

};