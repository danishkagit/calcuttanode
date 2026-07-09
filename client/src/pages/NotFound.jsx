import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParticleField from '../components/common/ParticleField';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <ParticleField count={15} speed={0.1} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center max-w-md mx-auto px-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-7xl mb-6"
        >
          🚀
        </motion.div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-4">404</h1>
        <p className="text-text-muted text-lg mb-8">
          This page drifted into deep space. Let's get you back to orbit.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-gradient text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
