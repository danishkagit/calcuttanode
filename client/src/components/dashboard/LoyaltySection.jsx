import { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function LoyaltySection({ onRefresh }) {
  const [info, setInfo] = useState(null);
  const [redeemAmount, setRedeemAmount] = useState('');
  const [redeeming, setRedeeming] = useState(false);

  useEffect(() => {
    api.get('/loyalty/info').then(r => setInfo(r.data)).catch(() => {});
  }, []);

  const handleRedeem = async () => {
    const points = Number(redeemAmount);
    if (!points || points < 100) return alert('Minimum 100 points required');
    setRedeeming(true);
    try {
      const res = await api.post('/loyalty/redeem', { points });
      alert(`₹${res.data.cashValue} added to your wallet!`);
      setRedeemAmount('');
      setInfo({ ...info, balance: res.data.loyaltyPoints });
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Redemption failed');
    } finally {
      setRedeeming(false);
    }
  };

  if (!info) {
    return <div className="text-center py-8 text-text-muted">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-1">Loyalty Points</h2>
      <p className="text-text-muted mb-6">Earn points on every purchase and redeem for wallet credit</p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
          <p className="text-text-muted text-sm mb-1">Your Points</p>
          <p className="text-3xl font-bold text-neon-cyan">{info.balance}</p>
        </div>
        <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
          <p className="text-text-muted text-sm mb-1">Total Earned</p>
          <p className="text-3xl font-bold text-green-400">{info.totalEarned}</p>
        </div>
        <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
          <p className="text-text-muted text-sm mb-1">Total Redeemed</p>
          <p className="text-3xl font-bold text-purple-400">{info.totalRedeemed}</p>
        </div>
        <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
          <p className="text-text-muted text-sm mb-1">Rate</p>
          <p className="text-sm font-bold text-neon-cyan mt-2">{info.pointsPerRupee} pt/₹</p>
          <p className="text-xs text-text-muted">2 pts = ₹1</p>
        </div>
      </div>

      {info.balance >= 100 && (
        <div className="bg-background/50 rounded-xl p-5 border border-neon-cyan/30 max-w-md">
          <h3 className="text-text-primary font-semibold mb-3">Redeem Points</h3>
          <p className="text-text-muted text-sm mb-3">100 points = ₹50 wallet credit (₹0.50 per point)</p>
          <div className="flex gap-2">
            <input type="number" placeholder="Enter points (min 100)" value={redeemAmount} onChange={e => setRedeemAmount(e.target.value)} min={100} max={info.balance}
              className="flex-1 bg-background border border-electric-violet/20 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan" />
            <button onClick={handleRedeem} disabled={redeeming || redeemAmount < 100}
              className="bg-brand-gradient text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-neon-cyan/20 disabled:opacity-50">
              {redeeming ? '...' : `Get ₹${Math.floor((redeemAmount || 0) * 0.5)}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
