const jwt = require("jsonwebtoken");

const authController = (req, res, next) => {
  const token = req.headers["authorization"];
  const parseToken = token && token.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided, authorixzation  denied",
    });
  }

  try {
    // verify the token
    if (!parseToken) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
    const decoded = jwt.verify(parseToken, process.env.JWT_SECRET);
    req.userInfo = decoded;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = { authController };
