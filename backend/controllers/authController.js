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

    try {

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

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Server error."
      });

    }

  });

};


/* ===========================
   LOGIN
=========================== */

exports.login = (req, res) => {

  console.log("🔥 LOGIN REQUEST RECEIVED");

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
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    try {

      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password."
        });
      }

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

      res.status(200).json({
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

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Login failed."
      });

    }

  });

};