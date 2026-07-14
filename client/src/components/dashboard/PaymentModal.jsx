import { useState } from 'react';
import api from '../../utils/api';

export default function PaymentModal({ onClose, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) { resolve(window.Razorpay); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(window.Razorpay);
      script.onerror = () => resolve(null);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      const Razorpay = await loadRazorpay();
      if (!Razorpay) { alert('Failed to load Razorpay. Please try again.'); setLoading(false); return; }
      const { data: { orderId, amount: amt } } = await api.post('/payments/razorpay/create-order', { amount: Number(amount) });
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_T9pFMASMqkYj4m',
        amount: amt,
        currency: 'INR',
        name: 'Calcutta Node.',
        description: 'Wallet Top-Up',
        order_id: orderId,
        handler: async (response) => {
          try {
            await api.post('/payments/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: Number(amount),
              method,
            });
            onSuccess();
            onClose();
          } catch { alert('Payment verification failed. Contact support.'); }
        },
        modal: { ondismiss: () => setLoading(false) },
        prefill: { contact: '', email: '' },
        theme: { color: '#7EBBC5' },
      };
      const rzp = new Razorpay(options);
      rzp.on('payment.failed', () => alert('Payment failed. Please try again.'));
      rzp.open();
    } catch (err) {
      alert(err.response?.data?.message || 'Payment error');
    } finally { setLoading(false); }
  };

  const handleBankTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('amount', Number(amount));
      formData.append('utrNumber', utrNumber);
      if (screenshot) formData.append('screenshot', screenshot);
      await api.post('/payments/bank-transfer', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Bank transfer submitted! Awaiting admin approval.');
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-surface rounded-xl p-6 border border-electric-violet/20 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-text-primary mb-4">Add Funds</h2>
        <div className="flex gap-2 mb-4">
          {['upi', 'card', 'netbanking', 'bank_transfer'].map((m) => (
            <button key={m} onClick={() => setMethod(m)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${method === m ? 'bg-neon-cyan text-background' : 'bg-electric-violet/20 text-text-muted hover:text-text-primary'}`}>
              {m === 'bank_transfer' ? 'Bank Transfer' : m.toUpperCase()}
            </button>
          ))}
        </div>
        {method === 'bank_transfer' ? (
          <form onSubmit={handleBankTransfer} className="space-y-4">
            <div className="bg-background/50 rounded-lg p-3 text-sm text-text-muted">
              <p className="text-neon-cyan font-medium mb-1">Bank Details:</p>
              <p>Account: Calcutta Node.</p>
              <p>Bank: To be added</p>
              <p>IFSC: To be added</p>
            </div>
            <input type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required min="1" className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan" />
            <input type="text" placeholder="UTR Number" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} required className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan" />
            <input type="file" accept="image/*,.pdf" onChange={(e) => setScreenshot(e.target.files[0])} className="w-full text-text-muted text-sm" />
            <button type="submit" disabled={loading} className="w-full bg-brand-gradient text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Bank Transfer'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <input type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required min="1" className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan" />
            <button onClick={handleRazorpayPayment} disabled={loading || !amount} className="w-full bg-brand-gradient text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? 'Processing...' : `Pay ₹${amount || '0'} via ${method.toUpperCase()}`}
            </button>
          </div>
        )}
        <button onClick={onClose} className="w-full mt-3 text-text-muted text-sm hover:text-text-primary transition-colors">Cancel</button>
      </div>
    </div>
  );
}