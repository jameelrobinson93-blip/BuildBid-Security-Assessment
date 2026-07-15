const pool = require("../database/postgres");

/* ===========================
   GET ALL CONTRACTORS
=========================== */

async function getAllContractors() {

  const result = await pool.query(

    `
    SELECT *
FROM contractors
ORDER BY company;
    `

  );

  return result.rows;

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

module.exports = {
  getAllContractors,
  getContractorJobs
};