import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: String, required: true },
  serviceName: { type: String, required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

reviewSchema.index({ userId: 1, serviceId: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
