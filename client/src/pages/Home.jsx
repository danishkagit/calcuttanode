import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import companyInfo from '../data/companyInfo';
import ParticleField from '../components/common/ParticleField';
import api from '../utils/api';
import logo from '../assets/logo.png';

const DemandBadge = ({ count }) => {
  if (count >= 100) return <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full border border-red-400/20">🔥 Hot</span>;
  if (count >= 50) return <span className="text-xs font-bold text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full border border-orange-400/20">⚡ Popular</span>;
  return <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full border border-blue-400/20">📈 Growing</span>;
};

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { duration: 0.5 } };

const categoryMeta = {
  'Website Development': { icon: '🌐', desc: 'Responsive sites, stores & full-stack apps', color: 'from-emerald-400/20 to-emerald-500/5' },
  'App Development': { icon: '📱', desc: 'Android, iOS & cross-platform apps', color: 'from-blue-400/20 to-blue-500/5' },
  'Marketing': { icon: '📈', desc: 'SEO, performance ads & lead generation', color: 'from-orange-400/20 to-orange-500/5' },
  'Design': { icon: '🎨', desc: 'UI/UX, branding & graphic design', color: 'from-pink-400/20 to-pink-500/5' },
  'Remote Support': { icon: '💻', desc: 'On-demand PC, network & system help', color: 'from-violet-400/20 to-violet-500/5' },
  'Troubleshooting': { icon: '🔧', desc: 'OS, gaming & network diagnostics', color: 'from-yellow-400/20 to-yellow-500/5' },
  'Data Recovery': { icon: '💾', desc: 'HDD, SSD & NVMe file recovery', color: 'from-red-400/20 to-red-500/5' },
};

const howItWorks = [
  { step: 1, title: 'Choose a Service', desc: 'Browse our services, plans, or products. Pick what fits your needs.', icon: '🔍' },
  { step: 2, title: 'Book & Pay', desc: 'Book online or contact us. Pay securely via UPI, card, or wallet.', icon: '💳' },
  { step: 3, title: 'We Deliver', desc: 'We handle everything remotely. Fast, secure, and fully trackable.', icon: '⚡' },
  { step: 4, title: 'You Succeed', desc: 'Happy with the result? Leave a review and earn loyalty points!', icon: '🎯' },
];

