import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import courses from '../data/courses';
import ParticleField from '../components/common/ParticleField';

const allLanguages = [...new Set(courses.map((c) => c.language))];
const allCategories = [...new Set(courses.map((c) => c.category))];

export default function Courses() {
  const [filterFree, setFilterFree] = useState(false);
  const [filterCert, setFilterCert] = useState(false);
  const [filterLang, setFilterLang] = useState('All');
  const [filterCat, setFilterCat] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  const filtered = useMemo(() => {
    let result = [...courses];
    if (filterFree) result = result.filter((c) => c.isFree);
    if (filterCert) result = result.filter((c) => c.hasCertificate);
    if (filterLang !== 'All') result = result.filter((c) => c.language === filterLang);
    if (filterCat !== 'All') result = result.filter((c) => c.category === filterCat);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    return result;
  }, [filterFree, filterCert, filterLang, filterCat, sortBy]);

  return (
    <div className="relative min-h-screen">
      <ParticleField count={30} speed={0.15} />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block text-4xl mb-4">🎓</motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">Courses</h1>
          <p className="text-text-muted text-lg">Curated free & paid courses to level up your skills</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8 items-center p-4 rounded-2xl glass-card"
        >
          <label className="flex items-center gap-2 text-text-muted text-sm cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
            <input type="checkbox" checked={filterFree} onChange={(e) => setFilterFree(e.target.checked)} className="accent-neon-cyan w-4 h-4" />
            Free only
          </label>
          <label className="flex items-center gap-2 text-text-muted text-sm cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
            <input type="checkbox" checked={filterCert} onChange={(e) => setFilterCert(e.target.checked)} className="accent-neon-cyan w-4 h-4" />
            With certificate
          </label>
          <div className="w-px h-6 bg-electric-violet/20 mx-1 hidden sm:block" />
          <select value={filterLang} onChange={(e) => setFilterLang(e.target.value)}
            className="bg-background border border-electric-violet/20 rounded-lg px-3 py-1.5 text-text-primary text-sm focus:border-neon-cyan transition-colors"
          >
            <option value="All">All Languages</option>
            {allLanguages.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
            className="bg-background border border-electric-violet/20 rounded-lg px-3 py-1.5 text-text-primary text-sm focus:border-neon-cyan transition-colors"
          >
            <option value="All">All Categories</option>
            {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="bg-background border border-electric-violet/20 rounded-lg px-3 py-1.5 text-text-primary text-sm focus:border-neon-cyan transition-colors"
          >
            <option value="rating">Rating (High to Low)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
          </select>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={`${filterFree}-${filterCert}-${filterLang}-${filterCat}-${sortBy}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((course, i) => (
              <motion.div key={i} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                <motion.a href={course.link} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="block glass-card rounded-xl p-6 group h-full relative overflow-hidden"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-text-primary font-semibold group-hover:text-neon-cyan transition-colors">{course.title}</h3>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className={`font-bold text-sm shrink-0 ml-2 px-2 py-0.5 rounded ${course.isFree ? 'bg-green-500/20 text-green-400' : 'text-neon-cyan'}`}
                      >
                        {course.isFree ? 'Free' : `₹${course.price}`}
                      </motion.span>
                    </div>
                    <p className="text-text-muted text-xs mb-3">{course.platform} &middot; {course.language} &middot; {course.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 text-sm">{'★'.repeat(Math.round(course.rating))} {course.rating}</span>
                      <div className="flex gap-1">
                        {course.hasCertificate && (
                          <motion.span whileHover={{ scale: 1.05 }}
                            className="text-xs bg-electric-violet/20 text-electric-violet px-2 py-0.5 rounded"
                          >
                            🎓 Certificate
                          </motion.span>
                        )}
                        {course.affiliate && (
                          <span className="text-xs bg-neon-cyan/20 text-neon-cyan px-2 py-0.5 rounded">🔗 Affiliate</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-5xl mb-4 opacity-50">🔍</div>
            <p className="text-text-muted">No courses match your filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
