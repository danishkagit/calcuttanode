import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import api from '../utils/api';
import ParticleField from '../components/common/ParticleField';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/blogs/${slug}`);
        setBlog(data);
      } catch {
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen relative flex items-center justify-center">
      <ParticleField count={20} speed={0.1} />
      <div className="relative z-10 text-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-10 h-10 border-2 border-neon-cyan border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-text-muted text-sm">Loading article...</p>
      </div>
    </div>
  );

  if (!blog) return (
    <div className="relative min-h-screen">
      <ParticleField count={20} speed={0.1} />
      <motion.div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-6xl mb-4 opacity-50">📄</div>
        <h1 className="text-2xl font-bold text-text-primary mb-4">Blog not found</h1>
        <Link to="/blogs" className="text-neon-cyan hover:underline">&larr; Back to blogs</Link>
      </motion.div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <ParticleField count={20} speed={0.1} />

      <motion.article className="relative z-10 max-w-4xl mx-auto px-4 py-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <motion.div whileHover={{ x: -2 }}>
          <Link to="/blogs" className="text-neon-cyan hover:text-neon-cyan/80 text-sm mb-6 inline-flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Back to blogs
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-xs bg-electric-violet/20 text-electric-violet px-2 py-1 rounded"
            >
              {blog.category}
            </motion.span>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              {blog.views} views
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 bg-gradient-to-r from-text-primary to-neon-cyan bg-clip-text text-transparent">
            {blog.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags?.map((tag) => (
              <motion.span key={tag} whileHover={{ scale: 1.05 }}
                className="text-xs text-text-muted bg-white/5 px-2 py-1 rounded-full"
              >
                #{tag}
              </motion.span>
            ))}
          </div>

          <div className="text-sm md:text-base text-text-primary leading-[1.8] prose prose-invert max-w-none">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

          <div className="border-t border-electric-violet/20 mt-8 pt-4 flex items-center justify-between text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">
                {blog.author?.charAt(0) || 'C'}
              </div>
              <span>By <span className="text-neon-cyan">{blog.author}</span></span>
            </div>
            <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
}
