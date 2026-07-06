import User from '../models/User.js';
import Order from '../models/Order.js';
import Transaction from '../models/Transaction.js';
import Subscription from '../models/Subscription.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Coupon from '../models/Coupon.js';
import Notification from '../models/Notification.js';

export const getAdminOverview = async (req, res) => {
  try {
    const [totalUsers, totalOrders, totalRevenue, pendingOrders, pendingTransfers, totalProducts, activeSubs, totalReviews] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Transaction.aggregate([{ $match: { type: 'credit', status: 'success' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Order.countDocuments({ status: { $in: ['pending', 'in-progress'] } }),
      Transaction.countDocuments({ method: 'bank_transfer', status: 'pending' }),
      Product.countDocuments({ isActive: true }),
      Subscription.countDocuments({ status: 'active' }),
      Review.countDocuments({ isApproved: false }),
    ]);
    res.json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingOrders,
      pendingTransfers,
      totalProducts,
      activeSubs,
      pendingReviews: totalReviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('userId', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    await Notification.create({
      userId: order.userId._id,
      type: 'order_status',
      title: 'Order Status Updated',
      message: `Your order "${order.serviceName}" is now ${status}.`,
      relatedId: order._id,
      link: '/dashboard',
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveBankTransfer = async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    transaction.status = status;
    transaction.approvedBy = req.user._id;
    await transaction.save();
    if (status === 'success') {
      await User.findByIdAndUpdate(transaction.userId, { $inc: { walletBalance: transaction.amount } });
    }
    await Notification.create({
      userId: transaction.userId,
      type: 'wallet',
      title: status === 'success' ? 'Bank Transfer Approved' : 'Bank Transfer Rejected',
      message: status === 'success'
        ? `Your bank transfer of ₹${transaction.amount} has been approved and added to your wallet.`
        : `Your bank transfer of ₹${transaction.amount} has been rejected. Contact support for details.`,
    });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(subs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRevenueReport = async (req, res) => {
  try {
    const monthly = await Transaction.aggregate([
      { $match: { type: 'credit', status: 'success' } },
      { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    const byMethod = await Transaction.aggregate([
      { $match: { type: 'credit', status: 'success' } },
      { $group: { _id: '$method', total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]);
    const topServices = await Order.aggregate([
      { $group: { _id: '$serviceName', count: { $sum: 1 }, revenue: { $sum: '$priceAtBooking' } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    res.json({ monthly, byMethod, topServices });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
