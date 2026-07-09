import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleField from '../components/common/ParticleField';
import api from '../utils/api';

const icons = {
  'Remote Support': '💻',
  'Data Recovery': '💾',
  'Website Development': '🌐',
  'App Development': '📱',
  'Design': '🎨',
  'Marketing': '📢',
  'Troubleshooting': '🔧',
};

export default function Pricing() {
  const [servicesList, setServicesList] = useState([]);
  const [filter, setFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  const categories = useMemo(() => ['All', ...new Set(servicesList.map((s) => s.category))], [servicesList]);
  const filtered = filter === 'All' ? servicesList : servicesList.filter((s) => s.category === filter);

  useEffect(() => {
    api.get('/services')
      .then((res) => setServicesList(Array.isArray(res.data) ? res.data : []))
      .catch(() => {});
  }, []);

  return (
    <div className="relative min-h-screen">
      <ParticleField count={30} speed={0.15} />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block text-4xl mb-4">💰</motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">Pricing</h1>
          <p className="text-text-muted text-lg">Fixed rates, no surprises. Pick a plan that fits your needs.</p>
        </motion.div>

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
              {cat !== 'All' && <span>{icons[cat] || '📋'}</span>}
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((service, i) => {
              const isTrending = service.trending >= 85;
              return (
                <motion.div key={service._id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  onMouseEnter={() => setHoveredId(service._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ y: -8 }}
                  className={`relative group rounded-2xl p-6 glass-card overflow-hidden ${
                    isTrending
                      ? 'border-neon-cyan/40 shadow-lg shadow-neon-cyan/10 hover:shadow-neon-cyan/20'
                      : ''
                  }`}
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    {isTrending && (
                      <motion.span
                        animate={{ y: [0, -2, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-cyan text-black text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-neon-cyan/30 z-10"
                      >
                        🔥 Trending
                      </motion.span>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <motion.span
                        animate={hoveredId === service._id ? { rotate: [0, -15, 15, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className="text-2xl"
                      >
                        {icons[service.category] || '📋'}
                      </motion.span>
                      <span className="text-xs uppercase tracking-wider text-text-muted">{service.category}</span>
                    </div>
                    <h3 className="text-text-primary font-semibold mb-1 group-hover:text-neon-cyan transition-colors">{service.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className={`text-3xl font-bold ${isTrending ? 'text-neon-cyan' : 'text-text-primary'}`}>₹{service.price}</span>
                      <span className="text-text-muted text-sm">one-time</span>
                    </div>
                    <ul className="space-y-2.5 mb-6">
                      {service.features.map((f, j) => (
                        <motion.li key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: j * 0.05 }}
                          className="text-text-muted text-sm flex items-start gap-2"
                        >
                          <svg className="w-4 h-4 mt-0.5 shrink-0 text-electric-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                    <motion.a href="/contact"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="block text-center w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-brand-gradient text-white hover:opacity-90 shadow-md hover:shadow-lg"
                    >
                      Book Now
                    </motion.a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
