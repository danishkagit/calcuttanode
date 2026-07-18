import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  durationDays: { type: Number, required: true },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true },
  badge: { type: String },
  popularity: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('SubscriptionPlan', planSchema);
