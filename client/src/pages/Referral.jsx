import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import ParticleField from '../components/common/ParticleField';

const steps = [
  { icon: '🔗', title: 'Get Your Link', desc: 'Sign up and grab your unique referral link from your dashboard.' },
  { icon: '📤', title: 'Share It', desc: 'Send to friends, post on WhatsApp, or share on social media.' },
  { icon: '💰', title: 'Earn ₹100', desc: 'Get ₹100 for every friend who signs up and makes their first purchase.' },
];

export default function Referral() {
  const { user } = useAuth();
  const [info, setInfo] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    api.get('/referral/info').then(r => setInfo(r.data)).catch(() => {});
  }, [user]);

  const copyLink = () => {
    if (info?.referralLink) {
      navigator.clipboard.writeText(info.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen">
      <ParticleField count={25} speed={0.12} color="#543A67" />
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block text-5xl mb-4">🤝</motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">Refer & Earn ₹100</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Invite friends to Calcutta Node. You earn ₹100, they get ₹50 off their first purchase.</p>
        </motion.div>

        {!user ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-8 text-center max-w-md mx-auto">
            <div className="text-4xl mb-4">🔐</div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Sign Up to Start Referring</h2>
            <p className="text-text-muted text-sm mb-6">Create your account, get your unique referral link, and start earning.</p>
            <Link to="/register" className="inline-block bg-brand-gradient text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-neon-cyan/25 transition-all">
              Create Free Account
            </Link>
            <p className="text-text-muted text-xs mt-4">Already have an account? <Link to="/login" className="text-neon-cyan hover:underline">Log in</Link></p>
          </motion.div>
        ) : (
          <>
            {info && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
                    <p className="text-text-muted text-xs mb-1">Your Code</p>
                    <p className="text-2xl font-bold text-neon-cyan tracking-widest font-mono">{info.referralCode}</p>
                  </div>
                  <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
                    <p className="text-text-muted text-xs mb-1">Friends Referred</p>
                    <p className="text-3xl font-bold text-neon-cyan">{info.referralCount}</p>
                  </div>
                  <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
                    <p className="text-text-muted text-xs mb-1">Total Earned</p>
                    <p className="text-3xl font-bold text-green-400">₹{info.referralEarnings}</p>
                  </div>
                </div>

                <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10">
                  <p className="text-text-primary font-medium mb-2">Share Your Referral Link</p>
                  <div className="flex gap-2">
                    <input readOnly value={info.referralLink} className="flex-1 bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary text-sm font-mono focus:outline-none" />
                    <button onClick={copyLink} className="bg-brand-gradient text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-neon-cyan/20">
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {info.referredUsers?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-text-primary font-semibold mb-3">Referred Friends ({info.referredUsers.length})</h3>
                    <div className="space-y-2">
                      {info.referredUsers.map(u => (
                        <div key={u._id} className="bg-background/50 rounded-lg p-3 border border-electric-violet/10 flex justify-between items-center text-sm">
                          <span className="text-text-primary">{u.name}</span>
                          <span className="text-text-muted text-xs">{new Date(u.createdAt).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-text-primary">How It Works</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {steps.map((step, i) => (
                  <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="glass-card rounded-xl p-5 text-center"
                  >
                    <div className="text-3xl mb-3">{step.icon}</div>
                    <h3 className="text-sm font-semibold text-text-primary mb-1">{step.title}</h3>
                    <p className="text-xs text-text-muted">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
