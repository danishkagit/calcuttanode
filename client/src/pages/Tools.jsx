import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import tools from '../data/seoTools';
import ParticleField from '../components/common/ParticleField';

const categories = [...new Set(tools.map((t) => t.category))];

const categoryIcons = {
  'AI': '🤖',
  'SEO': '🔍',
  'Writing': '✍️',
  'Design': '🎨',
  'Development': '💻',
  'Marketing': '📢',
  'Productivity': '⚡',
  'Research': '📚',
};

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  return (
    <div className="relative min-h-screen">
      <ParticleField count={35} speed={0.15} color="#543A67" />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="inline-block text-4xl mb-4"
          >
            🛠️
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">Free Tools & AI Resources</h1>
          <p className="text-text-muted text-lg">Curated free tools and AI assistants for SEO, design, coding, writing, research, and productivity</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {['All', ...categories].map((cat) => (
            <motion.button key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeCategory === cat
                  ? 'bg-neon-cyan text-white shadow-lg shadow-neon-cyan/30 scale-105'
                  : 'bg-surface/50 text-text-muted border border-electric-violet/20 hover:border-neon-cyan/40'
              }`}
            >
              {cat !== 'All' && <span>{categoryIcons[cat] || '🔧'}</span>}
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((tool, i) => (
              <motion.div key={i} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                <motion.a href={tool.link} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="block glass-card rounded-xl p-6 group h-full relative overflow-hidden"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{categoryIcons[tool.category] || '🔧'}</span>
                        <h3 className="text-text-primary font-semibold group-hover:text-neon-cyan transition-colors">{tool.name}</h3>
                      </div>
                      <div className="flex gap-1 shrink-0 ml-2">
                        <span className="text-xs bg-electric-violet/20 text-electric-violet px-2 py-1 rounded">{tool.category}</span>
                        {tool.affiliate && (
                          <span className="text-xs bg-neon-cyan/20 text-neon-cyan px-2 py-1 rounded">🔗</span>
                        )}
                      </div>
                    </div>
                    <p className="text-text-muted text-sm">{tool.description}</p>
                  </div>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-5xl mb-4 opacity-50">🔍</div>
            <p className="text-text-muted">No tools in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
