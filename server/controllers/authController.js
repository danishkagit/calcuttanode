/**
 * Authentication Controller
 * Handles user registration, login, token refresh, and logout
 * Implements JWT access tokens and refresh tokens with httpOnly cookies
 */

const User = require('../models/User');
const generateTokens = require('../utils/generateToken');

/**
 * Register a new user
 * @param {Request} req - Express request object with name, email, phone, password, referralCode
 * @param {Response} res - Express response object
 * @returns {Promise<void>} JSON response with user data and tokens
 */
const register = async (req, res) => {
  try {
    const { name, email, phone, password, referralCode } = req.body;

    // Check if user already exists with email or phone
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or phone already exists',
      });
    }

    // Create new user (password will be hashed by pre-save middleware)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      passwordHash: password,
      referralCode: referralCode || null,
    });

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user profile and tokens
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: user.getPublicProfile(),
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
    });
  }
};

/**
 * Login user with email/phone and password
 * @param {Request} req - Express request object with emailOrPhone and password
 * @param {Response} res - Express response object
 * @returns {Promise<void>} JSON response with user data and tokens
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select('+passwordHash'); // Explicitly include password hash

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user profile and tokens
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: user.getPublicProfile(),
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
    });
  }
};

/**
 * Refresh access token using refresh token from cookie
 * @param {Request} req - Express request object with refresh token in cookies
 * @param {Response} res - Express response object
 * @returns {Promise<void>} JSON response with new access token
 */
const refreshToken = async (req, res) => {
  try {
    // Accept refresh token from cookie or request body
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token provided',
      });
    }

    // Verify refresh token
    const jwt = require('jsonwebtoken');
    let decoded;

    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (tokenError) {
      // Clear invalid refresh token cookie
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
      });
    }

    // Find user and verify they still exist
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    // Set new refresh token cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'Token refresh failed',
    });
  }
};

/**
 * Logout user - clear refresh token cookie
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} JSON response confirming logout
 */
const logout = async (req, res) => {
  try {
    // Clear refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
    });
  }
};

/**
 * Get current authenticated user profile
 * @param {Request} req - Express request object with user attached by auth middleware
 * @param {Response} res - Express response object
 * @returns {Promise<void>} JSON response with user profile
 */
const getMe = async (req, res) => {
  try {
    // User is attached by authMiddleware
    const user = req.user;

res.status(200).json({
    success: true,
    user: user.getPublicProfile(),
  });
} catch (error) {
  console.error('Get profile error:', error);
  res.status(500).json({
    success: false,
    message: 'Failed to get profile',
  });
}
};

/**
 * Request password reset email
 * @param {Request} req - Express request object with email
 * @param {Response} res - Express response object
 * @returns {Promise<void>} JSON response
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always return success to prevent email enumeration
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If an account exists, a password reset link has been sent.',
      });
    }

    // Generate reset token (valid for 1 hour)
    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    // In production, send email with reset link
    // For development, return token in response (remove in production)
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    console.log(`📧 Password reset requested for: ${email}`);
    console.log(`🔗 Reset URL: ${resetUrl}`);

    // TODO: Send email using nodemailer
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Password Reset Request',
    //   html: `Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 1 hour.`
    // });

    res.status(200).json({
      success: true,
      message: 'If an account exists, a password reset link has been sent.',
      // Development only - remove in production
      ...(process.env.NODE_ENV === 'development' && { resetUrl }),
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset request failed',
    });
  }
};

/**
 * Reset password with token
 * @param {Request} req - Express request object with token and new password
 * @param {Response} res - Express response object
 * @returns {Promise<void>} JSON response
 */
const resetPassword = async (req, res) => {
  try {
    const crypto = require('crypto');
    const { token, password } = req.body;

    // Hash the token from request
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    // Set new password (will be hashed by pre-save middleware)
    user.passwordHash = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log(`✅ Password reset successful for: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now log in.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset failed',
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
};