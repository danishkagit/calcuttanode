import Razorpay from 'razorpay';
import crypto from 'crypto';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import Wallet from '../models/Wallet.js';

const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay keys not configured in .env');
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const razorpay = getRazorpay();
    const options = { amount: amount * 100, currency: 'INR', receipt: `receipt_${Date.now()}` };
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }
    const transaction = await Transaction.create({
      userId: req.user._id,
      amount: req.body.amount / 100,
      type: 'credit',
      method: req.body.method || 'card',
      status: 'success',
      gatewayRefId: razorpay_payment_id,
    });
    await User.findByIdAndUpdate(req.user._id, { $inc: { walletBalance: req.body.amount / 100 } });
    res.json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBankTransfer = async (req, res) => {
  try {
    const { amount, utrNumber } = req.body;
    const transaction = await Transaction.create({
      userId: req.user._id,
      amount,
      type: 'credit',
      method: 'bank_transfer',
      status: 'pending',
      utrNumber,
      screenshotPath: req.file?.path,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveBankTransfer = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status: 'success', approvedBy: req.user._id },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    await User.findByIdAndUpdate(transaction.userId, { $inc: { walletBalance: transaction.amount } });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectBankTransfer = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status: 'failed', approvedBy: req.user._id },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
