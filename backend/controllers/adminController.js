const pool = require("../database/postgres");
const userModel = require("../models/userModel");

/* ===========================
   DASHBOARD OVERVIEW
=========================== */

exports.getOverview = async (req, res) => {

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
        "SELECT COUNT(*) FROM security_logs WHERE status = 'SUCCESS'"
      );

    const failed =
      await pool.query(
        "SELECT COUNT(*) FROM security_logs WHERE status = 'FAILED'"
      );

    const locked =
      await pool.query(
        "SELECT COUNT(*) FROM security_logs WHERE status = 'LOCKED'"
      );

    const xss =
      await pool.query(
        "SELECT COUNT(*) FROM security_logs WHERE status = 'XSS_BLOCKED'"
      );

    res.json({

      securityScore: 98,

      users: Number(users.rows[0].count),

      contractors: Number(contractors.rows[0].count),

      estimates: Number(estimates.rows[0].count),

      reviews: Number(reviews.rows[0].count),

      successfulLogins: Number(success.rows[0].count),

      failedLogins: Number(failed.rows[0].count),

      lockedAccounts: Number(locked.rows[0].count),

      xssAttempts: Number(xss.rows[0].count)

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Unable to load dashboard."
    });

  }

};

/* ===========================
   SECURITY EVENTS
=========================== */

exports.getSecurityEvents = async (req, res) => {

  try {

    const result = await pool.query(

      `
      SELECT
        event_time,
        email,
        status,
        ip_address
      FROM security_logs
      ORDER BY event_time DESC
      LIMIT 100
      `

    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Unable to load security events."
    });

  }

};

/* ===========================
   GET ALL USERS
=========================== */

exports.getAllUsers = async (req, res) => {

  try {

    const users =
      await userModel.getAllUsers();

    res.json({

      success: true,

      users

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      success: false,

      message: "Unable to load users."

    });

  }

};
/* ===========================
   GET SINGLE USER
=========================== */

exports.getUserById = async (req, res) => {

  try {

    const id = req.params.id;

    const user =
      await userModel.getUserById(id);

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found."

      });

    }

    res.json({

      success: true,

      user

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      success: false,

      message: "Unable to load user."

    });

  }

};
/* ===========================
   DELETE USER
=========================== */

exports.deleteUser = async (req, res) => {

  try {

    const id = req.params.id;

    // Prevent deleting yourself
    if (Number(id) === req.user?.id) {

      return res.status(400).json({

        success: false,

        message: "You cannot delete your own administrator account."

      });

    }

    await userModel.deleteUser(id);

    res.json({

      success: true,

      message: "User deleted successfully."

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      success: false,

      message: "Unable to delete user."

    });

  }

};