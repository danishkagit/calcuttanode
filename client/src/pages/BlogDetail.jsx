import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';

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
    <div className="max-w-4xl mx-auto px-4 py-20 flex justify-center">
      <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!blog) return (
    <motion.div className="max-w-4xl mx-auto px-4 py-20 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <svg className="w-16 h-16 text-text-muted/30 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M7 10h10M7 13h10"/></svg>
      <h1 className="text-2xl font-bold text-text-primary mb-4">Blog not found</h1>
      <Link to="/blogs" className="text-neon-cyan hover:underline">&larr; Back to blogs</Link>
    </motion.div>
  );

  return (
    <motion.article className="max-w-4xl mx-auto px-4 py-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Link to="/blogs" className="text-neon-cyan hover:underline text-sm mb-6 inline-block">&larr; Back to blogs</Link>
      <motion.div className="bg-surface/50 rounded-xl p-8 border border-electric-violet/20"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs bg-electric-violet/20 text-electric-violet px-2 py-1 rounded">{blog.category}</span>
          <span className="text-xs text-text-muted">{blog.views} views</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{blog.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags?.map((tag) => (
            <span key={tag} className="text-xs text-text-muted">#{tag}</span>
          ))}
        </div>
        <div className="text-text-muted leading-relaxed whitespace-pre-line">{blog.content}</div>
        <div className="border-t border-electric-violet/20 mt-8 pt-4 text-sm text-text-muted">
          By {blog.author} &middot; {new Date(blog.createdAt).toLocaleDateString()}
        </div>
      </motion.div>
    </motion.article>
  );
}