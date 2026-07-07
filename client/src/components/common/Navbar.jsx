import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const services = [
  { label: 'Website Development', path: '/pricing', icon: '🌐', desc: 'Responsive 5-page sites' },
  { label: 'Full Stack Web', path: '/pricing', icon: '🔷', desc: 'Frontend + backend + database' },
  { label: 'Mobile App Development', path: '/pricing', icon: '📱', desc: 'Android & iOS apps' },
  { label: 'E-Commerce Setup', path: '/pricing', icon: '🛒', desc: 'Stores with payment gateways' },
  { label: 'SEO & Digital Marketing', path: '/pricing', icon: '📈', desc: 'Rank higher, grow faster' },
  { label: 'UI/UX & Graphic Design', path: '/pricing', icon: '🎨', desc: 'Brand identity & interfaces' },
  { label: 'Video Editing', path: '/pricing', icon: '🎬', desc: 'Promos, reels, tutorials' },
  { label: 'Remote IT Support', path: '/pricing', icon: '🖥️', desc: 'PC, network, system help' },
  { label: 'Data Recovery', path: '/pricing', icon: '💾', desc: 'HDD, SSD, NVMe recovery' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-electric-violet/10 shadow-lg shadow-black/20'
          : 'bg-background/60 backdrop-blur-md border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img src={logo} alt="Calcutta Node." className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
            <span className="text-neon-cyan font-bold text-lg hidden sm:block transition-all duration-300 group-hover:neon-glow-cyan">Calcutta Node.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>
            {/* Services - Mega Menu */}
            <div className="relative">
              <button onClick={() => toggleDropdown('services')}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  openDropdown === 'services' ? 'text-neon-cyan bg-neon-cyan/10' : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                Services
                <motion.svg animate={{ rotate: openDropdown === 'services' ? 180 : 0 }} className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></motion.svg>
              </button>
              <AnimatePresence>
                {openDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-[640px] rounded-2xl border border-electric-violet/20 bg-surface/95 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    <div className="grid grid-cols-3 gap-1 p-3">
                      {services.map((s) => (
                        <Link key={s.label} to={s.path} onClick={() => setOpenDropdown(null)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                        >
                          <span className="text-lg shrink-0 mt-0.5">{s.icon}</span>
                          <div>
                            <div className="text-sm font-medium text-text-primary group-hover:text-neon-cyan transition-colors">{s.label}</div>
                            <div className="text-xs text-text-muted/60 mt-0.5">{s.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-electric-violet/10 px-4 py-2.5 bg-black/20">
                      <Link to="/pricing" onClick={() => setOpenDropdown(null)}
                        className="text-xs text-neon-cyan hover:underline flex items-center gap-1"
                      >
                        View full pricing → <span className="text-text-muted/50 ml-1">(all services with transparent rates)</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources dropdown */}
            <div className="relative">
              <button onClick={() => toggleDropdown('resources')}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  openDropdown === 'resources' ? 'text-neon-cyan bg-neon-cyan/10' : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                Resources
                <motion.svg animate={{ rotate: openDropdown === 'resources' ? 180 : 0 }} className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></motion.svg>
              </button>
              <AnimatePresence>
                {openDropdown === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-52 rounded-xl border border-electric-violet/20 bg-surface/95 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden p-2"
                  >
                    {[
                      { label: 'Blog', path: '/blogs', icon: '📝' },
                      { label: 'Courses', path: '/courses', icon: '🎓' },
                      { label: 'Free Tools', path: '/tools', icon: '🛠️' },
                      { label: 'Products', path: '/products', icon: '📦' },
                      { label: 'Plans', path: '/plans', icon: '📋' },
                    ].map((item) => (
                      <Link key={item.label} to={item.path} onClick={() => setOpenDropdown(null)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-white/5 transition-all group"
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="group-hover:text-neon-cyan transition-colors">{item.label}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company dropdown */}
            <div className="relative">
              <button onClick={() => toggleDropdown('company')}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  openDropdown === 'company' ? 'text-neon-cyan bg-neon-cyan/10' : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                Company
                <motion.svg animate={{ rotate: openDropdown === 'company' ? 180 : 0 }} className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></motion.svg>
              </button>
              <AnimatePresence>
                {openDropdown === 'company' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-44 rounded-xl border border-electric-violet/20 bg-surface/95 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden p-2"
                  >
                    {[
                      { label: 'About', path: '/about', icon: '👤' },
                      { label: 'Our Work', path: '/work', icon: '🏆' },
                      { label: 'Contact', path: '/contact', icon: '📬' },
                    ].map((item) => (
                      <Link key={item.label} to={item.path} onClick={() => setOpenDropdown(null)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-white/5 transition-all group"
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="group-hover:text-neon-cyan transition-colors">{item.label}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/ai"
              className="ml-2 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-neon-cyan/15 to-electric-violet/15 border border-neon-cyan/30 text-neon-cyan hover:from-neon-cyan/25 hover:to-electric-violet/25 hover:border-neon-cyan/50 transition-all duration-200"
            >
              <span>🧠</span>
              <span>AI Chat</span>
            </Link>
            <Link to="/login"
              className="ml-1 bg-brand-gradient text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 hover:scale-105 active:scale-95"
            >
              Login
            </Link>
          </div>

          {/* Mobile hamburger */}
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

        {/* Mobile slide-in menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-electric-violet/10"
            >
              <div className="bg-background/95 backdrop-blur-xl px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
                {/* Services section */}
                <div className="text-xs font-bold text-electric-violet uppercase tracking-wider px-4 pt-2 pb-1">Services</div>
                {services.map((s) => (
                  <Link key={s.label} to={s.path} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-white/5 transition-all"
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </Link>
                ))}
                <div className="border-t border-electric-violet/10 my-2" />
                {/* Resources */}
                <div className="text-xs font-bold text-electric-violet uppercase tracking-wider px-4 pt-2 pb-1">Resources</div>
                {[
                  { label: 'Blog', path: '/blogs', icon: '📝' },
                  { label: 'Courses', path: '/courses', icon: '🎓' },
                  { label: 'Free Tools', path: '/tools', icon: '🛠️' },
                  { label: 'Products', path: '/products', icon: '📦' },
                  { label: 'Plans', path: '/plans', icon: '📋' },
                ].map((item) => (
                  <Link key={item.label} to={item.path} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-white/5 transition-all"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="border-t border-electric-violet/10 my-2" />
                {/* Company */}
                <div className="text-xs font-bold text-electric-violet uppercase tracking-wider px-4 pt-2 pb-1">Company</div>
                {[
                  { label: 'About', path: '/about', icon: '👤' },
                  { label: 'Our Work', path: '/work', icon: '🏆' },
                  { label: 'Contact', path: '/contact', icon: '📬' },
                ].map((item) => (
                  <Link key={item.label} to={item.path} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-white/5 transition-all"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="border-t border-electric-violet/10 my-2" />
                {/* Mobile CTAs */}
                <Link to="/ai" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 mx-2 mt-3 bg-gradient-to-r from-neon-cyan/15 to-electric-violet/15 border border-neon-cyan/30 text-neon-cyan px-4 py-3 rounded-xl text-sm font-medium"
                >
                  🧠 AI Chat
                </Link>
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  className="block mx-2 mt-2 bg-brand-gradient text-white px-4 py-3 rounded-xl text-sm font-medium text-center"
                >
                  Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile bottom tab bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-t border-electric-violet/10 safe-area-bottom">
        <div className="flex items-center justify-around py-1.5">
          {[
            { label: 'Home', path: '/', icon: '🏠' },
            { label: 'Services', path: '/pricing', icon: '📋' },
            { label: 'AI Chat', path: '/ai', icon: '🧠', highlight: true },
            { label: 'Learn', path: '/courses', icon: '📚' },
            { label: 'Menu', path: null, icon: '☰', toggle: true },
          ].map((tab) => {
            const isActive = tab.path && pathname === tab.path;
            if (tab.toggle) {
              return (
                <button key={tab.label} onClick={() => setMobileOpen((prev) => !prev)}
                  className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg text-[10px] transition-all ${mobileOpen ? 'text-neon-cyan' : 'text-text-muted'}`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            }
            return (
              <Link key={tab.label} to={tab.path} onClick={() => setMobileOpen(false)}
                className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg text-[10px] transition-all ${
                  tab.highlight
                    ? 'bg-gradient-to-r from-neon-cyan/15 to-electric-violet/15 border border-neon-cyan/30 text-neon-cyan px-5 py-1.5'
                    : isActive
                      ? 'text-neon-cyan'
                      : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Spacer for mobile bottom tab */}
      <div className="md:hidden h-16" />
    </>
  );
}
