/**
 * Token Generation Utility
 * Creates JWT access tokens and refresh tokens for authentication
 */

const jwt = require('jsonwebtoken');

/**
 * Generate access token and refresh token for a user
 * Access token: Short-lived (15 minutes) for API authentication
 * Refresh token: Long-lived (7 days) stored in httpOnly cookie
 * 
 * @param {Object} user - Mongoose user document
 * @returns {Object} Object containing accessToken and refreshToken
 */
const generateTokens = (user) => {
  // Payload for both tokens
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  // Short-lived access token (15 minutes)
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '15m',
    issuer: 'calcutta-node',
    audience: 'calcutta-node-client',
  });

  // Long-lived refresh token (7 days)
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
    issuer: 'calcutta-node',
    audience: 'calcutta-node-client',
  });

  return { accessToken, refreshToken };
};

/**
 * Verify access token
 * @param {string} token - JWT access token
 * @returns {Object|null} Decoded token payload or null if invalid
 */
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'calcutta-node',
      audience: 'calcutta-node-client',
    });
  } catch (error) {
    return null;
  }
};

/**
 * Verify refresh token
 * @param {string} token - JWT refresh token
 * @returns {Object|null} Decoded token payload or null if invalid
 */
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
      issuer: 'calcutta-node',
      audience: 'calcutta-node-client',
    });
  } catch (error) {
    return null;
  }
};

/**
 * Decode token without verification (for debugging)
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload or null
 */
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
};