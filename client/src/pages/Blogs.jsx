import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import ParticleField from '../components/common/ParticleField';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const url = query ? `/blogs/search?q=${encodeURIComponent(query)}` : '/blogs';
        const { data } = await api.get(url);
        setBlogs(data);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [query]);

  const categories = useMemo(() => ['All', ...new Set(blogs.map((b) => b.category))], [blogs]);
  const filtered = category === 'All' ? blogs : blogs.filter((b) => b.category === category);

  const excerpt = (text) => text.length > 120 ? text.slice(0, 120) + '...' : text;

  return (
    <div className="relative min-h-screen">
      <ParticleField count={30} speed={0.15} />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="inline-block text-4xl mb-4">📝</motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">Blog</h1>
          <p className="text-text-muted text-lg">Tech tips, tutorials, and insights from Calcutta Node.</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-neon-cyan text-black shadow-lg shadow-neon-cyan/30 scale-105'
                    : 'bg-surface/50 text-text-muted border border-electric-violet/20 hover:border-neon-cyan/40'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="relative w-full sm:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search blogs..." value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-background border border-electric-violet/20 rounded-lg pl-10 pr-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan transition-colors"
            />
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full"
            />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-6xl mb-4 opacity-50">📄</div>
            <p className="text-text-muted">No blogs found.</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((blog, i) => (
                <motion.div key={blog._id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                  <Link to={`/blogs/${blog.slug}`}
                    className="block glass-card rounded-xl p-6 group h-full relative overflow-hidden"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-electric-violet/20 text-electric-violet px-2 py-1 rounded">{blog.category}</span>
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          {blog.views}
                        </span>
                      </div>
                      <h2 className="text-text-primary font-semibold mb-2 group-hover:text-neon-cyan transition-colors">{blog.title}</h2>
                      <p className="text-text-muted text-sm leading-relaxed">{excerpt(blog.content)}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {blog.tags?.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs text-text-muted bg-white/5 px-1.5 py-0.5 rounded">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
