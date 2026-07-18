import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  method: { type: String, enum: ['upi', 'card', 'netbanking', 'bank_transfer', 'wallet', 'cash'] },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  gatewayRefId: { type: String },
  description: { type: String },
  utrNumber: { type: String },
  screenshotPath: { type: String },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
