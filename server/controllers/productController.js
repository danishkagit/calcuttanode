import crypto from 'crypto';
import Product from '../models/Product.js';
import Purchase from '../models/Purchase.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ salesCount: -1, createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const purchaseProduct = async (req, res) => {
  try {
    const slug = typeof req.body.slug === 'string' ? req.body.slug : String(req.body.slug);
    let product = await Product.findOne({ slug });
    if (!product) {
      return res.status(400).json({ message: 'Product not found. Please sync products first.' });
    }
    if (req.user.walletBalance < product.price) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }
    const downloadToken = crypto.randomBytes(32).toString('hex');
    const purchase = await Purchase.create({
      userId: req.user._id,
      productId: product._id,
      productName: product.name,
      amount: product.price,
      downloadToken,
    });
    await User.findByIdAndUpdate(req.user._id, { $inc: { walletBalance: -product.price } });
    await Product.findByIdAndUpdate(product._id, { $inc: { salesCount: 1 } });
    await Transaction.create({
      userId: req.user._id,
      amount: product.price,
      type: 'debit',
      method: 'wallet',
      status: 'success',
      description: `Purchased: ${product.name}`,
    });
    res.status(201).json({ purchase, downloadToken, fileUrl: product.fileUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadProduct = async (req, res) => {
  try {
    const purchase = await Purchase.findOne({ downloadToken: req.params.token, userId: req.user._id });
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    if (!purchase.downloadedAt) {
      purchase.downloadedAt = new Date();
      await purchase.save();
    }
    const product = await Product.findById(purchase.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ fileUrl: product.fileUrl, productName: product.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
