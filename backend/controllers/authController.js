const securityLog = require("../models/securityLogModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

/* ===========================
   REGISTER
=========================== */

exports.register = async (req, res) => {
  try {

    const { firstName, lastName, email, password } = req.body;

    console.log("\n========== REGISTER REQUEST ==========");
    console.log(req.body);

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields."
      });
    }

    const existingUser = await userModel.findUserByEmail(email);

    console.log("Existing User:", existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
      "customer"
    );

    console.log("✅ USER CREATED");
    console.table([newUser]);

    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user: newUser
    });

  } catch (err) {

    console.error("REGISTER ERROR");
    console.error(err);

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

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    const user = await userModel.findUserByEmail(email);

    if (!user) {

      console.log("❌ User Not Found:", email);

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

      if (attempts >= 5) {

        const lockUntil = now + (5 * 60 * 1000);

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
          message: "Too many failed login attempts."
        });

      }

      await securityLog.logEvent(
        email,
        "FAILED",
        req.ip
      );

      return res.status(401).json({
        success: false,
        message: `Invalid email or password. (${attempts}/5)`
      });

    }

    await userModel.resetLoginAttempts(user.id);

    await securityLog.logEvent(
      email,
      "SUCCESS",
      req.ip
    );

    const token = jwt.sign(

      {
        id: user.id,
        email: user.email,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }

    );

    console.log("✅ LOGIN SUCCESS:", email);

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

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};