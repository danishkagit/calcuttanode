import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  fileUrl: { type: String, required: true },
  previewImage: { type: String },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true },
  salesCount: { type: Number, default: 0 },
  originalPrice: { type: Number },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
