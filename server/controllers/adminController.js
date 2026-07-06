import User from '../models/User.js';
import Order from '../models/Order.js';
import Transaction from '../models/Transaction.js';
import Subscription from '../models/Subscription.js';
import SubscriptionPlan from '../models/SubscriptionPlan.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Coupon from '../models/Coupon.js';
import Notification from '../models/Notification.js';
import ContactMessage from '../models/ContactMessage.js';
import Blog from '../models/Blog.js';
import Service from '../models/Service.js';

export const getAdminOverview = async (req, res) => {
  try {
    const [
      totalUsers, totalOrders, totalRevenue, pendingOrders,
      pendingTransfers, totalProducts, activeSubs, pendingReviews,
      unreadMessages, totalBlogs, totalPlans, recentUsers,
    ] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Transaction.aggregate([{ $match: { type: 'credit', status: 'success' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Order.countDocuments({ status: { $in: ['pending', 'in-progress'] } }),
      Transaction.countDocuments({ method: 'bank_transfer', status: 'pending' }),
      Product.countDocuments({ isActive: true }),
      Subscription.countDocuments({ status: 'active' }),
      Review.countDocuments({ isApproved: false }),
      ContactMessage.countDocuments({ isRead: false }),
      Blog.countDocuments(),
      SubscriptionPlan.countDocuments({ isActive: true }),
      User.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
    ]);
    res.json({
      totalUsers, totalOrders, totalRevenue: totalRevenue[0]?.total || 0,
      pendingOrders, pendingTransfers, totalProducts, activeSubs,
      pendingReviews, unreadMessages, totalBlogs, totalPlans, recentUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]};
    }
    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adjustWallet = async (req, res) => {
  try {
    const { amount, description } = req.body;
    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ message: 'Valid amount required' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { $inc: { walletBalance: amount } }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    await Transaction.create({
      userId: user._id, amount: Math.abs(amount),
      type: amount > 0 ? 'credit' : 'debit', method: 'wallet',
      status: 'success',
      description: description || `Admin ${amount > 0 ? 'credit' : 'debit'}: ₹${Math.abs(amount)}`,
    });
    await Notification.create({
      userId: user._id, type: 'wallet',
      title: `Wallet ${amount > 0 ? 'Credited' : 'Debited'}`,
      message: `Admin ${amount > 0 ? 'added' : 'deducted'} ₹${Math.abs(amount)} ${description ? `(${description})` : ''}`,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete yourself' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await Promise.all([
      Order.deleteMany({ userId: user._id }),
      Transaction.deleteMany({ userId: user._id }),
      Subscription.deleteMany({ userId: user._id }),
      Notification.deleteMany({ userId: user._id }),
    ]);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminOrders = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'all') query.status = status;
    const orders = await Order.find(query).populate('userId', 'name email').sort({ createdAt: -1 });
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
      userId: order.userId._id, type: 'order_status',
      title: 'Order Status Updated',
      message: `Your order "${order.serviceName}" is now ${status}.`,
      relatedId: order._id, link: '/dashboard',
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminTransactions = async (req, res) => {
  try {
    const { status: txStatus } = req.query;
    let query = {};
    if (txStatus && txStatus !== 'all') query.status = txStatus;
    const transactions = await Transaction.find(query).populate('userId', 'name email').sort({ createdAt: -1 });
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
      userId: transaction.userId, type: 'wallet',
      title: status === 'success' ? 'Bank Transfer Approved' : 'Bank Transfer Rejected',
      message: status === 'success'
        ? `Your bank transfer of ₹${transaction.amount} has been approved.`
        : `Your bank transfer of ₹${transaction.amount} has been rejected. Contact support.`,
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

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Plan deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find().sort({ price: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markMessageRead = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    await Notification.create({
      userId: review.userId, type: 'review',
      title: 'Review Approved!',
      message: `Your review for "${review.serviceName}" has been approved and is now visible.`,
    });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReviewsAdmin = async (req, res) => {
  try {
    const reviews = await Review.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(reviews);
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
      { $sort: { count: -1 } }, { $limit: 10 },
    ]);
    const totalRevenue = await Transaction.aggregate([
      { $match: { type: 'credit', status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalRefunds = await Transaction.aggregate([
      { $match: { type: 'debit', status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const dailyStats = await Transaction.aggregate([
      { $match: { type: 'credit', status: 'success', createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json({ monthly, byMethod, topServices, totalRevenue: totalRevenue[0]?.total || 0, totalRefunds: totalRefunds[0]?.total || 0, dailyStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const broadcastNotification = async (req, res) => {
  try {
    const { title, message, userIds } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message required' });
    }
    if (userIds && Array.isArray(userIds)) {
      const notifications = userIds.map(uid => ({ userId: uid, type: 'admin', title, message }));
      await Notification.insertMany(notifications);
      res.json({ message: `Notification sent to ${userIds.length} users` });
    } else {
      const users = await User.find().select('_id');
      const notifications = users.map(u => ({ userId: u._id, type: 'admin', title, message }));
      await Notification.insertMany(notifications);
      res.json({ message: `Notification sent to all ${users.length} users` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const seedServiceData = [
  { name: 'Website Development', category: 'Website Development', price: 4999, features: ['5-page responsive site', 'Mobile-first design', 'Contact form integration', 'SEO basics setup', '1 month support'], trending: 100 },
  { name: 'Full Stack Web Development', category: 'Website Development', price: 14999, features: ['Custom frontend & backend', 'Database design (MongoDB/MySQL)', 'REST API development', 'User authentication & sessions', 'Deployment & hosting setup', '3 months support'], trending: 78 },
  { name: 'E-Commerce Store Setup', category: 'Website Development', price: 7999, features: ['Product catalog setup', 'Payment gateway integration', 'Mobile optimized', 'Order management', 'Basic SEO'], trending: 85 },
  { name: 'Mobile App Development', category: 'App Development', price: 9999, features: ['Android & iOS apps', 'Cross-platform (React Native/Flutter)', 'API & backend integration', 'Push notifications', 'App store deployment assistance', '2 months support'], trending: 92 },
  { name: 'Digital Marketing', category: 'Marketing', price: 2999, features: ['Social media management (1 month)', 'Content calendar', 'Basic analytics & reporting', 'Monthly performance report'], trending: 90 },
  { name: 'SEO Optimization', category: 'Marketing', price: 1999, features: ['On-page SEO audit', 'Keyword research', 'Meta tags optimization', 'Google Search Console setup', 'Monthly report'], trending: 95 },
  { name: 'Performance Marketing', category: 'Marketing', price: 4999, features: ['Google/Facebook ads setup', 'Ad copy & creatives', 'Conversion tracking', 'A/B testing', 'Optimization (2 weeks)'], trending: 70 },
  { name: 'Remote IT Support - Basic', category: 'Remote Support', price: 499, features: ['Remote desktop connection', 'Basic troubleshooting', 'Software installation', 'Email support'], trending: 60 },
  { name: 'Remote IT Support - Standard', category: 'Remote Support', price: 999, features: ['Everything in Basic', 'OS reinstallation help', 'Driver setup', 'Priority support', 'Follow-up session'], trending: 55 },
  { name: 'Remote IT Support - Premium', category: 'Remote Support', price: 1999, features: ['Everything in Standard', 'Network configuration', 'Security audit', 'Weekly check-in', '24/7 support'], trending: 40 },
  { name: 'Network Troubleshooting', category: 'Troubleshooting', price: 799, features: ['WiFi/LAN diagnostics', 'Router configuration', 'DNS/firewall setup', 'Speed optimization'], trending: 50 },
  { name: 'OS Installation & Upgrade', category: 'Troubleshooting', price: 599, features: ['Windows/Linux/macOS install', 'Driver setup', 'Data backup before wipe', 'Basic configuration'], trending: 65 },
  { name: 'Gaming Error Troubleshooting', category: 'Troubleshooting', price: 399, features: ['FPS/drop issues', 'Crash diagnostics', 'Driver optimization', 'Settings tuning'], trending: 45 },
  { name: 'UI/UX Design', category: 'Design', price: 2999, features: ['Wireframes & sitemap', 'High-fidelity mockups', 'Figma source file', '2 revision rounds', 'Responsive layout'], trending: 75 },
  { name: 'Graphics Design', category: 'Design', price: 999, features: ['Logo & brand identity', 'Social media posts', 'Business card design', 'Banner & flyer', 'Source files'], trending: 80 },
  { name: 'Video Editing', category: 'Design', price: 1499, features: ['Trim & cut', 'Transitions & effects', 'Background music', 'Text overlays', 'Social media export'], trending: 88 },
  { name: 'Data Recovery', category: 'Data Recovery', price: 1499, features: ['HDD/SSD/NVMe diagnostics', 'File recovery attempt', 'Free consultation', 'No recovery, no charge policy'], trending: 30 },
];

export const seedServices = async (req, res) => {
  try {
    await Service.deleteMany({});
    await Service.insertMany(seedServiceData);
    const count = await Service.countDocuments();
    res.json({ message: `Seeded ${count} services successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
