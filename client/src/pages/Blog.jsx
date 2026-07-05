import { useState } from 'react'
import { motion } from 'framer-motion'
import { blogs } from '../data/blogs'

/* ============================================================
   BLOG PAGE
   Blog feed with search. Blog data from blogs.js (owner-editable).
   ============================================================ */

export default function Blog() {
  const [search, setSearch] = useState('')

  const filtered = blogs.filter(
    (post) =>
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Our <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-brand-muted max-w-xl mx-auto text-lg">
          Insights, tutorials, and updates from the team.
        </p>
      </motion.div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="max-w-md mx-auto mb-10"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts by title or tag..."
          className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-brand-text focus:border-brand-cyan focus:outline-none transition-colors"
        />
      </motion.div>

      {/* Blog grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post, i) => (
          <motion.article
            key={post.id || post.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="glass rounded-2xl overflow-hidden group hover:border-brand-pink/30 transition-all duration-300"
          >
            {/* Thumbnail */}
            <div className="h-48 bg-brand-surface-light flex items-center justify-center text-5xl">
              {post.thumbnail || '📝'}
            </div>
            <div className="p-6">
              {/* Tags */}
              {post.tags && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full bg-brand-pink/10 text-brand-pink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h2 className="font-semibold mb-2 group-hover:text-brand-pink transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-brand-muted line-clamp-3 mb-3">
                {post.excerpt || post.content?.slice(0, 150) + '...'}
              </p>
              <div className="flex items-center justify-between text-xs text-brand-muted">
                <span>{post.author || 'Calcutta Node'}</span>
                <span>{post.date || 'Recently'}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-brand-muted py-12">
          {search ? 'No posts match your search.' : 'No blog posts yet. Check back soon!'}
        </p>
      )}
    </div>
  )
}
