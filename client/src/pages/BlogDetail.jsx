import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-12 text-text-muted">Loading...</div>;
  if (!blog) return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-4">Blog not found</h1>
      <Link to="/blogs" className="text-neon-cyan hover:underline">Back to blogs</Link>
    </div>
  );

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/blogs" className="text-neon-cyan hover:underline text-sm mb-6 inline-block">&larr; Back to blogs</Link>
      <div className="bg-surface/50 rounded-xl p-8 border border-electric-violet/20">
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
      </div>
    </article>
  );
}