import Coupon from '../models/Coupon.js';
import Order from '../models/Order.js';

export const validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) {
      return res.status(400).json({ message: 'Invalid coupon code' });
    }
    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ message: 'Coupon usage limit reached' });
    }
    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({ message: `Minimum order amount ₹${coupon.minOrderAmount} required` });
    }
    let discount = coupon.discountType === 'percentage'
      ? Math.floor(orderAmount * coupon.discountValue / 100)
      : coupon.discountValue;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
    res.json({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discount,
      finalAmount: orderAmount - discount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { code, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) {
      return res.status(400).json({ message: 'Invalid coupon code' });
    }
    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ message: 'Coupon usage limit reached' });
    }
    let discount = coupon.discountType === 'percentage'
      ? Math.floor(order.priceAtBooking * coupon.discountValue / 100)
      : coupon.discountValue;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
    coupon.usedCount += 1;
    await coupon.save();
    order.couponCode = coupon.code;
    order.discountApplied = discount;
    order.finalPrice = order.priceAtBooking - discount;
    await order.save();
    res.json({ message: 'Coupon applied', discount, finalPrice: order.finalPrice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isActive: true, $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }] })
      .select('code discountType discountValue minOrderAmount expiresAt');
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
