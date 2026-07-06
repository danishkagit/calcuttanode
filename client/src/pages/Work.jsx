import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import works from '../data/works';
import ParticleField from '../components/common/ParticleField';

function CompanyLogo({ logo, name }) {
  return (
    <motion.div className="flex flex-col items-center gap-3 shrink-0 mx-10 group" whileHover={{ scale: 1.05 }}>
      <div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-white p-2.5 border border-gray-200 group-hover:border-neon-cyan/40 group-hover:shadow-lg group-hover:shadow-neon-cyan/10 transition-all duration-300">
        <img src={logo} alt={name} className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className="text-sm font-medium text-text-muted group-hover:text-neon-cyan transition-colors duration-300 whitespace-nowrap">{name}</span>
    </motion.div>
  );
}

export default function Work() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const totalProjects = works.reduce((acc, w) => acc + w.projects.length, 0);

  const industries = useMemo(() => ['All', ...new Set(works.map(w => w.industry))], []);

  const filteredWorks = selectedIndustry === 'All'
    ? works
    : works.filter(w => w.industry === selectedIndustry);

  return (
    <div className="relative min-h-screen">
      <ParticleField count={25} speed={0.2} />

      <section className="relative overflow-hidden py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-transparent pointer-events-none" />
        <div className="absolute top-10 left-20 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-electric-violet/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <motion.div className="max-w-4xl mx-auto relative" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-4">Our Work</h1>
          <p className="text-xl text-text-muted mb-8">Trusted by businesses across industries — from startups to enterprises</p>
          <div className="flex justify-center gap-8">
            {[
              { value: works.length, label: 'Clients' },
              { value: totalProjects, label: 'Projects' },
              { value: '10+', label: 'Industries' },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl font-bold text-neon-cyan neon-glow-cyan">{stat.value}</p>
                <p className="text-sm text-text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="overflow-hidden py-12 border-y border-electric-violet/10 mb-12 bg-gradient-to-r from-transparent via-neon-cyan/3 to-transparent"
      >
        <motion.div className="flex items-center" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
          {[...works, ...works].map((company, i) => (
            <CompanyLogo key={`${company.id}-${i}`} logo={company.logo} name={company.name} />
          ))}
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {industries.map(ind => (
            <motion.button
              key={ind}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedIndustry === ind
                  ? 'bg-neon-cyan text-black shadow-lg shadow-neon-cyan/30 scale-105'
                  : 'bg-surface/50 text-text-muted border border-electric-violet/20 hover:border-neon-cyan/40'
              }`}
            >
              {ind}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={selectedIndustry} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {filteredWorks.map((company, idx) => (
              <motion.section key={company.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: idx * 0.05 }}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-5 mb-8 p-4 rounded-2xl bg-surface/30 border border-electric-violet/10 hover:border-neon-cyan/30 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="w-16 h-16 rounded-xl bg-white p-2 border border-gray-200 flex items-center justify-center shrink-0 hover:border-neon-cyan/40 transition-all duration-300"
                  >
                    <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">{company.name}</h2>
                    <p className="text-sm text-electric-violet">{company.industry}</p>
                  </div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {company.projects.map((project, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="group relative rounded-2xl p-6 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30 hover:border-neon-cyan/40 transition-all duration-300 hover:shadow-xl hover:shadow-neon-cyan/10 overflow-hidden"
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-block text-xs font-semibold bg-electric-violet/20 text-electric-violet px-3 py-1 rounded-full mb-4"
                        >
                          {project.service}
                        </motion.span>
                        <p className="text-text-primary text-sm mb-3 leading-relaxed group-hover:text-neon-cyan transition-colors">{project.description}</p>
                        <div className="flex items-start gap-2 pt-3 border-t border-electric-violet/10">
                          <svg className="w-4 h-4 mt-0.5 shrink-0 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                          </svg>
                          <p className="text-xs text-neon-cyan leading-relaxed">{project.outcome}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
