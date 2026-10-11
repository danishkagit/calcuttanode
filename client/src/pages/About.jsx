import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import companyInfo from '../data/companyInfo';
import ParticleField from '../components/common/ParticleField';
import logo from '../assets/logo.png';
import brandText from '../assets/brand-text.png';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { duration: 0.5 } };

const capabilities = [
  { name: 'Web & Full-Stack Development', level: 95, icon: '🌐', color: 'from-emerald-400 to-teal-500', desc: 'Responsive web applications, portals & high-performance e-commerce' },
  { name: 'AI Automation & Prompt Engineering', level: 98, icon: '🤖', color: 'from-violet-400 to-purple-500', desc: 'Custom LLM integrations, conversational agents & automated pipelines' },
  { name: 'Digital Growth & Technical SEO', level: 92, icon: '📈', color: 'from-orange-400 to-amber-500', desc: 'Search engine optimization, performance campaigns & conversion funnels' },
  { name: 'Mobile Application Engineering', level: 88, icon: '📱', color: 'from-cyan-400 to-blue-500', desc: 'Native Android & modern cross-platform mobile solutions' },
  { name: 'UI/UX & Brand System Design', level: 86, icon: '🎨', color: 'from-pink-400 to-rose-500', desc: 'Design systems, interface prototypes & distinct digital branding' },
  { name: 'Remote IT & Cloud Infrastructure', level: 90, icon: '🖥️', color: 'from-indigo-400 to-purple-500', desc: 'Diagnostic troubleshooting, network setups & disaster recovery' },
];

const pillars = [
  { icon: '🌐', title: '100% Remote Delivery', desc: 'Seamless global collaboration, real-time project tracking, and frictionless communication.' },
  { icon: '⚡', title: 'Agile & Rapid Cycles', desc: 'Fast prototyping and iterative deployments with zero bureaucratic overhead.' },
  { icon: '💎', title: 'Transparent Pricing', desc: 'Clear, upfront packages with no hidden retainers or surprise invoices.' },
  { icon: '🛡️', title: 'Modern Standards', desc: 'Security-first architecture, responsive layouts, and performance-optimized code.' },
];

const milestones = [
  { year: '2024', title: 'Foundation & Launch', text: 'Established in Kolkata with a vision to deliver accessible, high-performance IT and web engineering services.', icon: '🚀' },
  { year: '2025', title: 'Service & Tech Expansion', text: 'Scaled operations into full-stack SaaS builds, AI-driven marketing systems, and mobile application engineering.', icon: '📈' },
  { year: '2026', title: 'Ecosystem & In-Browser Tools', text: 'Launched 50+ client-side free developer and SEO tools, digital products catalogue, 24/7 AI support, and mobile portal.', icon: '🏆' },
];

const stats = [
  { value: '8', label: 'Service Verticals', icon: '📋' },
  { value: '17+', label: 'Active Services', icon: '🔧' },
  { value: '50+', label: 'In-Browser Tools', icon: '🛠️' },
  { value: '6+', label: 'AI Models Integrated', icon: '🤖' },
  { value: '24/7', label: 'AI Support Desk', icon: '⏰' },
  { value: '100%', label: 'Remote Delivery', icon: '🌐' },
];

