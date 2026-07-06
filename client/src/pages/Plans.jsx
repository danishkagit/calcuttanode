import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import localPlans from '../data/plans';

export default function Plans() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subscribing, setSubscribing] = useState(null);
  const [message, setMessage] = useState(null);
  const [mySub, setMySub] = useState(null);
  const [loadingSub, setLoadingSub] = useState(true);

  useEffect(() => {
    if (!user) { setLoadingSub(false); return; }
    api.get('/subscriptions/my')
      .then((res) => setMySub(res.data))
      .catch(() => {})
      .finally(() => setLoadingSub(false));
  }, [user]);

  const handleSubscribe = async (plan) => {
    if (!user) { navigate('/login'); return; }
    setSubscribing(plan.id);
    setMessage(null);
    try {
      const { data } = await api.post('/subscriptions/subscribe', { planId: plan.id });
      setMySub(data);
      setMessage({ type: 'success', text: `Subscribed to "${plan.name}"! Welcome aboard.` });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Subscription failed' });
    } finally {
      setSubscribing(null);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return;
    try {
      const { data } = await api.post('/subscriptions/cancel');
      setMySub({ ...mySub, status: 'cancelled', autoRenew: false });
      setMessage({ type: 'success', text: 'Subscription cancelled.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Cancel failed' });
    }
  };

  const daysLeft = mySub?.endDate
    ? Math.ceil((new Date(mySub.endDate) - new Date()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">Membership Plans</h1>
        <p className="text-text-muted text-lg">Choose a plan that fits your needs. Cancel anytime.</p>
      </motion.div>

      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-4 rounded-xl text-sm font-medium ${
            message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {mySub && mySub.status === 'active' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="mb-12 p-6 rounded-2xl bg-gradient-to-b from-neon-cyan/10 to-surface border border-neon-cyan/30 text-center max-w-lg mx-auto"
        >
          <h3 className="text-text-primary font-bold text-lg mb-2">Your Plan: {mySub.planName}</h3>
          <p className="text-text-muted text-sm mb-2">Started {new Date(mySub.startDate).toLocaleDateString()}</p>
          <p className="text-neon-cyan text-2xl font-bold mb-1">{daysLeft > 0 ? `${daysLeft} days left` : 'Expiring today'}</p>
          <p className="text-text-muted text-xs mb-4">Expires {new Date(mySub.endDate).toLocaleDateString()}</p>
          {mySub.autoRenew && (
            <p className="text-green-400 text-sm mb-4">Auto-renew is ON</p>
          )}
          <button onClick={handleCancel}
            className="border border-red-400/50 text-red-400 px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-400/10 transition-all"
          >
            Cancel Subscription
          </button>
        </motion.div>
      )}

      {(!mySub || mySub.status !== 'active') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {localPlans.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                plan.badge
                  ? 'bg-gradient-to-b from-neon-cyan/10 to-surface border-neon-cyan/40 shadow-lg shadow-neon-cyan/10'
                  : 'bg-surface/50 border-electric-violet/20 hover:border-neon-cyan/30'
              }`}
            >
              {plan.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full shadow-lg ${
                  plan.badge === 'Most Popular' ? 'bg-neon-cyan text-black shadow-neon-cyan/30' : 'bg-electric-violet text-white shadow-electric-violet/30'
                }`}>
                  {plan.badge}
                </span>
              )}
              <h3 className="text-text-primary font-bold text-xl mb-1 mt-2">{plan.name}</h3>
              <p className="text-text-muted text-sm mb-4 flex-1">{plan.description}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-4xl font-bold ${plan.badge ? 'text-neon-cyan' : 'text-text-primary'}`}>₹{plan.price}</span>
                <span className="text-text-muted text-sm">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="text-text-muted text-sm flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-electric-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleSubscribe(plan)} disabled={subscribing === plan.id}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  plan.badge
                    ? 'bg-brand-gradient text-white shadow-md hover:shadow-lg'
                    : 'border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10'
                } disabled:opacity-50`}
              >
                {subscribing === plan.id ? 'Processing...' : user ? 'Subscribe Now' : 'Login to Subscribe'}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
