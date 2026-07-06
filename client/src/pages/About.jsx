import { motion } from 'framer-motion';
import companyInfo from '../data/companyInfo';
import ParticleField from '../components/common/ParticleField';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { duration: 0.5 } };

const milestones = [
  { year: '2023', title: 'Founded', text: 'Started operations in Champdani, Hooghly with a mission to make IT services accessible.', icon: '🚀' },
  { year: '2024', title: 'Growth', text: 'Expanded across 6 service categories — from web development to digital marketing.', icon: '📈' },
  { year: '2025', title: 'Today', text: 'Trusted by 12+ clients with 36+ successful projects delivered and a growing team.', icon: '🏆' },
];

const values = [
  { icon: 'M9 12l2 2 4-4', title: 'Quality First', desc: 'We never compromise on quality. Every project meets our rigorous standards.' },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'On-Time Delivery', desc: 'We respect your deadlines. Our track record speaks for itself.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0', title: 'Client First', desc: 'Your success is our success. We build relationships, not just projects.' },
];

export default function About() {
  return (
    <div className="relative min-h-screen">
      <ParticleField count={30} speed={0.15} color="#8B3DF7" />

      <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="inline-block text-5xl mb-4"
          >
            👋
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-4">
            About Calcutta Node.
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">IT Services & Digital Growth Agency based in Champdani, Hooghly, West Bengal</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            {
              icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2',
              icon2: 'M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
              title: 'Who We Are',
              text: 'Calcutta Node. is an IT services and digital growth agency. We provide remote IT support, data recovery, web development, UI/UX design, graphics design, digital marketing, performance marketing, and technical troubleshooting services.',
              color: 'neon-cyan',
            },
            {
              icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
              title: 'Our Mission',
              text: 'Founded by Danish Shoaib, our mission is to make professional IT support and digital services accessible and affordable for everyone — from individuals to growing businesses.',
              color: 'electric-violet',
            },
          ].map((card, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-6 border border-${card.color}/20 bg-gradient-to-b from-surface/80 to-surface/30 hover:border-${card.color}/40 transition-all duration-300 group`}
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className={`w-12 h-12 rounded-xl bg-${card.color}/10 flex items-center justify-center mb-4 group-hover:bg-${card.color}/20 transition-colors`}
              >
                <svg className={`w-6 h-6 text-${card.color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={card.icon} />
                  {card.icon2 && <path d={card.icon2} />}
                </svg>
              </motion.div>
              <h2 className="text-xl font-bold text-text-primary mb-3 group-hover:text-neon-cyan transition-colors">{card.title}</h2>
              <p className="text-text-muted leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="mb-12" {...fadeUp}>
          <h2 className="text-2xl font-bold text-text-primary mb-8 border-l-4 border-neon-cyan pl-4">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-electric-violet to-transparent" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <motion.div key={m.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="flex items-start gap-5 relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-16 h-16 rounded-xl bg-surface border border-neon-cyan/30 flex items-center justify-center text-xl shrink-0 z-10 shadow-lg shadow-neon-cyan/10"
                  >
                    {m.icon}
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex-1 p-4 rounded-xl border border-electric-violet/10 bg-surface/30 hover:border-neon-cyan/20 transition-all duration-300"
                  >
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

        <motion.div className="mb-12" {...fadeUp}>
          <h2 className="text-2xl font-bold text-text-primary mb-8 border-l-4 border-electric-violet pl-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border border-electric-violet/10 bg-gradient-to-b from-surface/50 to-transparent hover:border-neon-cyan/30 transition-all duration-300 text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center mx-auto mb-3"
                >
                  <svg className="w-6 h-6 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d={v.icon} />
                  </svg>
                </motion.div>
                <h3 className="text-text-primary font-semibold mb-2 group-hover:text-neon-cyan transition-colors">{v.title}</h3>
                <p className="text-text-muted text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="rounded-2xl p-6 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30 hover:border-neon-cyan/30 transition-all duration-300" {...fadeUp}>
          <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'Address', value: companyInfo.address, icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
              { label: 'Email', value: companyInfo.email, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', href: `mailto:${companyInfo.email}` },
              { label: 'Phone', value: companyInfo.phone, icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
            ].map((item, i) => (
              <motion.div key={i}
                whileHover={{ y: -2 }}
                className="p-4 rounded-lg bg-white/5 border border-electric-violet/10 hover:border-neon-cyan/30 transition-all duration-300"
              >
                <svg className="w-4 h-4 text-neon-cyan mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d={item.icon} /></svg>
                <p className="text-text-muted text-xs mb-0.5">{item.label}</p>
                {item.href
                  ? <a href={item.href} className="text-text-primary text-sm hover:text-neon-cyan transition-colors">{item.value}</a>
                  : <p className="text-text-primary text-sm">{item.value}</p>
                }
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
