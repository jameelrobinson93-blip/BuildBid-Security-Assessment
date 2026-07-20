const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const securityLog = require("../models/securityLogModel");
const userModel = require("../models/userModel");

/* ===========================
   CONFIGURATION
=========================== */

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_MS = 5 * 60 * 1000;
const SALT_ROUNDS = 10;

/* ===========================
   REGISTER
=========================== */

exports.register = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    firstName = firstName?.trim();
    lastName = lastName?.trim();
    email = email?.trim().toLowerCase();

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters."
      });
    }

    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      SALT_ROUNDS
    );

    const newUser = await userModel.createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
      "customer"
    );

    await securityLog.logEvent(
      email,
      "REGISTER",
      req.ip
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user: newUser
    });

  } catch (err) {

    console.error("Register Error:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to create account."
    });

  }
};

/* ===========================
   LOGIN
=========================== */

exports.login = async (req, res) => {

  try {

    let { email, password } = req.body;

    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    const user = await userModel.findUserByEmail(email);

    if (!user) {

      await securityLog.logEvent(
        email,
        "FAILED",
        req.ip
      );

      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });

    }

    const now = Date.now();

    if (user.locked_until && user.locked_until > now) {

      return res.status(423).json({
        success: false,
        message: "Account locked. Try again later."
      });

    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {

      const attempts = (user.failed_attempts || 0) + 1;

      await userModel.updateFailedAttempts(
        user.id,
        attempts
      );

      if (attempts >= MAX_LOGIN_ATTEMPTS) {

        const lockUntil = now + LOCK_TIME_MS;

        await userModel.lockAccount(
          user.id,
          lockUntil
        );

        await securityLog.logEvent(
          email,
          "LOCKED",
          req.ip
        );

        return res.status(423).json({
          success: false,
          message: "Too many failed login attempts. Account locked for 5 minutes."
        });

      }

      await securityLog.logEvent(
        email,
        "FAILED",
        req.ip
      );

      return res.status(401).json({
        success: false,
        message: `Invalid email or password. (${attempts}/${MAX_LOGIN_ATTEMPTS})`
      });

    }

    await userModel.resetLoginAttempts(user.id);

    await securityLog.logEvent(
      email,
      "SUCCESS",
      req.ip
    );

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h"
      }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {

    console.error("Login Error:", err);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};