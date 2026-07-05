/**
 * Authentication Middleware
 * Verifies JWT access token and attaches user to request
 * Protects routes that require authentication
 */

const User = require('../models/User');
const { verifyAccessToken } = require('../utils/generateToken');

/**
 * Main authentication middleware
 * Verifies access token from Authorization header
 * Attaches user document to req.user if valid
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Next middleware function
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. No token provided.',
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Invalid token format.',
      });
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please log in again.',
      });
    }

    // Find user by ID (excluding password hash)
    const user = await User.findById(decoded.userId).select('-passwordHash');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Token may be invalid.',
      });
    }

    // Attach user to request object
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed. Please try again.',
    });
  }
};

/**
 * Optional authentication middleware
 * Attaches user if token is valid, but doesn't reject if missing
 * Useful for routes that work for both authenticated and anonymous users
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Next middleware function
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue without user
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return next();
    }

    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return next();
    }

    const user = await User.findById(decoded.userId).select('-passwordHash');

    if (user) {
      req.user = user;
      req.token = token;
    }

    next();
  } catch (error) {
    // Silently continue without user on error
    next();
  }
};

/**
 * Admin-only middleware
 * Requires authentication AND admin role
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Next middleware function
 */
const adminMiddleware = async (req, res, next) => {
  try {
    // First run standard auth
    await new Promise((resolve, reject) => {
      authMiddleware(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.',
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
  }
};

/**
 * Rate limiter for auth endpoints
 * More restrictive limits for login/register to prevent brute force
 */
const authRateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
};

module.exports = {
  authMiddleware,
  optionalAuth,
  adminMiddleware,
  authRateLimit,
};