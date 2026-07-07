import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const menuSections = [
  {
    title: 'Services',
    items: [
      { label: 'Website Development', path: '/pricing', icon: '🌐' },
      { label: 'Full Stack Web', path: '/pricing', icon: '🔷' },
      { label: 'Mobile App Development', path: '/pricing', icon: '📱' },
      { label: 'E-Commerce Setup', path: '/pricing', icon: '🛒' },
      { label: 'SEO & Digital Marketing', path: '/pricing', icon: '📈' },
      { label: 'UI/UX & Graphic Design', path: '/pricing', icon: '🎨' },
      { label: 'Video Editing', path: '/pricing', icon: '🎬' },
      { label: 'Remote IT Support', path: '/pricing', icon: '🖥️' },
      { label: 'Data Recovery', path: '/pricing', icon: '💾' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Blog', path: '/blogs', icon: '📝' },
      { label: 'Courses', path: '/courses', icon: '🎓' },
      { label: 'Free Tools', path: '/tools', icon: '🛠️' },
      { label: 'Products', path: '/products', icon: '📦' },
      { label: 'Plans & Pricing', path: '/plans', icon: '📋' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', path: '/about', icon: '👤' },
      { label: 'Our Work', path: '/work', icon: '🏆' },
      { label: 'Contact', path: '/contact', icon: '📬' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Login', path: '/login', icon: '🔑' },
      { label: 'Register', path: '/register', icon: '📝' },
      { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    ],
  },
];

const allPages = menuSections.flatMap((s) => s.items);

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 150);
  const searchRef = useRef(null);

  const searchResults = debouncedQuery.trim()
    ? allPages.filter((p) =>
        p.label.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchQuery('');
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 200);
    }
  }, [menuOpen]);

  return (
    <>
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

          <div className="flex items-center gap-2">
            <Link to="/ai"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-neon-cyan/15 to-electric-violet/15 border border-neon-cyan/30 text-neon-cyan hover:from-neon-cyan/25 hover:to-electric-violet/25 hover:border-neon-cyan/50 transition-all duration-200"
            >
              <span>🧠</span>
              <span>AI Chat</span>
            </Link>
            <Link to="/login"
              className="hidden sm:inline-block bg-brand-gradient text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 hover:scale-105 active:scale-95"
            >
              Login
            </Link>
            <button onClick={() => setMenuOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center text-text-primary hover:text-neon-cyan transition-colors rounded-lg hover:bg-white/5"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-0 z-[70] overflow-y-auto"
            >
              <div className="min-h-screen bg-background/95 backdrop-blur-2xl">
                {/* Top bar inside overlay */}
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                  <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                    <span className="logo-dot w-3 h-3 rounded-full bg-neon-cyan shadow-lg shadow-neon-cyan/50" />
                    <span className="text-neon-cyan font-bold text-lg">Calcutta Node.</span>
                  </Link>
                  <div className="flex items-center gap-3">
                    <Link to="/ai" onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-neon-cyan/15 to-electric-violet/15 border border-neon-cyan/30 text-neon-cyan hover:from-neon-cyan/25 hover:to-electric-violet/25 transition-all duration-200"
                    >
                      <span>🧠</span>
                      <span className="hidden sm:inline">AI Chat</span>
                    </Link>
                    <button onClick={() => setMenuOpen(false)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 text-text-primary hover:text-neon-cyan transition-all"
                      aria-label="Close menu"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Search bar */}
                <div className="max-w-2xl mx-auto px-4 mb-8">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search services, pages, tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-surface/60 border border-electric-violet/20 rounded-2xl pl-12 pr-4 py-4 text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/10 text-lg transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Search results */}
                  <AnimatePresence>
                    {searchQuery.trim() && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="mt-2 rounded-xl bg-surface/80 backdrop-blur-md border border-electric-violet/20 overflow-hidden"
                      >
                        {searchResults.length > 0 ? (
                          <div className="py-2">
                            {searchResults.slice(0, 8).map((result, i) => (
                              <Link key={i} to={result.path}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-text-muted hover:text-text-primary hover:bg-white/5 transition-all"
                              >
                                <span>{result.icon}</span>
                                <span>{result.label}</span>
                              </Link>
                            ))}
                            {searchResults.length > 8 && (
                              <div className="px-4 py-2 text-xs text-text-muted/50">
                                +{searchResults.length - 8} more results
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="px-4 py-6 text-center text-sm text-text-muted/50">
                            No results found for "{searchQuery}"
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Categorized links grid */}
                <div className="max-w-6xl mx-auto px-4 pb-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {menuSections.map((section, si) => (
                      <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + si * 0.04 }}
                      >
                        <h3 className="text-xs font-bold text-electric-violet uppercase tracking-widest mb-4">
                          {section.title}
                        </h3>
                        <div className="flex flex-col gap-1">
                          {section.items.map((item) => (
                            <Link key={item.label} to={item.path}
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-muted hover:text-text-primary hover:bg-white/5 transition-all group"
                            >
                              <span className="text-lg shrink-0">{item.icon}</span>
                              <span className="group-hover:text-neon-cyan transition-colors">{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile-only quick actions */}
                  <div className="mt-10 sm:hidden flex flex-col gap-3">
                    <Link to="/ai" onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-neon-cyan/15 to-electric-violet/15 border border-neon-cyan/30 text-neon-cyan px-5 py-3 rounded-xl text-sm font-medium"
                    >
                      <span>🧠</span> AI Chat
                    </Link>
                    <Link to="/login" onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 bg-brand-gradient text-white px-5 py-3 rounded-xl text-sm font-medium"
                    >
                      <span>🔑</span> Login
                    </Link>
                  </div>

                  {/* Footer note */}
                  <div className="mt-12 text-center">
                    <p className="text-xs text-text-muted/30">
                      Calcutta Node. — IT Services & Digital Growth Agency
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
