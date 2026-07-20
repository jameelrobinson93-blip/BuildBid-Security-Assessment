const pool = require("../database/postgres");

/* ===========================
   GET ALL CONTRACTORS
=========================== */

async function getAllContractors() {
  const result = await pool.query(`
    SELECT
      id,
      company,
      specialty,
      city,
      phone,
      rating,
      status
    FROM contractors
    ORDER BY company ASC
  `);

  return result.rows;
}

/* ===========================
   PUBLIC CONTRACTORS
=========================== */

async function getContractors() {
  return getAllContractors();
}

/* ===========================
   GET CONTRACTOR BY ID
=========================== */

async function getContractorById(id) {
  const result = await pool.query(
    `
    SELECT
      id,
      company,
      specialty,
      city,
      phone,
      rating,
      status
    FROM contractors
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}

/* ===========================
   GET CONTRACTOR JOBS
=========================== */

async function getContractorJobs(contractorId) {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      phone,
      project_type,
      description,
      budget,
      address,
      status,
      created_at
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
    RETURNING
      id,
      company,
      specialty,
      city,
      phone,
      rating,
      status
    `,
    [
      contractor.company,
      contractor.specialty,
      contractor.city,
      contractor.phone,
    ]
  );

  return result.rows[0];
}

/* ===========================
   UPDATE CONTRACTOR STATUS
=========================== */

async function updateContractorStatus(id, status) {
  const allowedStatuses = ["Active", "Suspended"];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid contractor status.");
  }

  const result = await pool.query(
    `
    UPDATE contractors
    SET status = $1
    WHERE id = $2
    RETURNING
      id,
      company,
      specialty,
      city,
      phone,
      rating,
      status
    `,
    [status, id]
  );

  return result.rows[0] || null;
}

/* ===========================
   DELETE CONTRACTOR
=========================== */

async function deleteContractor(id) {
  const result = await pool.query(
    `
    DELETE FROM contractors
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  return result.rows[0] || null;
}

module.exports = {
  getContractors,
  getAllContractors,
  getContractorById,
  getContractorJobs,
  addContractor,
  updateContractorStatus,
  deleteContractor,
};