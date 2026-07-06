import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import courses from '../data/courses';

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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">Courses</h1>
        <p className="text-text-muted text-lg">Curated free & paid courses to level up your skills</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-8 items-center"
      >
        <label className="flex items-center gap-2 text-text-muted text-sm cursor-pointer">
          <input type="checkbox" checked={filterFree} onChange={(e) => setFilterFree(e.target.checked)} className="accent-neon-cyan" />
          Free only
        </label>
        <label className="flex items-center gap-2 text-text-muted text-sm cursor-pointer">
          <input type="checkbox" checked={filterCert} onChange={(e) => setFilterCert(e.target.checked)} className="accent-neon-cyan" />
          With certificate
        </label>
        <select value={filterLang} onChange={(e) => setFilterLang(e.target.value)} className="bg-background border border-electric-violet/20 rounded-lg px-3 py-1.5 text-text-primary text-sm">
          <option value="All">All Languages</option>
          {allLanguages.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="bg-background border border-electric-violet/20 rounded-lg px-3 py-1.5 text-text-primary text-sm">
          <option value="All">All Categories</option>
          {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-background border border-electric-violet/20 rounded-lg px-3 py-1.5 text-text-primary text-sm">
          <option value="rating">Rating (High to Low)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
        </select>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((course, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
            <a href={course.link} target="_blank" rel="noopener noreferrer" className="bg-surface/50 rounded-xl p-6 border border-electric-violet/20 hover:border-neon-cyan/40 transition-all block group h-full">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-text-primary font-semibold group-hover:text-neon-cyan transition-colors">{course.title}</h3>
                <span className="text-neon-cyan font-bold text-sm shrink-0 ml-2">{course.isFree ? 'Free' : `₹${course.price}`}</span>
              </div>
              <p className="text-text-muted text-xs mb-3">{course.platform} &middot; {course.language} &middot; {course.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 text-sm">{'★'.repeat(Math.round(course.rating))} {course.rating}</span>
                <div className="flex gap-1">
                  {course.hasCertificate && <span className="text-xs bg-electric-violet/20 text-electric-violet px-2 py-0.5 rounded">Certificate</span>}
                  {course.affiliate && <span className="text-xs bg-neon-cyan/20 text-neon-cyan px-2 py-0.5 rounded">Affiliate</span>}
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-text-muted text-center py-20">No courses match your filters.</motion.p>
      )}
    </div>
  );
}