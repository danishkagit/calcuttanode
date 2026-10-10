import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ compact = false }) {
  const { isDark, toggle } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.06 }}
      aria-label={isDark ? 'Switch to Light mode' : 'Switch to Night mode'}
      title={isDark ? 'Switch to Light mode' : 'Switch to Night mode'}
      className={`relative flex items-center rounded-full border border-border bg-surface-muted/60 overflow-hidden transition-colors duration-300 hover:border-neon-cyan/50 ${
        compact ? 'w-14 h-7' : 'w-16 h-8'
      }`}
    >
      {/* thumb */}
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 550, damping: 32 }}
        className={`absolute top-0.5 bottom-0.5 aspect-square rounded-full bg-brand-gradient shadow-md flex items-center justify-center text-[11px] ${
          isDark ? 'right-0.5' : 'left-0.5'
        }`}
        style={{ width: compact ? 22 : 26 }}
      >
        {isDark ? '🌙' : '☀️'}
      </motion.span>
      {/* track icons */}
      <span className={`flex-1 text-center text-[11px] transition-opacity ${isDark ? 'opacity-100 pr-6' : 'opacity-40 pr-6'}`}>🌙</span>
      <span className={`flex-1 text-center text-[11px] transition-opacity ${!isDark ? 'opacity-100 pl-6' : 'opacity-40 pl-6'}`}>☀️</span>
    </motion.button>
  );
}
