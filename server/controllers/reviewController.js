import Review from '../models/Review.js';
import Order from '../models/Order.js';
import Notification from '../models/Notification.js';

export const createReview = async (req, res) => {
  try {
    const { serviceName, rating, comment } = req.body;
    const serviceId = String(req.body.serviceId);
    const orderId = String(req.body.orderId);
    const order = await Order.findOne({ _id: orderId, userId: req.user._id });
    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }
    if (order.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed orders' });
    }
    const existing = await Review.findOne({ userId: req.user._id, serviceId });
    if (existing) {
      return res.status(400).json({ message: 'You already reviewed this service' });
    }
    const review = await Review.create({ userId: req.user._id, serviceId, serviceName, orderId, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ serviceId: req.params.serviceId, isApproved: true })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
