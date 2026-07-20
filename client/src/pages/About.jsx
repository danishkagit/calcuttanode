import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import companyInfo from '../data/companyInfo';
import ParticleField from '../components/common/ParticleField';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { duration: 0.5 } };

const skills = [
  { name: 'Web Development', level: 85, icon: '🌐', color: 'from-emerald-400 to-teal-500' },
  { name: 'Digital Marketing', level: 90, icon: '📈', color: 'from-orange-400 to-red-500' },
  { name: 'AI Prompt Engineering', level: 95, icon: '🤖', color: 'from-violet-400 to-purple-500' },
  { name: 'UI/UX Design', level: 75, icon: '🎨', color: 'from-pink-400 to-rose-500' },
  { name: 'IT Support', level: 88, icon: '🖥️', color: 'from-blue-400 to-indigo-500' },
  { name: 'Content Creation', level: 82, icon: '✍️', color: 'from-amber-400 to-yellow-500' },
];

const certifications = [
  { name: 'Digital Marketing', issuer: 'Tech Mahindra Foundation', year: '2024', icon: '📜' },
  { name: 'Data Analytics', issuer: 'Self-Paced', year: '2026', icon: '📊' },
  { name: 'D.Pharm', issuer: 'Pursuing', year: '2026', icon: '💊' },
  { name: 'Full-Stack Development', issuer: 'Self-Taught', year: '2024', icon: '💻' },
];

const milestones = [
  { year: '2024', title: 'Self-Taught Journey', text: 'Started learning digital marketing, web development, and AI prompt engineering through online resources.', icon: '📚' },
  { year: '2025', title: 'Founded Calcutta Node.', text: 'Danish Shoaib started Calcutta Node. with a mission to make professional IT support accessible and affordable for everyone.', icon: '🚀' },
  { year: '2025', title: 'Service Expansion', text: 'Expanded from IT support into web development, design, digital marketing, and data recovery services.', icon: '📈' },
  { year: '2026', title: 'Digital Launch', text: 'Launched digital products store, AI chat support, membership subscriptions, and a full client dashboard.', icon: '🏆' },
  { year: '2026', title: 'Continuous Growth', text: 'Pursuing D.Pharm and Data Analytics while expanding the agency with new services and AI-powered tools.', icon: '🌟' },
];

const stats = [
  { value: '8', label: 'Service Categories', icon: '📋' },
  { value: '17', label: 'Services Offered', icon: '🔧' },
  { value: '19', label: 'Digital Products', icon: '📦' },
  { value: '6', label: 'AI Models', icon: '🤖' },
  { value: '24/7', label: 'AI Support', icon: '⏰' },
  { value: '🌐', label: 'Worldwide Service', icon: '🌐' },
];

