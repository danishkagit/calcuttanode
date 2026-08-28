import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import toolsRegistry, { categories, categoryIcons } from '../data/toolsRegistry';
import externalTools from '../data/seoTools';
import ParticleField from '../components/common/ParticleField';

const externalCategories = [...new Set(externalTools.map(t => t.category))];

export default function Tools() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [tab, setTab] = useState('native'); // native | external

  const fuseNative = useMemo(() => new Fuse(toolsRegistry, { keys: ['name', 'desc', 'category'], threshold: 0.3 }), []);
  const fuseExternal = useMemo(() => new Fuse(externalTools, { keys: ['name', 'description', 'category'], threshold: 0.3 }), []);

  const nativeFiltered = useMemo(() => {
    let list = query ? fuseNative.search(query).map(r => r.item) : toolsRegistry;
    if (activeCategory !== 'All') list = list.filter(t => t.category === activeCategory);
    return list;
  }, [query, activeCategory, fuseNative]);

  const externalFiltered = useMemo(() => {
    let list = query ? fuseExternal.search(query).map(r => r.item) : externalTools;
    if (activeCategory !== 'All') list = list.filter(t => t.category === activeCategory);
    return list;
  }, [query, activeCategory, fuseExternal]);

  const cats = tab === 'native' ? categories : externalCategories;

  return (
    <div className="relative min-h-screen">
      <ParticleField count={18} speed={0.12} color="#543A67" />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="inline-block text-3xl mb-2">🛠️</motion.div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent">Free Tools</h1>
          <p className="text-text-muted text-sm md:text-base mt-2 max-w-2xl mx-auto">100% free, no signup, runs in your browser — inspired by <span className="text-neon-cyan">10015.io</span>. Instant search, one-click copy & download.</p>
          <p className="text-xs text-text-muted/60 mt-1">{toolsRegistry.length} native tools + {externalTools.length} curated resources</p>
        </motion.div>

        {/* Search + Tab */}
        <div className="max-w-3xl mx-auto mb-6 space-y-3">
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search tools — try 'json', 'qr', 'password'...  (Press / to focus)"
              onKeyDown={e => { if (e.key === 'Escape') setQuery(''); }}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface/60 border border-electric-violet/20 text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-neon-cyan/40 focus:bg-surface transition-all"
            />
            {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-neon-cyan/10 text-neon-cyan px-2 py-1 rounded-lg">Clear</button>}
          </div>

          <div className="flex justify-center">
            <div className="inline-flex bg-surface/60 border border-electric-violet/20 rounded-full p-1">
              <button onClick={() => { setTab('native'); setActiveCategory('All'); }} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${tab === 'native' ? 'bg-brand-gradient text-white shadow' : 'text-text-muted hover:text-text-primary'}`}>
                ⚡ Native Free ({toolsRegistry.length})
              </button>
              <button onClick={() => { setTab('external'); setActiveCategory('All'); }} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${tab === 'external' ? 'bg-brand-gradient text-white shadow' : 'text-text-muted hover:text-text-primary'}`}>
                🔗 Curated ({externalTools.length})
              </button>
            </div>
          </div>
        </div>

        {/* Category pills */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-6">
          {['All', ...cats].map(cat => (
            <motion.button key={cat} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => setActiveCategory(cat)}
              className={`px-3 md:px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border transition-all ${activeCategory === cat ? 'bg-neon-cyan text-white border-neon-cyan shadow-md' : 'bg-surface/50 text-text-muted border-electric-violet/20 hover:border-neon-cyan/30 hover:text-text-primary'}`}>
              {cat !== 'All' && <span>{categoryIcons[cat] || '🔧'}</span>} {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={tab + activeCategory + query} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {tab === 'native' ? nativeFiltered.map((tool, i) => (
              <motion.div key={tool.slug} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                <Link to={`/tools/${tool.slug}`} className="block glass-card rounded-xl p-4 group h-full relative overflow-hidden hover:border-neon-cyan/30 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-electric-violet/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xl">{tool.icon}</span>
                      <span className="text-[10px] font-bold bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded-full border border-neon-cyan/20">FREE</span>
                    </div>
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-neon-cyan transition-colors line-clamp-1">{tool.name}</h3>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">{tool.desc}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] bg-surface border border-electric-violet/15 px-2 py-0.5 rounded-full text-text-muted">{tool.category}</span>
                      <span className="text-xs text-neon-cyan font-medium group-hover:translate-x-0.5 transition-transform">Open →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )) : externalFiltered.map((tool, i) => (
              <motion.div key={tool.name + i} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                <a href={tool.link} target="_blank" rel="noopener noreferrer" className="block glass-card rounded-xl p-4 group h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-base">🔗</span>
                      <span className="text-[10px] bg-electric-violet/15 text-electric-violet px-2 py-0.5 rounded-full">{tool.category}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-neon-cyan transition-colors">{tool.name}</h3>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">{tool.description}</p>
                    <span className="mt-2 inline-block text-xs text-text-muted/60 group-hover:text-neon-cyan">External ↗</span>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {(tab === 'native' ? nativeFiltered : externalFiltered).length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-3xl mb-2">🔍</p><p className="text-text-muted text-sm">No tools found for "{query}" in {activeCategory}</p>
            <button onClick={() => { setQuery(''); setActiveCategory('All'); }} className="mt-3 text-xs bg-neon-cyan text-white px-4 py-2 rounded-xl">Clear filters</button>
          </motion.div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-text-muted/60">All native tools run 100% client-side. No data leaves your device. Bookmark <span className="text-neon-cyan">/tools</span> — more tools added weekly.</p>
        </div>
      </div>
    </div>
  );
}
