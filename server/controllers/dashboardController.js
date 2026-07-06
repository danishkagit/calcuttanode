import Order from '../models/Order.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import Notification from '../models/Notification.js';

export const getOverview = async (req, res) => {
  try {
    const [activeOrders, walletBalance, lastTransaction, activeSub, unreadNotifications, purchasesCount] = await Promise.all([
      Order.countDocuments({ userId: req.user._id, status: { $in: ['pending', 'in-progress'] } }),
      req.user.walletBalance,
      Transaction.findOne({ userId: req.user._id }).sort({ createdAt: -1 }),
      Subscription.findOne({ userId: req.user._id, status: 'active' }).select('planName endDate'),
      Notification.countDocuments({ userId: req.user._id, isRead: false }),
      Transaction.countDocuments({ userId: req.user._id, type: 'debit', description: /Product purchase/i }),
    ]);
    res.json({
      activeOrders,
      walletBalance,
      lastActivity: lastTransaction?.createdAt || null,
      activeSub: activeSub ? { planName: activeSub.planName, endDate: activeSub.endDate } : null,
      unreadNotifications,
      purchasesCount,
      loyaltyPoints: req.user.loyaltyPoints,
      referralEarnings: req.user.referralEarnings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ balance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const { serviceId, serviceName, price, remoteAccessNotes } = req.body;
    const order = await Order.create({
      userId: req.user._id,
      serviceId,
      serviceName,
      priceAtBooking: price,
      remoteAccessNotes,
      status: 'pending',
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