const faqs = [
  { q: 'What areas do you serve?', a: 'We serve clients anywhere in the world — all services are delivered remotely. Location is never a barrier.' },
  { q: 'How quickly can you start?', a: 'Most services can begin within 24 hours of booking. For urgent issues, same-day support is available on our Premium plans.' },
  { q: 'What languages do you support?', a: 'We serve clients globally in English, with AI-powered capabilities to assist across multiple languages as needed.' },
  { q: 'Is remote support safe?', a: 'Absolutely. We use encrypted remote desktop tools. You\'re in control at all times — you can revoke access anytime.' },
  { q: 'What if I\'m not satisfied?', a: 'We offer revisions on design work and a "no recovery, no charge" policy on data recovery. Your satisfaction is our priority.' },
  { q: 'Can I get a custom website?', a: 'Yes! Our ₹4,999 package covers a 5-page responsive site. For custom requirements, contact us for a tailored quote.' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Small Business Owner', text: 'Got my clinic website done in 3 days. Professional work at an affordable price. Highly recommend!', rating: 5, avatar: 'PS' },
  { name: 'Rahul Verma', role: 'Freelance Developer', text: 'The remote IT support saved me hours of debugging. Fast response, clear communication.', rating: 5, avatar: 'RV' },
  { name: 'Anita Gupta', role: 'Startup Founder', text: 'From SEO to web development — Calcutta Node handled everything. My traffic doubled in a month.', rating: 5, avatar: 'AG' },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [servicesList, setServicesList] = useState([]);
  const [trendingServices, setTrendingServices] = useState([]);
  const [products, setProducts] = useState([]);

  const categories = useMemo(() => [...new Set(servicesList.map((s) => s.category))], [servicesList]);

  useEffect(() => {
    api.get('/services')
      .then((res) => setServicesList(Array.isArray(res.data) ? res.data : []))
      .catch(() => {});
    api.get('/services/trending')
      .then((res) => setTrendingServices(Array.isArray(res.data) ? res.data : []))
      .catch(() => {});
    api.get('/blogs', { params: { limit: 3 } })
      .then((res) => setRecentBlogs(Array.isArray(res.data) ? res.data.slice(0, 3) : []))
      .catch(() => {})
      .finally(() => setBlogLoading(false));
    api.get('/products')
      .then((res) => {
        const all = Array.isArray(res.data) ? res.data : [];
        setProducts(all.filter((p) => p.salesCount > 0).sort((a, b) => b.salesCount - a.salesCount).slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="relative">
      <ParticleField count={35} speed={0.2} />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden py-24 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl ai-pulse-ring" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-electric-violet/5 rounded-full blur-3xl ai-pulse-ring" style={{ animationDelay: '1.5s' }} />
        </div>
        <motion.div className="max-w-4xl mx-auto relative" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="mb-8">
            <img src={logo} alt="Calcutta Node." className="h-32 md:h-40 mx-auto animate-float drop-shadow-2xl" />
          </motion.div>
          <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
            className="inline-block text-xs font-semibold text-electric-violet bg-electric-violet/15 px-4 py-1.5 rounded-full mb-5 border border-electric-violet/30 shadow-lg shadow-electric-violet/10"
          >
            🚀 Digital Growth Partner
          </motion.span>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="text-5xl md:text-7xl font-bold mb-3">
            <span className="bg-gradient-to-r from-neon-cyan via-electric-violet to-neon-cyan bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              Calcutta Node.
            </span>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-neon-cyan font-medium mb-3"
          >
            Digital Growth. Delivered Instantly. Anywhere.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mb-3"
          >
            {[
              { label: '🌐 Websites', color: 'from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/20' },
              { label: '📱 Mobile Apps', color: 'from-electric-violet/20 to-electric-violet/5 border-electric-violet/20' },
              { label: '📈 SEO & Marketing', color: 'from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/20' },
              { label: '🖥️ Remote PC Help', color: 'from-electric-violet/20 to-electric-violet/5 border-electric-violet/20' },
              { label: '🤖 AI & Automation', color: 'from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/20' },
              { label: '🎨 Graphic Design', color: 'from-electric-violet/20 to-electric-violet/5 border-electric-violet/20' },
            ].map((item, i) => (
              <motion.span key={item.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.06 }}
                whileHover={{ scale: 1.05, y: -1 }}
                className={`text-xs bg-gradient-to-r ${item.color} border px-3 py-1.5 rounded-full text-text-muted/90 hover:text-text-primary transition-all duration-200 cursor-default shadow-sm`}
              >{item.label}</motion.span>
            ))}
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-xs text-text-muted/60 max-w-xl mx-auto mb-8 leading-relaxed"
          >
            From fixing a slow PC to building your dream website — we deliver practical tech solutions worldwide. <span className="text-neon-cyan font-medium">100% remote delivery.</span>
          </motion.p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.a href="/pricing" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-brand-gradient text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-xl hover:shadow-neon-cyan/30"
            >View Services</motion.a>
            <motion.a href="/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="border border-neon-cyan text-neon-cyan px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-neon-cyan/10"
            >Contact Us</motion.a>
            <motion.a href="/ai" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="border border-electric-violet/40 text-text-primary bg-electric-violet/20 px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-electric-violet/40"
            >🤖 Try AI Support</motion.a>
          </div>
        </motion.div>
      </section>

      {/* ─── STATS BAR ─── */}
      <motion.section className="py-12 px-4 relative" {...fadeUp}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: servicesList.length > 0 ? [...new Set(servicesList.map(s => s.category))].length : '8', label: 'Service Categories', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' },
            { value: servicesList.length > 0 ? servicesList.length : '17', label: 'Services Offered', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' },
            { value: products.length > 0 ? products.length : '19', label: 'Digital Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { value: '24/7', label: 'AI Support Available', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }} className="text-center p-5 rounded-2xl glass-card group relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d={stat.icon} /></svg>
              </div>
              <p className="text-3xl font-bold text-neon-cyan mb-1">{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─── AI MODELS ─── */}
      <motion.section className="py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-neon-cyan bg-neon-cyan/10 px-4 py-1.5 rounded-full border border-neon-cyan/20">🤖 AI Chat</span>
            <h2 className="text-3xl font-bold text-text-primary mt-4">6 Free AI Models — One Chat</h2>
            <p className="text-text-muted max-w-xl mx-auto mt-2">DeepSeek, MiMo, North, Nemotron, Hy3 & Big Pickle — pick one or let auto-fallback choose. All free, all in one place.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'DeepSeek', desc: 'V4 Flash — fast reasoning & code', icon: '🧠' },
              { name: 'MiMo', desc: 'V2.5 — creative & contextual', icon: '✨' },
              { name: 'North', desc: 'Mini Code — lightweight & fast', icon: '⚡' },
              { name: 'Nemotron', desc: '3 Ultra — deep analysis', icon: '🔬' },
              { name: 'Hy3', desc: 'Creative writing & content', icon: '🌊' },
              { name: 'Big Pickle', desc: 'Versatile everyday assistant', icon: '🥒' },
            ].slice(0, 4).map((model, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }} className="p-4 rounded-2xl glass-card text-center group"
              >
                <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3, delay: i * 0.3 }} className="text-3xl mb-2">{model.icon}</motion.div>
                <h3 className="text-text-primary font-semibold text-sm group-hover:text-neon-cyan transition-colors">{model.name}</h3>
                <p className="text-text-muted text-xs mt-1">{model.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <motion.a href="/ai" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-brand-gradient text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:shadow-xl hover:shadow-neon-cyan/30"
            >
              Try AI Chat Free
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* ─── SERVICES CATALOG ─── */}
      <motion.section className="py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-electric-violet bg-electric-violet/10 px-4 py-1.5 rounded-full border border-electric-violet/20">📋 Services</span>
            <h2 className="text-3xl font-bold text-text-primary mt-4">What We Offer</h2>
            <p className="text-text-muted max-w-2xl mx-auto mt-2">Organized by category — find exactly what you need</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(categoryMeta).map(([cat, meta], i) => {
              const count = servicesList.filter((s) => s.category === cat).length;
              return (
                <Link key={cat} to={`/pricing`} onClick={() => { try { window.__setPricingFilter?.(cat); } catch(e) {} }}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -5, scale: 1.02 }} className="p-5 rounded-2xl glass-card group h-full"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${meta.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                    <div className="relative">
                      <span className="text-3xl block mb-3">{meta.icon}</span>
                      <h3 className="text-text-primary font-semibold mb-1 group-hover:text-neon-cyan transition-colors">{cat}</h3>
                      <p className="text-text-muted text-xs mb-2">{meta.desc}</p>
                      <span className="text-xs text-neon-cyan">{count} service{count !== 1 ? 's' : ''}</span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/pricing" className="text-sm text-neon-cyan hover:underline">View all services with pricing →</Link>
          </div>
        </div>
      </motion.section>

      {/* ─── TRENDING SERVICES (demand-based) ─── */}
      <motion.section className="py-16 px-4 relative overflow-hidden" {...fadeUp}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,53,0.03)_0%,transparent_70%)]" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-orange-400 bg-orange-400/10 px-4 py-1.5 rounded-full border border-orange-400/20">🔥 Trending Now</span>
            <h2 className="text-3xl font-bold text-text-primary mt-4">Most In-Demand Services</h2>
            <p className="text-text-muted max-w-2xl mx-auto mt-2">
              Updated automatically based on real bookings, views & demand signals — what people need most right now
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trendingServices.slice(0, 6).map((service, i) => (
              <Link key={service._id} to="/pricing">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="p-5 rounded-2xl glass-card group h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-400/5 to-transparent rounded-bl-full" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{categoryMeta[service.category]?.icon || '📋'}</span>
                      <DemandBadge count={service.bookingCount || 0} />
                    </div>
                    <h3 className="text-text-primary font-semibold group-hover:text-neon-cyan transition-colors">{service.name}</h3>
                    <p className="text-xs text-text-muted/60 mt-1 mb-3 line-clamp-2">{service.description || categoryMeta[service.category]?.desc || ''}</p>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        {service.viewCount || 0} views
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
                        {service.bookingCount || 0} bookings
                      </span>
                      <span className="text-neon-cyan font-semibold ml-auto">₹{service.price}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/pricing" className="text-sm text-orange-400 hover:underline">Browse all services by demand →</Link>
          </div>
        </div>
      </motion.section>

      {/* ─── TRENDING PRODUCTS ─── */}
      <motion.section className="py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-neon-cyan bg-neon-cyan/10 px-4 py-1.5 rounded-full border border-neon-cyan/20">🔥 Trending</span>
            <h2 className="text-3xl font-bold text-text-primary mt-4">Popular Products</h2>
            <p className="text-text-muted max-w-xl mx-auto mt-2">Top-selling digital products and prompt packs</p>
          </div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product, i) => (
                <Link key={product._id} to={product.category === 'Prompt Packs' ? '/prompt-packs' : '/products'}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5 }} className="p-5 rounded-2xl glass-card h-full"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{product.category === 'Prompt Packs' ? '🧠' : '📦'}</span>
                      {product.salesCount > 50 && <span className="text-xs font-medium text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded-full">🔥 Best Seller</span>}
                    </div>
                    <h3 className="text-text-primary font-semibold text-sm mb-1">{product.name}</h3>
                    <p className="text-text-muted text-xs mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-neon-cyan">₹{product.price}</span>
                      <span className="text-xs text-text-muted">{product.salesCount} sold</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <Link to="/products" className="w-full md:w-auto text-center text-sm bg-surface/50 border border-electric-violet/20 px-5 py-2.5 rounded-xl text-text-muted hover:text-neon-cyan hover:border-neon-cyan/30 transition-all">
                📦 Browse Digital Products
              </Link>
              <Link to="/prompt-packs" className="w-full md:w-auto text-center text-sm bg-surface/50 border border-electric-violet/20 px-5 py-2.5 rounded-xl text-text-muted hover:text-neon-cyan hover:border-neon-cyan/30 transition-all">
                🧠 Explore Prompt Packs
              </Link>
            </div>
          )}
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/products" className="text-sm text-neon-cyan hover:underline">All Products →</Link>
            <Link to="/prompt-packs" className="text-sm text-neon-cyan hover:underline">Prompt Packs →</Link>
          </div>
        </div>
      </motion.section>

      {/* ─── HOW IT WORKS ─── */}
      <motion.section className="py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-neon-cyan bg-neon-cyan/10 px-4 py-1.5 rounded-full border border-neon-cyan/20">Process</span>
            <h2 className="text-3xl font-bold text-text-primary mt-4">Getting Help is Easy</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: item.step * 0.1 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-electric-violet/20 border border-neon-cyan/30 flex items-center justify-center mx-auto mb-4 text-2xl relative">
                  {item.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-neon-cyan text-white text-xs font-bold flex items-center justify-center">{item.step}</span>
                </div>
                <h3 className="text-text-primary font-semibold mb-1 text-sm">{item.title}</h3>
                <p className="text-text-muted text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── TESTIMONIALS ─── */}
      <motion.section className="py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-electric-violet bg-electric-violet/10 px-4 py-1.5 rounded-full border border-electric-violet/20">💬 Testimonials</span>
            <h2 className="text-3xl font-bold text-text-primary mt-4">What Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }} className="p-6 rounded-2xl glass-card"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-text-muted text-sm mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-cyan to-electric-violet flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">{t.name}</p>
                    <p className="text-text-muted text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── FOUNDER ─── */}
      <motion.section className="py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-neon-cyan bg-neon-cyan/10 px-4 py-1.5 rounded-full border border-neon-cyan/20">👤 Founder</span>
            <h2 className="text-3xl font-bold text-text-primary mt-4">Built by <span className="text-neon-cyan">Danish Shoaib</span></h2>
            <p className="text-text-muted max-w-xl mx-auto mt-2">From pharmacy to digital agency — delivering IT solutions remotely worldwide.</p>
          </div>
          <motion.div className="glass-card p-8 rounded-2xl text-center" whileHover={{ y: -4 }}>
            <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-neon-cyan to-electric-violet p-0.5">
              <img src="https://danishkagit.github.io/portfolio/assets/danish-passport.jpg" alt="Danish Shoaib" className="w-full h-full rounded-full object-cover" style={{objectPosition: 'center 25%'}} />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Danish Shoaib</h3>
            <p className="text-neon-cyan text-sm font-medium mb-2">Digital Marketing & AI Prompt Engineer | Founder @ Calcutta Node.</p>
            <p className="text-text-muted text-sm max-w-lg mx-auto mb-4">
              Experienced in digital marketing, AI prompt engineering, content creation, web development, and IT support. 
              Certified in Digital Marketing from Tech Mahindra Foundation. Currently pursuing D.Pharm (2026) and Data Analytics.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <motion.a href="https://danishkagit.github.io/portfolio/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-brand-gradient text-white px-5 py-2 rounded-xl text-sm font-medium hover:shadow-xl hover:shadow-neon-cyan/30"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                View Portfolio
              </motion.a>
              <motion.a href="https://www.linkedin.com/in/danishshoaib-in/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 border border-neon-cyan text-neon-cyan px-5 py-2 rounded-xl text-sm font-medium hover:bg-neon-cyan/10"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
                LinkedIn
              </motion.a>
              <motion.a href="/about" whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 border border-electric-violet/40 text-electric-violet px-5 py-2 rounded-xl text-sm font-medium hover:bg-electric-violet/10"
              >
                Full Story →
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── BLOG ─── */}
      <motion.section className="py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-electric-violet bg-electric-violet/10 px-4 py-1.5 rounded-full border border-electric-violet/20">📝 Blog</span>
            <h2 className="text-3xl font-bold text-text-primary mt-4">Latest Updates</h2>
          </div>
          {blogLoading ? (
            <div className="flex justify-center py-8"><div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" /></div>
          ) : recentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentBlogs.map((blog, i) => (
                <motion.div key={blog._id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}>
                  <Link to={`/blogs/${blog.slug}`} className="block rounded-2xl glass-card h-full overflow-hidden group">
                    {blog.coverImage && (
                      <div className="h-40 overflow-hidden">
                        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-electric-violet/10 text-electric-violet px-2 py-0.5 rounded-full">{blog.category || 'General'}</span>
                        {blog.createdAt && <span className="text-xs text-text-muted">{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>}
                      </div>
                      <h3 className="text-text-primary font-semibold text-sm mb-2 line-clamp-2">{blog.title}</h3>
                      <p className="text-text-muted text-xs line-clamp-3 leading-relaxed">{blog.content?.replace(/<[^>]*>/g, '').slice(0, 120)}...</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-6 rounded-2xl border border-dashed border-electric-violet/20 bg-surface/20 max-w-md mx-auto">
              <span className="text-3xl block mb-3">📬</span>
              <p className="text-text-muted text-sm mb-4">Subscribe for product launches, tips, and tech updates.</p>
              <div className="flex gap-2 max-w-xs mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-electric-violet/20 text-text-primary text-xs focus:outline-none focus:border-neon-cyan transition-colors" />
                <button className="bg-brand-gradient text-white px-4 py-2 rounded-lg text-xs font-medium hover:shadow-xl hover:shadow-neon-cyan/30 shrink-0">Subscribe</button>
              </div>
            </div>
          )}
          <div className="text-center mt-8"><Link to="/blogs" className="text-sm text-neon-cyan hover:underline">Read all articles →</Link></div>
        </div>
      </motion.section>

      {/* ─── FAQ ─── */}
      <motion.section className="py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-neon-cyan bg-neon-cyan/10 px-4 py-1.5 rounded-full border border-neon-cyan/20">❓ FAQ</span>
            <h2 className="text-3xl font-bold text-text-primary mt-4">Got Questions?</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-xl glass-card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-text-primary hover:text-neon-cyan transition-colors"
                >
                  {faq.q}
                  <motion.svg animate={{ rotate: openFaq === i ? 180 : 0 }} className="w-4 h-4 shrink-0 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </button>
                <motion.div initial={false} animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="px-4 pb-4 text-xs text-text-muted leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── FINAL CTA ─── */}
      <motion.section className="py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-3xl mx-auto text-center glass-section relative overflow-hidden p-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(126,187,197,0.05)_0%,transparent_70%)]" />
          <motion.span className="inline-block text-4xl mb-4" animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>🚀</motion.span>
          <h2 className="text-2xl font-bold text-text-primary mb-3 relative">Ready to grow your business?</h2>
          <p className="text-text-muted mb-6 max-w-lg mx-auto relative">Whether you need a website, IT support, or digital marketing — we're here to help your business succeed.</p>
          <div className="flex gap-4 justify-center flex-wrap relative">
            <motion.a href="/pricing" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-brand-gradient text-white px-8 py-3 rounded-xl font-medium hover:shadow-xl hover:shadow-neon-cyan/30"
            >View Services</motion.a>
            <motion.a href="/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="border border-electric-violet/40 text-electric-violet px-8 py-3 rounded-xl font-medium hover:bg-electric-violet/10"
            >📞 Book a Call</motion.a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-xs text-text-muted flex-wrap">
            <span>🔒 Secure Payment</span>
            <span>⚡ Instant Support</span>
            <span>🌐 Global Remote Service</span>
            <span>📱 100% Remote Delivery</span>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
