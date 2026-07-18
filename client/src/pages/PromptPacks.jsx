import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import ParticleField from '../components/common/ParticleField';

const packIcons = {
  'seo-content': '📈',
  'web-dev': '💻',
  'copywriting-sales': '✍️',
  'social-media': '📱',
  'resume-career': '💼',
  'business-startup': '🏢',
  'academic-research': '🎓',
  'creative-writing': '✒️',
  'email-marketing': '📧',
  'productivity-life': '⚡',
};

const packColors = {
  'seo-content': 'from-emerald-400 to-teal-500',
  'web-dev': 'from-blue-400 to-indigo-500',
  'copywriting-sales': 'from-orange-400 to-red-500',
  'social-media': 'from-pink-400 to-rose-500',
  'resume-career': 'from-violet-400 to-purple-500',
  'business-startup': 'from-amber-400 to-yellow-500',
  'academic-research': 'from-cyan-400 to-sky-500',
  'creative-writing': 'from-fuchsia-400 to-pink-500',
  'email-marketing': 'from-lime-400 to-green-500',
  'productivity-life': 'from-slate-400 to-gray-500',
};

export default function PromptPacks() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.get('/products')
      .then((res) => {
        const all = Array.isArray(res.data) ? res.data : [];
        setProducts(all.filter((p) => p.category === 'Prompt Packs'));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePurchase = async (product) => {
    if (!user) { setMessage({ type: 'error', text: 'Please login to purchase' }); return; }
    setPurchasing(product.slug);
    setMessage(null);
    try {
      const { data } = await api.post('/products/purchase', { slug: product.slug });
      setMessage({ type: 'success', text: `Purchased "${product.name}"! Download link sent.` });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Purchase failed' });
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="relative min-h-screen">
      <ParticleField count={25} speed={0.12} />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="inline-block text-5xl mb-4">🧠</motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent mb-3">
            AI Prompt Packs
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Unlock the full potential of AI with curated prompt packs. Each pack contains 15 expert-crafted prompts for a specific use case — copy, paste, and get better results instantly.
          </p>
        </motion.div>

        <AnimatePresence>
          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className={`mb-8 p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
                message.type === 'success' ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
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
              className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.map((product, i) => {
                const slugKey = product.slug.replace('prompts-', '');
                return (
                  <motion.div key={product._id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="glass-card rounded-2xl p-6 flex flex-col relative overflow-hidden group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${packColors[slugKey] || 'from-gray-400 to-gray-500'} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className="relative flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{packIcons[slugKey] || '📋'}</span>
                        <span className="text-xs uppercase tracking-wider text-text-muted bg-surface/50 px-2 py-1 rounded-full">15 Prompts</span>
                      </div>
                      <h3 className="text-text-primary font-semibold text-lg mb-1 group-hover:text-emerald-400 transition-colors">{product.name}</h3>
                      <p className="text-text-muted text-sm mb-4 flex-1">{product.description}</p>
                      <ul className="space-y-1.5 mb-6">
                        {product.features.map((f, j) => (
                          <li key={j} className="text-text-muted text-xs flex items-start gap-2">
                            <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold text-emerald-400">₹{product.price}</span>
                        <span className="text-text-muted text-sm">one-time</span>
                      </div>
                      <motion.button onClick={() => handlePurchase(product)} disabled={purchasing === product.slug}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90 disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-emerald-500/20"
                      >
                        {purchasing === product.slug ? 'Processing...' : `Buy Now — ₹${product.price}`}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
