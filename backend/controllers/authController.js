const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

/* ===========================
   REGISTER
=========================== */

exports.register = async (req, res) => {

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields."
    });
  }

  userModel.findUserByEmail(email, async (err, existingUser) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server error."
      });
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    userModel.createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
      "customer",
      (err) => {

        if (err) {
          return res.status(500).json({
            success: false,
            message: "Unable to create account."
          });
        }

        res.status(201).json({
          success: true,
          message: "Account created successfully!"
        });

      }
    );

  });

};

/* ===========================
   LOGIN
=========================== */

exports.login = (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required."
    });
  }

  userModel.findUserByEmail(email, async (err, user) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server error."
      });
    }

    if (!user) {

      console.log("❌ Unknown user attempted login:", email);

      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });

    }

    const now = Date.now();

    // Check if account is locked
    if (user.locked_until && user.locked_until > now) {

      console.log("🚨 ACCOUNT LOCKED");
      console.log("User:", email);

      return res.status(423).json({
        success: false,
        message: "Account locked. Try again in 5 minutes."
      });

    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {

      const attempts = (user.failed_attempts || 0) + 1;

      console.log("");
      console.log("========== LOGIN FAILURE ==========");
      console.log("User:", email);
      console.log("Attempt:", attempts);
      console.log("Time:", new Date().toLocaleString());

      userModel.updateFailedAttempts(user.id, attempts, () => {});

      if (attempts >= 5) {

        const lockUntil = now + (5 * 60 * 1000);

        userModel.lockAccount(user.id, lockUntil, () => {});

        console.log("");
        console.log("🚨 SECURITY ALERT 🚨");
        console.log("Possible Brute Force Attack");
        console.log("Account Locked");
        console.log("User:", email);
        console.log("==============================");

        return res.status(423).json({
          success: false,
          message: "Too many failed login attempts. Account locked for 5 minutes."
        });

      }

      return res.status(401).json({
        success: false,
        message: `Invalid email or password. (${attempts}/5 attempts)`
      });

    }

    // Successful login

    userModel.resetLoginAttempts(user.id, () => {});

    console.log("");
    console.log("========== LOGIN SUCCESS ==========");
    console.log("User:", email);
    console.log("Time:", new Date().toLocaleString());
    console.log("===================================");

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      "buildbid_secret_key",
      {
        expiresIn: "1h"
      }
    );

    res.json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role
      }
    });

  });

};