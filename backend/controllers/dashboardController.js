const pool = require("../database/postgres");

/* ===========================
   DASHBOARD STATS
=========================== */

exports.getDashboardStats = async (req, res) => {

  try {

    const users =
      await pool.query(
        "SELECT COUNT(*) FROM users"
      );

    const contractors =
      await pool.query(
        "SELECT COUNT(*) FROM contractors"
      );

    const estimates =
      await pool.query(
        "SELECT COUNT(*) FROM estimates"
      );

    const reviews =
      await pool.query(
        "SELECT COUNT(*) FROM reviews"
      );

    const success =
      await pool.query(
        "SELECT COUNT(*) FROM security_logs WHERE status='SUCCESS'"
      );

    const failed =
      await pool.query(
        "SELECT COUNT(*) FROM security_logs WHERE status='FAILED'"
      );

    const locked =
      await pool.query(
        "SELECT COUNT(*) FROM security_logs WHERE status='LOCKED'"
      );

    const xss =
      await pool.query(
        "SELECT COUNT(*) FROM security_logs WHERE status='XSS_BLOCKED'"
      );

    return res.json({

      success: true,

      stats: {

        users: Number(users.rows[0].count),

        contractors: Number(contractors.rows[0].count),

        estimates: Number(estimates.rows[0].count),

        reviews: Number(reviews.rows[0].count),

        successLogins: Number(success.rows[0].count),

        failedLogins: Number(failed.rows[0].count),

        lockedAccounts: Number(locked.rows[0].count),

        blockedXSS: Number(xss.rows[0].count)

      }

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Unable to load dashboard statistics."

    });

  }

};