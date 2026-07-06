import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState('');
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Blog</h1>
      <p className="text-text-muted mb-8">Tech tips, tutorials, and insights from Calcutta Node.</p>
      <input
        type="text"
        placeholder="Search blogs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md bg-background border border-electric-violet/20 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan mb-8"
      />
      {loading ? (
        <p className="text-text-muted">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-text-muted">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link key={blog._id} to={`/blogs/${blog.slug}`} className="bg-surface/50 rounded-xl p-6 border border-electric-violet/20 hover:border-neon-cyan/40 transition-all block group">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-electric-violet/20 text-electric-violet px-2 py-1 rounded">{blog.category}</span>
                <span className="text-xs text-text-muted">{blog.views} views</span>
              </div>
              <h2 className="text-text-primary font-semibold mb-2 group-hover:text-neon-cyan transition-colors">{blog.title}</h2>
              <p className="text-text-muted text-sm line-clamp-2">{blog.content}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {blog.tags?.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-text-muted">#{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}