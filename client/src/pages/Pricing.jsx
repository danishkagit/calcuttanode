import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import services from '../data/services';

const categories = ['All', ...new Set(services.map((s) => s.category))];

const icons = {
  'Remote Support': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"/><path d="M9 14v3h6v-3"/><circle cx="12" cy="7" r="3"/>
      <rect x="2" y="14" width="20" height="3" rx="1"/><path d="M12 17v4"/><path d="M8 21h8"/>
    </svg>
  ),
  'Data Recovery': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9"/><path d="M21 3v6h-6"/><path d="M12 7v5l3 3"/><path d="M12 21v-9"/>
    </svg>
  ),
  'Website Development': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
    </svg>
  ),
  'Design': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>
    </svg>
  ),
  'Marketing': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  'Troubleshooting': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/>
      <path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/>
      <path d="M18.36 5.64l1.42-1.42"/>
    </svg>
  ),
};

function getPopularLabel(service) {
  if (service.id === 'remote-support-standard') return 'Most Popular';
  return null;
}

export default function Pricing() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? services : services.filter((s) => s.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">Pricing</h1>
        <p className="text-text-muted text-lg">Fixed rates, no surprises. Pick a plan that fits your needs.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap justify-center gap-2 mb-12">
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
          {filtered.map((service, i) => {
            const popularLabel = getPopularLabel(service);

            return (
              <motion.div key={service.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`relative group rounded-2xl p-6 border transition-all duration-300 ${
                  popularLabel
                    ? 'bg-gradient-to-b from-neon-cyan/10 to-surface border-neon-cyan/40 shadow-lg shadow-neon-cyan/10 hover:shadow-neon-cyan/20'
                    : 'bg-surface/50 border-electric-violet/20 hover:border-neon-cyan/30 hover:shadow-lg hover:shadow-neon-cyan/5'
                } hover:-translate-y-1`}
              >
                {popularLabel && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-cyan text-black text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-neon-cyan/30">
                    {popularLabel}
                  </span>
                )}
                <div className={`flex items-center gap-3 mb-4 ${popularLabel ? 'text-neon-cyan' : 'text-electric-violet'}`}>
                  {icons[service.category]}
                  <span className="text-xs uppercase tracking-wider text-text-muted">{service.category}</span>
                </div>
                <h3 className="text-text-primary font-semibold mb-1">{service.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className={`text-3xl font-bold ${popularLabel ? 'text-neon-cyan' : 'text-text-primary'}`}>₹{service.price}</span>
                  <span className="text-text-muted text-sm">one-time</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((f, j) => (
                    <li key={j} className="text-text-muted text-sm flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-electric-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="block text-center w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-brand-gradient text-white hover:opacity-90 shadow-md hover:shadow-lg">
                  Book Now
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
