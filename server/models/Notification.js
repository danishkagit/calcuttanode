import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['order_status', 'referral', 'subscription', 'wallet', 'coupon', 'review', 'admin'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  relatedId: { type: mongoose.Schema.Types.ObjectId },
  link: { type: String },
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
