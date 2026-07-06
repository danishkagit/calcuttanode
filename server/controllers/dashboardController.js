import Order from '../models/Order.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

export const getOverview = async (req, res) => {
  try {
    const activeOrders = await Order.countDocuments({ userId: req.user._id, status: { $in: ['pending', 'in-progress'] } });
    const walletBalance = req.user.walletBalance;
    const lastTransaction = await Transaction.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ activeOrders, walletBalance, lastActivity: lastTransaction?.createdAt || null });
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
