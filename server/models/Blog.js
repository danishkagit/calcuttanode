import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  tags: [{ type: String, lowercase: true }],
  category: { type: String },
  coverImage: { type: String },
  views: { type: Number, default: 0 },
  author: { type: String, default: 'Calcutta Node' },
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
