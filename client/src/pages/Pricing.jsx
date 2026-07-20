import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleField from '../components/common/ParticleField';
import api from '../utils/api';

const categoryIcons = {
  'Website Development': '🌐',
  'App Development': '📱',
  'Marketing': '📈',
  'Design': '🎨',
  'Remote Support': '💻',
  'Troubleshooting': '🔧',
  'Data Recovery': '💾',
};

const categoryDesc = {
  'Website Development': 'Responsive sites, e-commerce stores, and full-stack web applications',
  'App Development': 'Cross-platform mobile apps for Android & iOS',
  'Marketing': 'SEO, performance marketing, and digital growth strategies',
  'Design': 'UI/UX, brand identity, and graphic design',
  'Remote Support': 'On-demand IT support for PC, network, and system issues',
  'Troubleshooting': 'OS, gaming, and network diagnostics',
  'Data Recovery': 'File recovery from HDD, SSD, and NVMe drives',
};

const aiAddonCategories = ['Website Development', 'App Development', 'Design', 'Marketing'];

const aiFeatures = {
  'Website Development': ['AI content generation', 'Smart SEO suggestions', 'Automated accessibility audit', 'AI chatbot integration'],
  'App Development': ['AI-powered analytics', 'Smart push notifications', 'Automated testing pipeline', 'ML-based user insights'],
  'Design': ['AI-generated design variants', 'Auto color palette extraction', 'Smart layout optimization', 'Image upscaling'],
  'Marketing': ['AI ad copy generation', 'Predictive campaign analytics', 'Automated audience segmentation', 'Smart bid optimization'],
};

const sortOptions = [
  { value: 'trending', label: '📈 Most Popular' },
  { value: 'price-asc', label: '💰 Price: Low to High' },
  { value: 'price-desc', label: '💰 Price: High to Low' },
  { value: 'newest', label: '🆕 Newest First' },
];

export default function Pricing() {
  const [servicesList, setServicesList] = useState([]);
  const [filter, setFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');

  const categories = useMemo(() => ['All', ...new Set(servicesList.map((s) => s.category))], [servicesList]);

  const processed = useMemo(() => {
    let list = servicesList;
    if (filter !== 'All') list = list.filter((s) => s.category === filter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) =>
        s.name.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.features?.some(f => f.toLowerCase().includes(q))
      );
    }
    const sorted = [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      const scoreA = (a.trending || 0) * 3 + (a.viewCount || 0) * 2 + (a.bookingCount || 0) * 5;
      const scoreB = (b.trending || 0) * 3 + (b.viewCount || 0) * 2 + (b.bookingCount || 0) * 5;
      return scoreB - scoreA;
    });
    return sorted;
  }, [servicesList, filter, searchQuery, sortBy]);

  useEffect(() => {
    api.get('/services?sort=trending')
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

        {/* Category Overview Grid */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          {Object.entries(categoryIcons).map(([cat, icon], i) => {
            const count = servicesList.filter((s) => s.category === cat).length;
            return (
              <motion.button key={cat} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04 }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setFilter(cat)}
                className={`p-3 rounded-xl text-left border transition-all duration-200 ${
                  filter === cat
                    ? 'bg-neon-cyan/10 border-neon-cyan/40 shadow-lg shadow-neon-cyan/10'
                    : 'bg-surface/30 border-electric-violet/10 hover:border-neon-cyan/20 hover:bg-surface/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{icon}</span>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-text-primary block truncate">{cat}</span>
                    <span className="text-xs text-text-muted">{count} service{count !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Search + Sort + Filter */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-6"
        >
          <div className="relative w-full md:flex-1 md:min-w-[200px] md:max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search services by name, category, or feature..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface/30 border border-electric-violet/20 text-text-primary text-sm focus:outline-none focus:border-neon-cyan/50 focus:bg-surface/50 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            )}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="w-full md:w-auto px-3 py-2.5 rounded-xl bg-surface/30 border border-electric-violet/20 text-text-primary text-sm focus:outline-none focus:border-neon-cyan/50 cursor-pointer"
          >
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button key={cat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                filter === cat
                  ? 'bg-neon-cyan text-white shadow-lg shadow-neon-cyan/30 scale-105'
                  : 'bg-surface/50 text-text-muted border border-electric-violet/20 hover:border-neon-cyan/40'
              }`}
            >
              {cat !== 'All' && <span>{categoryIcons[cat] || '📋'}</span>}
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {processed.map((service, i) => {
              const isTrending = service.trending >= 85;
              const hasAiAddon = aiAddonCategories.includes(service.category);
              const aiFeatureList = aiFeatures[service.category] || [];
              return (
                <motion.div key={service._id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  onMouseEnter={() => setHoveredId(service._id)} onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ y: -8 }}
                  className={`relative group rounded-2xl p-6 glass-card-premium overflow-hidden ${
                    isTrending ? 'border-neon-cyan/40 shadow-lg shadow-neon-cyan/10' : ''
                  } ${hasAiAddon ? 'ring-1 ring-ai-cyan/10' : ''}`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, rgba(69,229,192,0.06) 0%, transparent 40%, rgba(167,139,250,0.06) 100%)' }}
                  />
                  <div className="relative z-10">
                    {isTrending && (
                      <motion.span animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-cyan text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-neon-cyan/30 z-10"
                      >🔥 Trending</motion.span>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <motion.span animate={hoveredId === service._id ? { rotate: [0, -15, 15, 0] } : {}} transition={{ duration: 0.4 }} className="text-2xl">
                        {categoryIcons[service.category] || '📋'}
                      </motion.span>
                      <span className="text-xs uppercase tracking-wider text-text-muted">{service.category}</span>
                    </div>
                    <h3 className="text-text-primary font-semibold mb-1 group-hover:text-neon-cyan transition-colors">{service.name}</h3>
                    <p className="text-xs text-text-muted/60 mb-4">{categoryDesc[service.category] || ''}</p>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className={`text-3xl font-bold ${isTrending ? 'text-neon-cyan' : 'text-text-primary'}`}>₹{service.price}</span>
                      <span className="text-text-muted text-sm">one-time</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        {service.viewCount || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
                        {service.bookingCount || 0} booked
                      </span>
                      {(service.trending || 0) >= 80 && (
                        <span className="text-orange-400 font-medium">{service.trending}%🔥</span>
                      )}
                    </div>
                    <ul className="space-y-2.5 mb-4">
                      {service.features.map((f, j) => (
                        <motion.li key={j} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: j * 0.05 }}
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
                      <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="mb-4 p-3 rounded-xl bg-ai-gradient-subtle border border-ai-cyan/15"
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="text-xs">🤖</span>
                          <span className="text-xs font-bold text-ai-cyan">AI Addon Available</span>
                          <span className="text-xs text-text-muted ml-auto">+₹499</span>
                        </div>
                        <ul className="space-y-1">
                          {aiFeatureList.map((af, k) => (
                            <li key={k} className="text-xs text-text-muted flex items-start gap-1.5">
                              <svg className="w-3 h-3 mt-0.5 shrink-0 text-ai-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                              {af}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                    <motion.a href="/contact" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="block text-center w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-brand-gradient text-white hover:opacity-90 shadow-md hover:shadow-lg"
                    >Book Now</motion.a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {servicesList.length === 0 && (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        )}
        {servicesList.length > 0 && processed.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl block mb-3">🔍</span>
            <p className="text-text-muted">No services match "{searchQuery}"</p>
            <button onClick={() => { setSearchQuery(''); setFilter('All'); }} className="mt-3 text-sm text-neon-cyan hover:underline">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
