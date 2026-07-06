import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/ai', label: 'AI Chat' },
  { path: '/work', label: 'Our Work' },
  { path: '/blogs', label: 'Blog' },
  { path: '/tools', label: 'Free Tools' },
  { path: '/courses', label: 'Courses' },
  { path: '/products', label: 'Products' },
  { path: '/plans', label: 'Plans' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [pathname, mobileOpen]);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-background/90 backdrop-blur-xl border-b border-electric-violet/10 shadow-lg shadow-black/20'
        : 'bg-background/60 backdrop-blur-md border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Calcutta Node." className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
          <span className="text-neon-cyan font-bold text-lg hidden sm:block transition-all duration-300 group-hover:neon-glow-cyan">Calcutta Node.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            const isAIChat = link.path === '/ai';
            return (
              <Link key={link.path} to={link.path}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-neon-cyan'
                    : isAIChat
                      ? 'text-neon-cyan/80 hover:text-neon-cyan bg-neon-cyan/5 hover:bg-neon-cyan/10'
                      : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {isAIChat && <span className="mr-1">🧠</span>}
                {link.label}
                {isActive && (
                  <motion.span layoutId="nav-indicator" className="absolute bottom-0 left-3 right-3 h-0.5 bg-neon-cyan rounded-full" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                )}
              </Link>
            );
          })}
          <Link to="/login"
            className="ml-3 bg-brand-gradient text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 hover:scale-105 active:scale-95"
          >
            Login
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center text-text-primary hover:text-neon-cyan transition-colors"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col items-center justify-center gap-1.5">
            <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-[2px] bg-current rounded-full transition-colors" />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-[2px] bg-current rounded-full transition-colors" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-[2px] bg-current rounded-full transition-colors" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-electric-violet/10"
          >
            <div className="bg-background/95 backdrop-blur-xl px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                const isAIChat = link.path === '/ai';
                return (
                  <Link key={link.path} to={link.path}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-neon-cyan/10 text-neon-cyan'
                        : isAIChat
                          ? 'text-neon-cyan/80 bg-neon-cyan/5'
                          : 'text-text-muted hover:bg-white/5 hover:text-text-primary'
                    }`}
                  >
                    {isAIChat && '🧠 '}{link.label}
                  </Link>
                );
              })}
              <Link to="/login"
                className="block mt-3 bg-brand-gradient text-white px-4 py-3 rounded-lg text-sm font-medium text-center hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
