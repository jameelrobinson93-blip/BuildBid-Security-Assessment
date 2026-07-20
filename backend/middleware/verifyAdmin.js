const jwt = require("jsonwebtoken");

/* ===========================
   VERIFY ADMIN
=========================== */

function verifyAdmin(req, res, next) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing.",
      });
    }

    const parts = authHeader.split(" ");

    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });
    }

    const token = parts[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Administrator access required.",
      });
    }

    req.user = decoded;

    next();

  } catch (err) {

    console.error(
      "Admin Authentication Error:",
      err.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });

  }
}

module.exports = verifyAdmin;