export default function About() {
  return (
    <div className="relative min-h-screen">
      <ParticleField count={30} speed={0.15} color="#543A67" />

      <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">

        {/* HERO */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-28 h-28 rounded-full mx-auto mb-5 bg-gradient-to-br from-neon-cyan to-electric-violet p-1 shadow-xl shadow-neon-cyan/20"
          >
            <img src="https://danishkagit.github.io/portfolio/assets/danish-passport.jpg" alt="Danish Shoaib" className="w-full h-full rounded-full object-cover border-2 border-background" style={{objectPosition: 'center 25%'}} />
          </motion.div>
          <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
            className="inline-block text-xs font-semibold text-electric-violet bg-electric-violet/15 px-4 py-1.5 rounded-full mb-4 border border-electric-violet/30"
          >👋 About Me</motion.span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
            Danish <span className="bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent">Shoaib</span>
          </h1>
          <p className="text-lg text-text-muted max-w-xl mx-auto">Digital Marketing & AI Prompt Engineer | <span className="whitespace-nowrap">Founder @ <span className="text-neon-cyan">Calcutta Node.</span></span></p>
          <p className="text-sm text-text-muted/60 mt-1">📍 Champdani, Hooghly, West Bengal, India</p>
        </motion.div>

        {/* WHO I AM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            {
              icon: '👤',
              title: 'Who I Am',
              text: 'I\'m Danish Shoaib — a self-taught digital professional based in Champdani, Hooghly. Before Calcutta Node., I ran a pharmacy. I saw small businesses struggle with technology and decided to bridge that gap. Today I run a remote-first digital agency serving clients globally while continuing my education.',
              color: 'from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/30',
            },
            {
              icon: '🎯',
              title: 'What I Do',
              text: 'I help businesses grow through web development, digital marketing, AI-powered solutions, and IT support. Every service is delivered remotely, making professional tech support accessible to anyone, anywhere — without the big-agency price tag.',
              color: 'from-electric-violet/20 to-electric-violet/5 border-electric-violet/30',
            },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }} className={`rounded-2xl p-6 glass-card border ${card.color}`}
            >
              <span className="text-3xl block mb-3">{card.icon}</span>
              <h2 className="text-xl font-bold text-text-primary mb-3">{card.title}</h2>
              <p className="text-text-muted leading-relaxed text-sm">{card.text}</p>
            </motion.div>
          ))}
        </div>

        {/* JOURNEY TIMELINE */}
        <motion.div className="mb-12" {...fadeUp}>
          <h2 className="text-2xl font-bold text-text-primary mb-8 border-l-4 border-neon-cyan pl-4">My Journey</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-electric-violet to-transparent" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <motion.div key={m.year + m.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="flex items-start gap-5 relative"
                >
                  <motion.div whileHover={{ scale: 1.2 }} className="w-16 h-16 rounded-xl bg-surface border border-neon-cyan/30 flex items-center justify-center text-xl shrink-0 z-10 shadow-lg shadow-neon-cyan/10">{m.icon}</motion.div>
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

        {/* SKILLS */}
        <motion.div className="mb-12" {...fadeUp}>
          <h2 className="text-2xl font-bold text-text-primary mb-8 border-l-4 border-electric-violet pl-4">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <motion.div key={skill.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl glass-card"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-text-primary font-semibold text-sm">{skill.name}</h3>
                      <span className="text-xs text-neon-cyan font-medium">{skill.level}%</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CERTIFICATIONS */}
        <motion.div className="mb-12" {...fadeUp}>
          <h2 className="text-2xl font-bold text-text-primary mb-8 border-l-4 border-neon-cyan pl-4">Certifications & Education</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, i) => (
              <motion.div key={cert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }} className="p-5 rounded-2xl glass-card text-center"
              >
                <span className="text-3xl block mb-3">{cert.icon}</span>
                <h3 className="text-text-primary font-semibold text-sm mb-1">{cert.name}</h3>
                <p className="text-xs text-text-muted">{cert.issuer}</p>
                <span className="text-xs text-neon-cyan mt-2 inline-block">{cert.year}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* STATS */}
        <motion.div className="mb-12" {...fadeUp}>
          <h2 className="text-2xl font-bold text-text-primary mb-8 border-l-4 border-electric-violet pl-4">At a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -2 }} className="text-center p-4 rounded-2xl glass-card"
              >
                <p className="text-2xl font-bold text-neon-cyan">{s.value}</p>
                <p className="text-xs text-text-muted mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RESUME + LINKS */}
        <motion.div className="mb-12" {...fadeUp}>
          <div className="glass-card-premium p-8 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-3xl block mb-3">📄</span>
              <h2 className="text-xl font-bold text-text-primary mb-2">Want to know more?</h2>
              <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">Download my resume or check out my portfolio and LinkedIn for the full picture.</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <a href="https://calcuttanode-api.onrender.com/api/resume/download" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-brand-gradient text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-xl hover:shadow-neon-cyan/30"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  Download Resume
                </a>
                <a href="https://danishkagit.github.io/portfolio/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-neon-cyan text-neon-cyan px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-neon-cyan/10"
                >
                  View Portfolio
                </a>
                <a href="https://www.linkedin.com/in/danishshoaib-in/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-electric-violet/40 text-electric-violet px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-electric-violet/10"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CONTACT */}
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
              <motion.div key={i} whileHover={{ y: -2 }} className="p-4 rounded-lg bg-white/5 border border-electric-violet/10 hover:border-neon-cyan/30 transition-all">
                <svg className="w-4 h-4 text-neon-cyan mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={item.icon} /></svg>
                <p className="text-text-muted text-xs mb-0.5">{item.label}</p>
                {item.href
                  ? <a href={item.href} className="text-text-primary text-sm hover:text-neon-cyan transition-colors">{item.value}</a>
                  : <p className="text-text-primary text-sm">{item.value}</p>}
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/contact" className="text-sm text-neon-cyan hover:underline">Get in touch →</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
