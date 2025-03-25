const jwt = require("jsonwebtoken");

const authMiddleware = (requiredRole = null) => {
  return (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    try {
      const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
      req.user = verified; // Store user data in request (including role)

      // Check for role-based access if requiredRole is provided
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied! Unauthorized role." });
      }

      next(); // Proceed to the next middleware or route
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  };
};

module.exports = authMiddleware;
