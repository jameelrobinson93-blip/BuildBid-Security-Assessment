const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// REGISTER
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "Please complete all fields.",
    });
  }

  userModel.findUserByEmail(email, async (err, existingUser) => {
    if (err) return res.status(500).json(err);

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists.",
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
        if (err) return res.status(500).json(err);

        res.status(201).json({
          message: "Account created successfully!",
        });
      }
    );
  });
};

// LOGIN (we'll complete this next)
exports.login = (req, res) => {
  res.json({
    message: "Login endpoint coming next...",
  });
};