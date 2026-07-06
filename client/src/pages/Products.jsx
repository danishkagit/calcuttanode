import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import products from '../data/products';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const categories = ['All', ...new Set(products.map((p) => p.category))];

const categoryIcons = {
  Templates: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  Guides: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  Tools: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  'Design Assets': 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">Digital Products</h1>
        <p className="text-text-muted text-lg">Premium templates, guides, and tools — instant download after purchase</p>
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

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === cat
                ? 'bg-neon-cyan text-black shadow-lg shadow-neon-cyan/30 scale-105'
                : 'bg-surface/50 text-text-muted border border-electric-violet/20 hover:border-neon-cyan/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={filter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((product, i) => (
            <motion.div key={product.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-surface/50 rounded-2xl p-6 border border-electric-violet/20 hover:border-neon-cyan/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-electric-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={categoryIcons[product.category] || 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'} />
                </svg>
                <span className="text-xs uppercase tracking-wider text-text-muted">{product.category}</span>
              </div>
              <h3 className="text-text-primary font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-text-muted text-sm mb-4 flex-1">{product.description}</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-neon-cyan">₹{product.price}</span>
                <span className="text-text-muted text-sm">one-time</span>
              </div>
              <ul className="space-y-2 mb-6">
                {product.features.map((f, j) => (
                  <li key={j} className="text-text-muted text-sm flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-electric-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => handlePurchase(product)} disabled={purchasing === product.id}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-brand-gradient text-white hover:opacity-90 disabled:opacity-50 shadow-md hover:shadow-lg"
              >
                {purchasing === product.id ? 'Processing...' : `Buy Now — ₹${product.price}`}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
