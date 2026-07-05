import { useState } from 'react'
import { motion } from 'framer-motion'
import { seoTools } from '../data/seoTools'

/* ============================================================
   TOOLS PAGE
   Displays SEO / digital marketing tools from seoTools.js data
   Supports category filtering
   ============================================================ */

// Extract unique categories from tool data
const allCategories = ['All', ...new Set(seoTools.map((t) => t.category))]

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? seoTools
      : seoTools.filter((t) => t.category === activeCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Free <span className="gradient-text">SEO Tools</span>
        </h1>
        <p className="text-brand-muted max-w-xl mx-auto text-lg">
          Professional-grade tools to optimize your website and marketing.
        </p>
      </motion.div>

      {/* Category filter pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-wrap gap-2 justify-center mb-10"
      >
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-brand-cyan text-brand-bg'
                : 'glass text-brand-muted hover:text-brand-text'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((tool, i) => (
          <motion.a
            key={tool.id || tool.name}
            href={tool.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="glass rounded-2xl p-6 hover:border-brand-cyan/30 transition-all duration-300 group block"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
              {tool.icon || '🔧'}
            </div>
            <h3 className="font-semibold mb-1 group-hover:text-brand-cyan transition-colors">
              {tool.name}
            </h3>
            <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-brand-violet/20 text-brand-violet mb-2">
              {tool.category}
            </span>
            <p className="text-sm text-brand-muted leading-relaxed">
              {tool.description?.slice(0, 100)}
              {tool.description?.length > 100 ? '...' : ''}
            </p>
          </motion.a>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-center text-brand-muted py-12">
          No tools found in this category.
        </p>
      )}
    </div>
  )
}
