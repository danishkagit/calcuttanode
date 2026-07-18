import SubscriptionPlan from '../models/SubscriptionPlan.js';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const getPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find({ isActive: true }).sort({ popularity: -1, price: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const subscribe = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan || !plan.isActive) return res.status(404).json({ message: 'Plan not found' });
    const existing = await Subscription.findOne({ userId: req.user._id, status: 'active' });
    if (existing) return res.status(400).json({ message: 'You already have an active subscription' });
    if (req.user.walletBalance < plan.price) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.durationDays);
    const subscription = await Subscription.create({
      userId: req.user._id,
      planId: plan._id,
      planName: plan.name,
      price: plan.price,
      startDate,
      endDate,
      autoRenew: true,
    });
    await User.findByIdAndUpdate(req.user._id, { $inc: { walletBalance: -plan.price } });
    await SubscriptionPlan.findByIdAndUpdate(plan._id, { $inc: { popularity: 1 } });
    await Transaction.create({
      userId: req.user._id,
      amount: plan.price,
      type: 'debit',
      method: 'wallet',
      status: 'success',
      description: `Subscription: ${plan.name}`,
    });
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.user._id, status: 'active' }).populate('planId');
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMySubscriptionHistory = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.user._id, status: 'active' });
    if (!subscription) return res.status(404).json({ message: 'No active subscription found' });
    subscription.status = 'cancelled';
    subscription.autoRenew = false;
    subscription.cancelledAt = new Date();
    await subscription.save();
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const renewSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.user._id, status: 'active' });
    if (!subscription) return res.status(404).json({ message: 'No active subscription found' });
    const plan = await SubscriptionPlan.findById(subscription.planId);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    if (req.user.walletBalance < plan.price) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }
    const newEnd = new Date();
    newEnd.setDate(newEnd.getDate() + plan.durationDays);
    subscription.endDate = newEnd;
    await subscription.save();
    await User.findByIdAndUpdate(req.user._id, { $inc: { walletBalance: -plan.price } });
    await Transaction.create({
      userId: req.user._id,
      amount: plan.price,
      type: 'debit',
      method: 'wallet',
      status: 'success',
      description: `Subscription Renewal: ${plan.name}`,
    });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