export default function About() {
  return (
    <div className="relative min-h-screen">
      <ParticleField count={30} speed={0.15} color="#543A67" />

      <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">

        {/* HERO */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <img src={logo} alt="Calcutta Node logo" className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
            <img src={brandText} alt="Calcutta Node." className="h-6 md:h-8 w-auto object-contain drop-shadow-[0_0_12px_rgba(34,211,238,0.3)] hidden sm:block" />
          </motion.div>

          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="inline-block text-xs font-semibold text-neon-cyan bg-neon-cyan/15 px-4 py-1.5 rounded-full mb-4 border border-neon-cyan/30"
          >
            ✨ Digital Growth & Engineering Agency
          </motion.span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">
            Engineering Tomorrow's Digital Experiences
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            <span className="text-neon-cyan font-bold">Calcutta Node.</span> provides modern web development, custom software, AI automation, and remote technical support for clients worldwide.
          </p>
          <p className="text-sm text-text-muted/60 mt-2">Based in Kolkata, India | Delivering Globally</p>
        </motion.div>

        {/* MISSION & VISION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            {
              icon: '🎯',
              title: 'Our Mission',
              text: 'At Calcutta Node., our mission is to democratize high-end technology and AI capabilities. Whether you are launching a fast web app, automating complex workflows, or requiring immediate remote IT support, we deliver enterprise-grade digital experiences with transparent pricing and rapid turnaround.',
              color: 'from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/30',
            },
            {
              icon: '🌟',
              title: 'Our Vision',
              text: 'We envision a future where location is no barrier to world-class software development. We engineer scalable, beautiful, and resilient digital solutions that empower businesses, creators, and startups to grow fearlessly in the AI-first economy.',
              color: 'from-electric-violet/20 to-electric-violet/5 border-electric-violet/30',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-6 glass-card border ${card.color}`}
            >
              <span className="text-3xl block mb-3">{card.icon}</span>
              <h2 className="text-xl font-bold text-text-primary mb-3">{card.title}</h2>
              <p className="text-text-muted leading-relaxed text-sm">{card.text}</p>
            </motion.div>
          ))}
        </div>

        {/* AGENCY PILLARS */}
        <motion.div className="mb-12" {...fadeUp}>
          <h2 className="text-2xl font-bold text-text-primary mb-6 border-l-4 border-neon-cyan pl-4">How We Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl glass-card flex flex-col"
              >
                <span className="text-3xl block mb-2">{p.icon}</span>
                <h3 className="text-text-primary font-semibold text-sm mb-1">{p.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* JOURNEY TIMELINE */}
        <motion.div className="mb-12" {...fadeUp}>
          <h2 className="text-2xl font-bold text-text-primary mb-8 border-l-4 border-electric-violet pl-4">Our Growth Story</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-electric-violet to-transparent" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year + m.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="flex items-start gap-5 relative"
                >
                  <motion.div whileHover={{ scale: 1.15 }} className="w-16 h-16 rounded-xl bg-surface border border-neon-cyan/30 flex items-center justify-center text-xl shrink-0 z-10 shadow-lg shadow-neon-cyan/10">
                    {m.icon}
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} className="flex-1 p-4 rounded-xl glass-card">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-bold text-neon-cyan">{m.year}</span>
                      <span className="text-xs text-electric-violet font-medium">{m.title}</span>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed">{m.text}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CAPABILITIES */}
        <motion.div className="mb-12" {...fadeUp}>
          <h2 className="text-2xl font-bold text-text-primary mb-8 border-l-4 border-neon-cyan pl-4">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl glass-card"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{cap.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h3 className="text-text-primary font-semibold text-sm truncate">{cap.name}</h3>
                      <span className="text-xs text-neon-cyan font-medium ml-2">{cap.level}%</span>
                    </div>
                    <p className="text-xs text-text-muted truncate">{cap.desc}</p>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cap.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${cap.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* STATS */}
        <motion.div className="mb-12" {...fadeUp}>
          <h2 className="text-2xl font-bold text-text-primary mb-8 border-l-4 border-electric-violet pl-4">Agency At a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -2 }}
                className="text-center p-4 rounded-2xl glass-card"
              >
                <p className="text-2xl font-bold text-neon-cyan">{s.value}</p>
                <p className="text-xs text-text-muted mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CALL TO ACTION */}
        <motion.div className="mb-12" {...fadeUp}>
          <div className="glass-card-premium p-8 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-3xl block mb-3">🚀</span>
              <h2 className="text-xl font-bold text-text-primary mb-2">Ready to Build Your Project?</h2>
              <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">
                Explore our transparent service packages or contact our engineering team to discuss your project.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link
                  to="/pricing"
                  className="bg-brand-gradient text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-neon-cyan/25 transition-all"
                >
                  View Services & Pricing
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 border border-neon-cyan/40 text-neon-cyan px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-neon-cyan/10 transition-all"
                >
                  Contact Our Team →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CONTACT INFO */}
        <motion.div className="rounded-2xl p-6 glass-card" {...fadeUp}>
          <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'Location', value: companyInfo.address, icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
              { label: 'Email', value: companyInfo.email, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', href: `mailto:${companyInfo.email}` },
              { label: 'Phone', value: companyInfo.phone, icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -2 }} className="p-4 rounded-lg bg-surface-muted/50 border border-electric-violet/10 hover:border-neon-cyan/30 transition-all break-words">
                <svg className="w-4 h-4 text-neon-cyan mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={item.icon} /></svg>
                <p className="text-text-muted text-xs mb-0.5">{item.label}</p>
                {item.href
                  ? <a href={item.href} className="text-text-primary text-sm hover:text-neon-cyan transition-colors">{item.value}</a>
                  : <p className="text-text-primary text-sm">{item.value}</p>}
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/contact" className="text-sm text-neon-cyan hover:underline">Get in touch with us →</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
