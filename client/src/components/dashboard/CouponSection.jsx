import { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function CouponSection() {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/coupons').then(r => setCoupons(r.data)).catch(() => {});
  }, []);

  const handleValidate = async () => {
    if (!code) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await api.post('/coupons/validate', { code, orderAmount: 0 });
      setResult({ valid: true, ...res.data });
    } catch (err) {
      setResult({ valid: false, message: err.response?.data?.message || 'Invalid coupon' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-1">Coupons & Offers</h2>
      <p className="text-text-muted mb-6">Check available discounts and promo codes</p>

      <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 max-w-md mb-6">
        <p className="text-text-primary font-medium mb-2">Check a Coupon Code</p>
        <div className="flex gap-2">
          <input type="text" placeholder="Enter coupon code" value={code} onChange={e => setCode(e.target.value.toUpperCase())}
            className="flex-1 bg-background border border-electric-violet/20 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan uppercase" />
          <button onClick={handleValidate} disabled={loading || !code}
            className="bg-brand-gradient text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-neon-cyan/20 disabled:opacity-50">
            {loading ? '...' : 'Check'}
          </button>
        </div>
        {result && (
          <div className={`mt-3 p-3 rounded-lg text-sm ${result.valid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {result.valid
              ? `${result.code}: ${result.discountType === 'percentage' ? `${result.discountValue}% off` : `₹${result.discountValue} off`}`
              : result.message}
          </div>
        )}
      </div>

      {coupons.length > 0 && (
        <div>
          <h3 className="text-text-primary font-semibold mb-3">Available Coupons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coupons.map(c => (
              <div key={c._id} className="bg-background/50 rounded-xl p-4 border border-electric-violet/10">
                <p className="text-neon-cyan font-bold text-lg tracking-widest">{c.code}</p>
                <p className="text-text-primary text-sm mt-1">
                  {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                </p>
                {c.minOrderAmount > 0 && <p className="text-text-muted text-xs mt-1">Min. order: ₹{c.minOrderAmount}</p>}
                {c.expiresAt && <p className="text-text-muted text-xs">Expires: {new Date(c.expiresAt).toLocaleDateString()}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
