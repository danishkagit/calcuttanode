import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ compact = false }) {
  const { isDark, toggle } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to Light mode' : 'Switch to Night mode'}
      title={isDark ? 'Switch to Light mode' : 'Switch to Night mode'}
      className={`relative flex items-center rounded-full overflow-hidden transition-shadow duration-300 ${
        compact ? 'w-14 h-7' : 'w-16 h-8'
      }`}
      style={{
        background: 'var(--color-surface-sunken)',
        boxShadow:
          'inset 3px 3px 7px var(--shadow-clay-in-dark), inset -3px -3px 7px var(--shadow-clay-in-light)',
      }}
    >
      {/* clay thumb */}
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 550, damping: 32 }}
        className={`absolute top-0.5 bottom-0.5 aspect-square rounded-full flex items-center justify-center text-[11px] ${
          isDark ? 'right-0.5' : 'left-0.5'
        }`}
        style={{
          width: compact ? 22 : 26,
          background: 'linear-gradient(145deg, var(--color-surface-hover), var(--color-surface-muted))',
          boxShadow:
            '3px 3px 7px var(--shadow-neu-dark), -3px -3px 7px var(--shadow-neu-light), inset 1px 1px 2px var(--shadow-clay-in-light)',
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </motion.span>
      {/* track icons */}
      <span className={`flex-1 text-center text-[11px] transition-opacity ${isDark ? 'opacity-100 pr-6' : 'opacity-40 pr-6'}`}>🌙</span>
      <span className={`flex-1 text-center text-[11px] transition-opacity ${!isDark ? 'opacity-100 pl-6' : 'opacity-40 pl-6'}`}>☀️</span>
    </motion.button>
  );
}
