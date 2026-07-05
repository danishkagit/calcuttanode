/**
 * User Model
 * Mongoose schema for user authentication and profile data
 * Includes password hashing, comparison methods, and profile helpers
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema Definition
 * Fields: name, email, phone, passwordHash, role, walletBalance, referralCode, lastLogin
 */
const userSchema = new mongoose.Schema(
  {
    // Basic profile information
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
      match: [/^(\+91|91|0)?[6-9]\d{9}$/, 'Please provide a valid Indian phone number'],
    },
    // Password stored as bcrypt hash (never plaintext)
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // Never include in queries by default
    },
    // User role for authorization
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    // Wallet balance for payments
    walletBalance: {
      type: Number,
      default: 0,
      min: [0, 'Wallet balance cannot be negative'],
    },
    // Optional referral code
    referralCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    // Last login timestamp
    lastLogin: {
      type: Date,
    },
    // Password reset token fields
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Indexes for performance
 * Email and phone are unique by schema definition
 */
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

/**
 * Virtual for public profile (excludes sensitive fields)
 */
userSchema.virtual('publicProfile').get(function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    role: this.role,
    walletBalance: this.walletBalance,
    referralCode: this.referralCode,
    createdAt: this.createdAt,
    lastLogin: this.lastLogin,
  };
});

/**
 * Pre-save middleware: Hash password before saving
 * Only runs if passwordHash is modified (new user or password change)
 */
userSchema.pre('save', async function (next) {
  // Only hash if password was modified
  if (!this.isModified('passwordHash')) {
    return next();
  }

  try {
    // Generate salt with 12 rounds (secure but not too slow)
    const salt = await bcrypt.genSalt(12);
    // Hash the password
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Instance method: Compare plaintext password with stored hash
 * @param {string} candidatePassword - Plaintext password to verify
 * @returns {Promise<boolean>} True if password matches
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

/**
 * Instance method: Get public profile (excludes sensitive data)
 * @returns {Object} Public user profile
 */
userSchema.methods.getPublicProfile = function () {
  return this.publicProfile;
};

/**
 * Static method: Find user by email or phone
 * @param {string} identifier - Email or phone number
 * @returns {Promise<Document|null>} User document or null
 */
userSchema.statics.findByEmailOrPhone = function (identifier) {
  const isEmail = identifier.includes('@');
  const query = isEmail
    ? { email: identifier.toLowerCase() }
    : { phone: identifier };
  return this.findOne(query);
};

module.exports = mongoose.model('User', userSchema);