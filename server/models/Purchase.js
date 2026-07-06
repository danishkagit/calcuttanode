import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  amount: { type: Number, required: true },
  downloadToken: { type: String, unique: true },
  downloadedAt: { type: Date },
}, { timestamps: true });

export default mongoose.model('Purchase', purchaseSchema);
