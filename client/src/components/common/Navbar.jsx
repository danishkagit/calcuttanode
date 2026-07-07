import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const serviceGroups = [
  {
    title: 'Development',
    items: [
      { label: 'Website Development', path: '/pricing', icon: '🌐', desc: 'Responsive 5-page sites', price: '₹4,999' },
      { label: 'Full Stack Web', path: '/pricing', icon: '🔷', desc: 'Frontend + backend + database', price: '₹14,999' },
      { label: 'Mobile App Development', path: '/pricing', icon: '📱', desc: 'Android & iOS apps', price: '₹9,999' },
      { label: 'E-Commerce Setup', path: '/pricing', icon: '🛒', desc: 'Stores with payment gateways', price: '₹7,999' },
    ],
  },
  {
    title: 'Marketing & Design',
    items: [
      { label: 'SEO & Digital Marketing', path: '/pricing', icon: '📈', desc: 'Rank higher, grow faster', price: '₹1,999' },
      { label: 'UI/UX & Graphic Design', path: '/pricing', icon: '🎨', desc: 'Brand identity & interfaces', price: '₹999' },
      { label: 'Video Editing', path: '/pricing', icon: '🎬', desc: 'Promos, reels, tutorials', price: '₹1,499' },
    ],
  },
  {
    title: 'Support & More',
    items: [
      { label: 'Remote IT Support', path: '/pricing', icon: '🖥️', desc: 'PC, network, system help', price: '₹499' },
      { label: 'Data Recovery', path: '/pricing', icon: '💾', desc: 'HDD, SSD, NVMe recovery', price: '₹1,499' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.2, ease: 'easeOut', staggerChildren: 0.03 },
  },
  exit: { opacity: 0, y: 6, scale: 0.97, transition: { duration: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.15 } },
};

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const closeTimer = useRef(null);

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
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openWithDelay = (name) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  };

  const closeWithDelay = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 100);
  };

  const toggleDropdown = (name) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      <nav ref={navRef} className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-electric-violet/10 shadow-lg shadow-black/20'
          : 'bg-background/60 backdrop-blur-md border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img src={logo} alt="Calcutta Node." className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
            <span className="text-neon-cyan font-bold text-lg hidden sm:block transition-all duration-300 group-hover:neon-glow-cyan">Calcutta Node.</span>
          </Link>

          {/* ===== DESKTOP NAV ===== */}
          <div className="hidden md:flex items-center gap-1">
            {/* Services - Mega Menu */}
            <div className="relative"
              onMouseEnter={() => openWithDelay('services')}
              onMouseLeave={() => closeWithDelay()}
            >
              <button onClick={() => toggleDropdown('services')}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  openDropdown === 'services'
                    ? 'text-neon-cyan bg-neon-cyan/15 shadow-sm shadow-neon-cyan/10'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="2" y="2" width="8" height="8" rx="1.5" />
                  <rect x="14" y="2" width="8" height="8" rx="1.5" />
                  <rect x="2" y="14" width="8" height="8" rx="1.5" />
                  <rect x="14" y="14" width="8" height="8" rx="1.5" />
                </svg>
                Services
                <motion.svg animate={{ rotate: openDropdown === 'services' ? 180 : 0 }} className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></motion.svg>
              </button>

              <AnimatePresence>
                {openDropdown === 'services' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] rounded-2xl border border-neon-cyan/25 bg-[#171A26] shadow-2xl shadow-black/60 overflow-hidden"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-cyan/[0.04] via-transparent to-electric-violet/[0.04] pointer-events-none" />
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
                    <div className="grid grid-cols-3 gap-0.5 p-2 relative">
                      {serviceGroups.map((group) =>
                        group.items.map((s) => (
                          <motion.div key={s.label} variants={itemVariants}>
                            <Link to={s.path} onClick={() => setOpenDropdown(null)}
                              className="group relative flex flex-col gap-1 p-4 rounded-xl bg-transparent hover:bg-gradient-to-br hover:from-neon-cyan/[0.07] hover:to-electric-violet/[0.04] border border-transparent hover:border-neon-cyan/20 transition-all duration-200"
                            >
                              <div className="flex items-start justify-between mb-1">
                                <span className="text-xl">{s.icon}</span>
                                <span className="text-[10px] font-bold text-neon-cyan/70 bg-neon-cyan/10 px-2 py-0.5 rounded-full group-hover:bg-neon-cyan/20 transition-colors">
                                  {s.price}
                                </span>
                              </div>
                              <div className="text-sm font-semibold text-text-primary group-hover:text-neon-cyan transition-colors">{s.label}</div>
                              <div className="text-[11px] text-text-muted/60 leading-tight">{s.desc}</div>
                            </Link>
                          </motion.div>
                        ))
                      )}
                    </div>
                    <div className="relative border-t border-neon-cyan/10 bg-gradient-to-r from-neon-cyan/[0.03] to-electric-violet/[0.03] px-5 py-3 flex items-center justify-between">
                      <span className="text-xs text-text-muted/50">All services with transparent pricing — no hidden fees</span>
                      <Link to="/pricing" onClick={() => setOpenDropdown(null)}
                        className="group flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent hover:from-neon-cyan/80 hover:to-electric-violet/80 transition-all"
                      >
                        View Full Pricing
                        <motion.svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                          initial={false}
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </motion.svg>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources dropdown */}
            <div className="relative"
              onMouseEnter={() => openWithDelay('resources')}
              onMouseLeave={() => closeWithDelay()}
            >
              <button onClick={() => toggleDropdown('resources')}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  openDropdown === 'resources'
                    ? 'text-neon-cyan bg-neon-cyan/15 shadow-sm shadow-neon-cyan/10'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
                Resources
                <motion.svg animate={{ rotate: openDropdown === 'resources' ? 180 : 0 }} className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></motion.svg>
              </button>
              <AnimatePresence>
                {openDropdown === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl border border-neon-cyan/25 bg-[#171A26] shadow-2xl shadow-black/60 overflow-hidden p-2"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-cyan/[0.04] via-transparent to-electric-violet/[0.04] pointer-events-none" />
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
                    {[
                      { label: 'Blog', path: '/blogs', icon: '📝', desc: 'Tech tips & insights' },
                      { label: 'Courses', path: '/courses', icon: '🎓', desc: 'Free & paid courses' },
                      { label: 'Free Tools', path: '/tools', icon: '🛠️', desc: '50+ SEO & AI tools' },
                      { label: 'Products', path: '/products', icon: '📦', desc: 'Templates & scripts' },
                      { label: 'Plans', path: '/plans', icon: '📋', desc: 'Membership & support' },
                    ].map((item) => (
                      <Link key={item.label} to={item.path} onClick={() => setOpenDropdown(null)}
                        className="group relative flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-neon-cyan/[0.07] hover:to-electric-violet/[0.04] transition-all duration-200"
                      >
                        <span className="text-lg shrink-0">{item.icon}</span>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-text-primary group-hover:text-neon-cyan transition-colors">{item.label}</div>
                          <div className="text-[10px] text-text-muted/50">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company dropdown */}
            <div className="relative"
              onMouseEnter={() => openWithDelay('company')}
              onMouseLeave={() => closeWithDelay()}
            >
              <button onClick={() => toggleDropdown('company')}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  openDropdown === 'company'
                    ? 'text-neon-cyan bg-neon-cyan/15 shadow-sm shadow-neon-cyan/10'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
                Company
                <motion.svg animate={{ rotate: openDropdown === 'company' ? 180 : 0 }} className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></motion.svg>
              </button>
              <AnimatePresence>
                {openDropdown === 'company' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-2xl border border-neon-cyan/25 bg-[#171A26] shadow-2xl shadow-black/60 overflow-hidden p-2"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-cyan/[0.04] via-transparent to-electric-violet/[0.04] pointer-events-none" />
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
                    {[
                      { label: 'About', path: '/about', icon: '👤', desc: 'Our story & team' },
                      { label: 'Our Work', path: '/work', icon: '🏆', desc: 'Portfolio & case studies' },
                      { label: 'Contact', path: '/contact', icon: '📬', desc: 'Get in touch' },
                    ].map((item) => (
                      <Link key={item.label} to={item.path} onClick={() => setOpenDropdown(null)}
                        className="group relative flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-neon-cyan/[0.07] hover:to-electric-violet/[0.04] transition-all duration-200"
                      >
                        <span className="text-lg shrink-0">{item.icon}</span>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-text-primary group-hover:text-neon-cyan transition-colors">{item.label}</div>
                          <div className="text-[10px] text-text-muted/50">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/ai"
              className="ml-3 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-neon-cyan/15 to-electric-violet/15 border border-neon-cyan/30 text-neon-cyan hover:from-neon-cyan/25 hover:to-electric-violet/25 hover:border-neon-cyan/50 hover:shadow-lg hover:shadow-neon-cyan/10 transition-all duration-200"
            >
              <span>🧠</span>
              <span>AI Chat</span>
            </Link>
            <Link to="/login"
              className="ml-1 bg-brand-gradient text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/25 hover:scale-105 active:scale-95"
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

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-electric-violet/10"
            >
              <div className="bg-background/95 backdrop-blur-xl px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
                <div className="text-xs font-bold text-electric-violet uppercase tracking-wider px-4 pt-2 pb-1 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="8" height="8" rx="1.5"/><rect x="14" y="2" width="8" height="8" rx="1.5"/><rect x="2" y="14" width="8" height="8" rx="1.5"/><rect x="14" y="14" width="8" height="8" rx="1.5"/></svg>
                  Services
                </div>
                {serviceGroups.flatMap((g) => g.items).map((s) => (
                  <Link key={s.label} to={s.path} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-gradient-to-r hover:from-neon-cyan/[0.07] hover:to-electric-violet/[0.04] transition-all"
                  >
                    <span>{s.icon}</span>
                    <span className="flex-1">{s.label}</span>
                    <span className="text-[10px] font-medium text-neon-cyan/60">{s.price}</span>
                  </Link>
                ))}
                <div className="border-t border-electric-violet/10 my-2" />
                <div className="text-xs font-bold text-electric-violet uppercase tracking-wider px-4 pt-2 pb-1 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                  Resources
                </div>
                {[
                  { label: 'Blog', path: '/blogs', icon: '📝' },
                  { label: 'Courses', path: '/courses', icon: '🎓' },
                  { label: 'Free Tools', path: '/tools', icon: '🛠️' },
                  { label: 'Products', path: '/products', icon: '📦' },
                  { label: 'Plans', path: '/plans', icon: '📋' },
                ].map((item) => (
                  <Link key={item.label} to={item.path} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-gradient-to-r hover:from-neon-cyan/[0.07] hover:to-electric-violet/[0.04] transition-all"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="border-t border-electric-violet/10 my-2" />
                <div className="text-xs font-bold text-electric-violet uppercase tracking-wider px-4 pt-2 pb-1 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  Company
                </div>
                {[
                  { label: 'About', path: '/about', icon: '👤' },
                  { label: 'Our Work', path: '/work', icon: '🏆' },
                  { label: 'Contact', path: '/contact', icon: '📬' },
                ].map((item) => (
                  <Link key={item.label} to={item.path} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-gradient-to-r hover:from-neon-cyan/[0.07] hover:to-electric-violet/[0.04] transition-all"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="border-t border-electric-violet/10 my-2" />
                <Link to="/ai" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 mx-2 mt-3 bg-gradient-to-r from-neon-cyan/15 to-electric-violet/15 border border-neon-cyan/30 text-neon-cyan px-4 py-3 rounded-xl text-sm font-semibold"
                >
                  🧠 AI Chat
                </Link>
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  className="block mx-2 mt-2 bg-brand-gradient text-white px-4 py-3 rounded-xl text-sm font-semibold text-center"
                >
                  Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile bottom tab bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-2xl border-t border-electric-violet/10 pb-1 pb-safe">
        <div className="flex items-center justify-around py-1 relative">
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
                  className={`relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl text-[11px] font-medium transition-all ${
                    mobileOpen
                      ? 'text-neon-cyan bg-neon-cyan/10'
                      : 'text-text-muted/70 hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  <span className="text-xl mb-0.5">{tab.icon}</span>
                  <span>{tab.label}</span>
                  {mobileOpen && <motion.span layoutId="tabIndicator" className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-neon-cyan" />}
                </button>
              );
            }
            return (
              <Link key={tab.label} to={tab.path} onClick={() => setMobileOpen(false)}
                className={`relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl text-[11px] font-medium transition-all ${
                  tab.highlight
                    ? 'bg-gradient-to-b from-neon-cyan/15 to-electric-violet/15 border border-neon-cyan/30 text-neon-cyan -mt-1.5 px-5 py-2 shadow-lg shadow-neon-cyan/10'
                    : isActive
                      ? 'text-neon-cyan bg-neon-cyan/10'
                      : 'text-text-muted/70 hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <span className="text-xl mb-0.5">{tab.icon}</span>
                <span>{tab.label}</span>
                {isActive && !tab.highlight && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-neon-cyan" />}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="md:hidden h-16" />
    </>
  );
}
