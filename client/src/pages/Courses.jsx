import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { courses } from '../data/courses'

/* ============================================================
   COURSES PAGE
   Displays curated courses from courses.js data
   Supports sorting (rating, free first) and filter by platform
   ============================================================ */

const sortOptions = [
  { label: 'Highest Rated', value: 'rating-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
]

export default function Courses() {
  const [sort, setSort] = useState('rating-desc')
  const [showFreeOnly, setShowFreeOnly] = useState(false)
  const [showCertified, setShowCertified] = useState(false)

  const filtered = useMemo(() => {
    let list = [...courses]

    // Filters
    if (showFreeOnly) list = list.filter((c) => c.price === 0 || c.price === 'Free')
    if (showCertified) list = list.filter((c) => c.certificate)

    // Sort
    switch (sort) {
      case 'rating-desc':
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'price-asc':
        list.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case 'price-desc':
        list.sort((a, b) => (b.price || 0) - (a.price || 0))
        break
    }
    return list
  }, [sort, showFreeOnly, showCertified])

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
          Curated <span className="gradient-text">Courses</span>
        </h1>
        <p className="text-brand-muted max-w-xl mx-auto text-lg">
          Hand-picked courses to level up your skills — free and paid.
        </p>
      </motion.div>

      {/* Filters bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-wrap items-center gap-4 justify-center mb-10"
      >
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 bg-brand-bg border border-white/10 rounded-xl text-brand-text text-sm focus:border-brand-cyan focus:outline-none"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm text-brand-muted cursor-pointer">
          <input
            type="checkbox"
            checked={showFreeOnly}
            onChange={(e) => setShowFreeOnly(e.target.checked)}
            className="accent-brand-cyan"
          />
          Free only
        </label>

        <label className="flex items-center gap-2 text-sm text-brand-muted cursor-pointer">
          <input
            type="checkbox"
            checked={showCertified}
            onChange={(e) => setShowCertified(e.target.checked)}
            className="accent-brand-violet"
          />
          With Certificate
        </label>
      </motion.div>

      {/* Courses grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((course, i) => (
          <motion.a
            key={course.id || course.name}
            href={course.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="glass rounded-2xl p-6 hover:border-brand-violet/30 transition-all duration-300 group block"
          >
            {/* Thumbnail placeholder */}
            <div className="h-32 rounded-xl bg-brand-surface-light mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
              {course.icon || '📚'}
            </div>
            <h3 className="font-semibold mb-1 group-hover:text-brand-violet transition-colors line-clamp-2">
              {course.name}
            </h3>
            <p className="text-xs text-brand-muted mb-2">
              {course.platform || 'Online'} {course.language ? `• ${course.language}` : ''}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-brand-cyan font-semibold text-sm">
                {course.price === 0 || course.price === 'Free' ? 'Free' : `₹${course.price}`}
              </span>
              {course.rating && (
                <span className="text-yellow-400 text-sm">★ {course.rating}</span>
              )}
            </div>
            {course.certificate && (
              <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                Certificate
              </span>
            )}
          </motion.a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-brand-muted py-12">No courses match your filters.</p>
      )}
    </div>
  )
}
