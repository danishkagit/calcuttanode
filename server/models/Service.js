import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true },
  trending: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  bookingCount: { type: Number, default: 0 },
}, { timestamps: true });

serviceSchema.virtual('popularityScore').get(function () {
  return (this.trending || 0) * 3 + (this.viewCount || 0) * 2 + (this.bookingCount || 0) * 5;
});

serviceSchema.set('toJSON', { virtuals: true });
serviceSchema.set('toObject', { virtuals: true });

export default mongoose.model('Service', serviceSchema);
