const jwt = require("jsonwebtoken");

module.exports = function verifyAdmin(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing."
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "buildbid_secret_key"
    );

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Administrator access required."
      });
    }

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });

  }

};