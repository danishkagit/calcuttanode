import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Notification from '../models/Notification.js';

const POINTS_PER_RUPEE = 1;
const POINTS_REDEMPTION_RATE = 0.5;

export const getLoyaltyInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const totalEarned = await Transaction.aggregate([
      { $match: { userId: req.user._id, description: /Loyalty points earned/i } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalRedeemed = await Transaction.aggregate([
      { $match: { userId: req.user._id, description: /Points redeemed/i } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    res.json({
      balance: user.loyaltyPoints,
      totalEarned: totalEarned[0]?.total || 0,
      totalRedeemed: totalRedeemed[0]?.total || 0,
      pointsPerRupee: POINTS_PER_RUPEE,
      redemptionRate: POINTS_REDEMPTION_RATE,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const redeemPoints = async (req, res) => {
  try {
    const { points } = req.body;
    const user = await User.findById(req.user._id);
    if (!points || points < 100) {
      return res.status(400).json({ message: 'Minimum 100 points required for redemption' });
    }
    if (points > user.loyaltyPoints) {
      return res.status(400).json({ message: 'Insufficient loyalty points' });
    }
    const cashValue = Math.floor(points * POINTS_REDEMPTION_RATE);
    user.walletBalance += cashValue;
    user.loyaltyPoints -= points;
    await user.save();
    await Transaction.create({
      userId: user._id,
      amount: cashValue,
      type: 'credit',
      method: 'wallet',
      status: 'success',
      description: `Points redeemed: ${points} pts = ₹${cashValue}`,
    });
    await Notification.create({
      userId: user._id,
      type: 'wallet',
      title: 'Points Redeemed!',
      message: `${points} loyalty points redeemed for ₹${cashValue} wallet credit.`,
    });
    res.json({ walletBalance: user.walletBalance, loyaltyPoints: user.loyaltyPoints, cashValue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
