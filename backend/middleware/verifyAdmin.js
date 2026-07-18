const jwt = require("jsonwebtoken");

module.exports = function verifyAdmin(req, res, next) {

  console.log("==================================");
  console.log("ADMIN REQUEST RECEIVED");
  console.log("Headers:", req.headers);
  console.log("Authorization:", req.headers.authorization);
  console.log("==================================");

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing."
    });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

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

  } catch (err) {

    console.error("JWT Error:", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });

  }

};