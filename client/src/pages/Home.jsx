import { useState } from 'react';
import { motion } from 'framer-motion';
import services from '../data/services';
import companyInfo from '../data/companyInfo';
import ParticleField from '../components/common/ParticleField';

const categories = [...new Set(services.map((s) => s.category))];

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { duration: 0.5 } };

const stats = [
  { value: '12+', label: 'Clients', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' },
  { value: '36+', label: 'Projects', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { value: '6', label: 'Service Categories', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' },
  { value: '99%', label: 'Satisfaction', icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' },
];

const categoryIcons = {
  'Remote Support': 'M18 10a1 1 0 011 1v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2a1 1 0 011-1z',
  'Data Recovery': 'M21 12a9 9 0 11-9-9',
  'Website Development': 'M8 21h8M12 17v4',
  'Design': 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343',
  'Marketing': 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z',
  'Troubleshooting': 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42',
};

export default function Home() {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <div className="relative">
      <ParticleField count={35} speed={0.2} />

      <section className="relative overflow-hidden py-24 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-electric-violet/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <motion.div className="max-w-4xl mx-auto relative" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-neon-cyan via-electric-violet to-neon-cyan bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              Calcutta Node.
            </span>
          </motion.div>
          <p className="text-xl md:text-2xl text-text-muted mb-2">IT Services & Digital Growth Agency</p>
          <p className="text-text-muted mb-10 max-w-lg mx-auto">{companyInfo.address}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.a href="/pricing" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-brand-gradient text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20"
            >
              View Pricing
            </motion.a>
            <motion.a href="/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="border border-neon-cyan text-neon-cyan px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-neon-cyan/10 hover:shadow-lg hover:shadow-neon-cyan/10"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </section>

      <motion.section className="py-12 px-4 relative" {...fadeUp}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredStat(i)}
              onMouseLeave={() => setHoveredStat(null)}
              whileHover={{ y: -4, scale: 1.02 }}
              className="text-center p-6 rounded-2xl bg-surface/50 border border-electric-violet/10 hover:border-neon-cyan/30 transition-all duration-300 cursor-default relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                animate={hoveredStat === i ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center mx-auto mb-3 relative"
              >
                <svg className="w-5 h-5 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d={stat.icon} />
                </svg>
              </motion.div>
              <motion.p
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-neon-cyan neon-glow-cyan mb-1"
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-text-muted relative">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {categories.map((category) => (
        <section key={category} className="py-12 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div className="flex items-center gap-3 mb-8" {...fadeUp}>
              <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={categoryIcons[category] || ''} /></svg>
              </div>
              <h2 className="text-2xl font-bold text-text-primary">{category}</h2>
              <span className="text-sm font-normal text-text-muted">({services.filter((s) => s.category === category).length} services)</span>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.filter((s) => s.category === category).map((service, i) => (
                <motion.div key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative rounded-2xl p-6 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30 hover:border-neon-cyan/40 transition-all duration-300 hover:shadow-xl hover:shadow-neon-cyan/10 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="relative">
                    <h3 className="text-text-primary font-semibold mb-2 group-hover:text-neon-cyan transition-colors">{service.name}</h3>
                    <p className="text-2xl font-bold text-neon-cyan mb-3">₹{service.price}</p>
                    <ul className="space-y-1.5">
                      {service.features.map((f, j) => (
                        <motion.li key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: j * 0.05 }}
                          className="text-text-muted text-sm flex items-center gap-2"
                        >
                          <svg className="w-3.5 h-3.5 shrink-0 text-electric-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <motion.section className="py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl p-8 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30 overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
            <svg className="w-8 h-8 text-neon-cyan/30 mb-4 mx-auto" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z"/></svg>
            <p className="text-text-muted italic text-lg leading-relaxed mb-4">
              "Calcutta Node. transformed our online presence. Professional service, quick turnaround, and exceptional support. Highly recommended for any business looking to grow digitally."
            </p>
            <div className="flex items-center justify-center gap-1 text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 animate-[pop_0.3s_ease-out] opacity-0" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="text-neon-cyan font-medium">— Danish Shoaib, Founder</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-3xl mx-auto text-center rounded-2xl p-10 border border-neon-cyan/20 bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-violet/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,230,230,0.05)_0%,transparent_70%)]" />
          <motion.span className="inline-block text-4xl mb-4" animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>🧠</motion.span>
          <h2 className="text-2xl font-bold text-text-primary mb-3 relative">Need quick help? Ask AI</h2>
          <p className="text-text-muted mb-6 max-w-lg mx-auto relative">Get instant answers, troubleshooting, or recommendations from our AI assistant — powered by 4 free models.</p>
          <motion.a href="/ai" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="inline-block bg-brand-gradient text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 relative"
          >
            Try AI Chat Now
          </motion.a>
        </div>
      </motion.section>

      <motion.section className="py-16 px-4 text-center relative" {...fadeUp}>
        <h2 className="text-2xl font-bold text-text-primary mb-4">Ready to grow your business?</h2>
        <p className="text-text-muted mb-8 max-w-lg mx-auto">Explore our portfolio, browse services, or get in touch.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <motion.a href="/work" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-brand-gradient text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20"
          >
            Our Work
          </motion.a>
          <motion.a href="/pricing" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="border border-neon-cyan text-neon-cyan px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-neon-cyan/10"
          >
            View Services
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
