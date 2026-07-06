import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Notification from '../models/Notification.js';

export const getReferralInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const baseUrl = process.env.FRONTEND_URL || 'https://calcuttanode.vercel.app';
    const referralLink = `${baseUrl}/register?ref=${user.referralCode}`;
    const referredUsers = await User.find({ referredBy: req.user._id }).select('name email createdAt');
    res.json({
      referralCode: user.referralCode,
      referralLink,
      referralEarnings: user.referralEarnings,
      referralCount: user.referralCount,
      referredUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReferralHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user._id,
      description: /Referral/i,
    }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
