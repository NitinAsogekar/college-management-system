// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token and protect private routes
 */
const protect = (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token signature
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'fallback_secret_key'
      );

      // Attach user payload (id, role) to request object
      req.user = decoded.user;
      next();
    } catch (error) {
      console.error('Token Verification Error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed or expired.' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided.' });
  }
};

/**
 * Middleware to restrict access strictly to Admin users
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied. Administrator privileges required.' });
  }
};

module.exports = { protect, adminOnly };