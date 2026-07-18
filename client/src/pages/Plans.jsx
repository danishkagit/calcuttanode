import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import ParticleField from '../components/common/ParticleField';

const planIcons = { 'Monthly Tune-Up': '🚀', 'Content Pass': '🌱', 'Pro Retainer': '🏢' };
const planEmoji = (name) => planIcons[name] || '📋';

export default function Plans() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [subscribing, setSubscribing] = useState(null);
  const [message, setMessage] = useState(null);
  const [mySub, setMySub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [plansRes, subRes] = await Promise.all([
          api.get('/subscriptions/plans'),
          user ? api.get('/subscriptions/my').catch(() => null) : Promise.resolve(null),
        ]);
        setPlans(Array.isArray(plansRes.data) ? plansRes.data : []);
        if (subRes?.data) setMySub(subRes.data);
      } catch {
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  const handleSubscribe = async (plan) => {
    if (!user) { navigate('/login'); return; }
    setSubscribing(plan._id);
    setMessage(null);
    try {
      const { data } = await api.post('/subscriptions/subscribe', { planId: plan._id });
      setMySub(data);
      setMessage({ type: 'success', text: `Subscribed to "${plan.name}"! Welcome aboard. 🎉` });
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
    <div className="relative min-h-screen">
      <ParticleField count={25} speed={0.15} color="#543A67" />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="inline-block text-4xl mb-4">⭐</motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">Membership Plans</h1>
          <p className="text-text-muted text-lg">Choose a plan that fits your needs. Cancel anytime.</p>
        </motion.div>

        <AnimatePresence>
          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className={`mb-8 p-4 rounded-xl text-sm font-medium flex items-center gap-2 max-w-2xl mx-auto ${
                message.type === 'success' ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              <span>{message.type === 'success' ? '✅' : '⚠️'}</span>
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <>
            {mySub && mySub.status === 'active' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="mb-12 p-8 rounded-2xl bg-gradient-to-b from-neon-cyan/10 to-surface border border-neon-cyan/30 text-center max-w-lg mx-auto relative overflow-hidden"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
                <div className="text-4xl mb-3">{planEmoji(mySub.planName)}</div>
                <h3 className="text-text-primary font-bold text-xl mb-2">Your Plan: {mySub.planName}</h3>
                <p className="text-text-muted text-sm mb-2">Started {new Date(mySub.startDate).toLocaleDateString()}</p>
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-neon-cyan text-3xl font-bold mb-1"
                >
                  {daysLeft > 0 ? `${daysLeft} days left` : 'Expiring today'}
                </motion.p>
                <p className="text-text-muted text-xs mb-4">Expires {new Date(mySub.endDate).toLocaleDateString()}</p>
                {mySub.autoRenew && (
                  <p className="text-neon-cyan text-sm mb-4">Auto-renew is ON</p>
                )}
                <motion.button onClick={handleCancel}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="border border-red-400/50 text-red-400 px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-400/10 transition-all"
                >
                  Cancel Subscription
                </motion.button>
              </motion.div>
            )}

            {(!mySub || mySub.status !== 'active') && plans.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {plans.map((plan, i) => (
                  <motion.div key={plan._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className={`relative rounded-2xl p-6 glass-card flex flex-col overflow-hidden group ${
                      plan.badge
                        ? 'border-neon-cyan/40 shadow-lg shadow-neon-cyan/10 hover:shadow-neon-cyan/20'
                        : ''
                    }`}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="text-3xl mb-3">{planEmoji(plan.name)}</div>
                      {plan.badge && (
                        <motion.span
                          animate={{ y: [0, -2, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full shadow-lg ${
                            plan.badge === 'Most Popular' ? 'bg-neon-cyan text-white shadow-neon-cyan/30' : 'bg-electric-violet text-white shadow-electric-violet/30'
                          }`}
                        >
                          {plan.badge}
                        </motion.span>
                      )}
                      <h3 className="text-text-primary font-bold text-xl mb-1 mt-2">{plan.name}</h3>
                      <p className="text-text-muted text-sm mb-4 flex-1">{plan.description}</p>
                      {plan.popularity > 0 && (
                        <p className="text-xs text-text-muted/60 mb-1 flex items-center gap-1">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                          {plan.popularity} active subscribers
                        </p>
                      )}
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className={`text-4xl font-bold ${plan.badge ? 'text-neon-cyan' : 'text-text-primary'}`}>₹{plan.price}</span>
                        <span className="text-text-muted text-sm">/month</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((f, j) => (
                          <motion.li key={j}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: j * 0.05 }}
                            className="text-text-muted text-sm flex items-start gap-2"
                          >
                            <svg className="w-4 h-4 mt-0.5 shrink-0 text-electric-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {f}
                          </motion.li>
                        ))}
                      </ul>
                      <motion.button onClick={() => handleSubscribe(plan)} disabled={subscribing === plan._id}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          plan.badge
                            ? 'bg-brand-gradient text-white shadow-md hover:shadow-lg'
                            : 'border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10'
                        } disabled:opacity-50`}
                      >
                        {subscribing === plan._id ? 'Processing...' : user ? 'Subscribe Now' : 'Login to Subscribe'}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
