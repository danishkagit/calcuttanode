import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

export default function ReferralSection() {
  const [info, setInfo] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.get('/referral/info').then(r => setInfo(r.data)).catch(() => {});
  }, []);

  const copyLink = () => {
    if (info?.referralLink) {
      navigator.clipboard.writeText(info.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!info) {
    return <div className="text-center py-8 text-text-muted">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-1">Refer & Earn</h2>
      <p className="text-text-muted mb-6">Invite friends and earn ₹100 per referral</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
          <p className="text-text-muted text-sm mb-1">Your Referral Code</p>
          <p className="text-2xl font-bold text-neon-cyan tracking-widest">{info.referralCode}</p>
        </div>
        <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
          <p className="text-text-muted text-sm mb-1">Friends Referred</p>
          <p className="text-3xl font-bold text-neon-cyan">{info.referralCount}</p>
        </div>
        <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
          <p className="text-text-muted text-sm mb-1">Total Earnings</p>
          <p className="text-3xl font-bold text-green-400">₹{info.referralEarnings}</p>
        </div>
      </div>

      <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 mb-6">
        <p className="text-text-primary font-medium mb-2">Share Your Referral Link</p>
        <div className="flex gap-2">
          <input readOnly value={info.referralLink} className="flex-1 bg-background border border-electric-violet/20 rounded-lg px-4 py-2 text-text-primary text-sm focus:outline-none" />
          <button onClick={copyLink} className="bg-brand-gradient text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-neon-cyan/20">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {info.referredUsers?.length > 0 && (
        <div>
          <h3 className="text-text-primary font-semibold mb-3">Referred Friends</h3>
          <div className="space-y-2">
            {info.referredUsers.map(u => (
              <div key={u._id} className="bg-background/50 rounded-lg p-3.5 border border-electric-violet/10 flex justify-between items-center text-sm">
                <span className="text-text-primary">{u.name}</span>
                <span className="text-text-muted text-xs">{new Date(u.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
