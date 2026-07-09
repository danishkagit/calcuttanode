import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import products from '../data/products';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import ParticleField from '../components/common/ParticleField';

const categories = ['All', ...new Set(products.map((p) => p.category))];

const categoryIcons = {
  Templates: '📄',
  Guides: '📖',
  Tools: '🔧',
  'Design Assets': '🎨',
};

export default function Products() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const [purchasing, setPurchasing] = useState(null);
  const [message, setMessage] = useState(null);

  const filtered = filter === 'All' ? products : products.filter((p) => p.category === filter);

  const handlePurchase = async (product) => {
    if (!user) { setMessage({ type: 'error', text: 'Please login to purchase' }); return; }
    setPurchasing(product.id);
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
      <ParticleField count={30} speed={0.15} />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block text-4xl mb-4">🛍️</motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">Digital Products</h1>
          <p className="text-text-muted text-lg">Premium templates, guides, and tools — instant download after purchase</p>
        </motion.div>

        <AnimatePresence>
          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className={`mb-8 p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
                message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              <span>{message.type === 'success' ? '✅' : '⚠️'}</span>
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <motion.button key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                filter === cat
                  ? 'bg-neon-cyan text-black shadow-lg shadow-neon-cyan/30 scale-105'
                  : 'bg-surface/50 text-text-muted border border-electric-violet/20 hover:border-neon-cyan/40'
              }`}
            >
              {cat !== 'All' && <span>{categoryIcons[cat] || '📦'}</span>}
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((product, i) => (
              <motion.div key={product.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 flex flex-col relative overflow-hidden group"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{categoryIcons[product.category] || '📦'}</span>
                    <span className="text-xs uppercase tracking-wider text-text-muted">{product.category}</span>
                  </div>
                  <h3 className="text-text-primary font-semibold text-lg mb-1 group-hover:text-neon-cyan transition-colors">{product.name}</h3>
                  <p className="text-text-muted text-sm mb-4 flex-1">{product.description}</p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-neon-cyan">₹{product.price}</span>
                    <span className="text-text-muted text-sm">one-time</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((f, j) => (
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
                  <motion.button onClick={() => handlePurchase(product)} disabled={purchasing === product.id}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-brand-gradient text-white hover:opacity-90 disabled:opacity-50 shadow-md hover:shadow-lg"
                  >
                    {purchasing === product.id ? 'Processing...' : `Buy Now — ₹${product.price}`}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
