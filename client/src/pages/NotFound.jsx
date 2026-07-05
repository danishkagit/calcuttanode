import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/* ============================================================
   404 NOT FOUND PAGE
   ============================================================ */

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-brand-muted mb-8">This page does not exist.</p>
        <Link
          to="/"
          className="px-6 py-3 bg-brand-cyan text-brand-bg font-semibold rounded-xl hover:glow-cyan transition-all duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
