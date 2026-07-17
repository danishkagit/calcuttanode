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

const aiAddonCategories = ['Website Development', 'App Development', 'Design', 'Marketing'];

const aiFeatures = {
  'Website Development': ['AI content generation', 'Smart SEO suggestions', 'Automated accessibility audit', 'AI chatbot integration'],
  'App Development': ['AI-powered analytics', 'Smart push notifications', 'Automated testing pipeline', 'ML-based user insights'],
  'Design': ['AI-generated design variants', 'Auto color palette extraction', 'Smart layout optimization', 'Image upscaling & enhancement'],
  'Marketing': ['AI ad copy generation', 'Predictive campaign analytics', 'Automated audience segmentation', 'Smart bid optimization'],
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
                  ? 'bg-neon-cyan text-white shadow-lg shadow-neon-cyan/30 scale-105'
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
              const hasAiAddon = aiAddonCategories.includes(service.category);
              const aiFeatureList = aiFeatures[service.category] || [];
              return (
                <motion.div key={service._id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  onMouseEnter={() => setHoveredId(service._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ y: -8 }}
                  className={`relative group rounded-2xl p-6 glass-card-premium card-hover-premium overflow-hidden ${
                    isTrending
                      ? 'border-neon-cyan/40 shadow-lg shadow-neon-cyan/10'
                      : ''
                  } ${hasAiAddon ? 'ring-1 ring-ai-cyan/10' : ''}`}
                >
                  <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, rgba(69,229,192,0.06) 0%, transparent 40%, rgba(167,139,250,0.06) 100%)' }}
                  />
                  <motion.div
                    className="absolute -top-16 -right-16 w-32 h-32 bg-ai-cyan/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  />
                  <div className="relative z-10">
                    {isTrending && (
                      <motion.span
                        animate={{ y: [0, -2, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-cyan text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-neon-cyan/30 z-10"
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
                    <ul className="space-y-2.5 mb-4">
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
                    {hasAiAddon && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4 p-3 rounded-xl bg-ai-gradient-subtle border border-ai-cyan/15 animate-ai-glow"
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="text-xs">🤖</span>
                          <span className="text-xs font-bold text-ai-cyan">AI Addon Available</span>
                          <span className="text-xs text-text-muted ml-auto">+₹499</span>
                        </div>
                        <ul className="space-y-1">
                          {aiFeatureList.map((af, k) => (
                            <li key={k} className="text-xs text-text-muted flex items-start gap-1.5">
                              <svg className="w-3 h-3 mt-0.5 shrink-0 text-ai-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                              {af}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
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
