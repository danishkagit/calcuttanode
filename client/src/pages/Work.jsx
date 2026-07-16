import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import works from '../data/works';
import ParticleField from '../components/common/ParticleField';

function CompanyLogo({ logo, name, slug }) {
  return (
    <Link to={`/work/${slug}`} className="flex flex-col items-center gap-3 shrink-0 mx-10 group">
      <div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-white p-2.5 border border-gray-200 group-hover:border-neon-cyan/40 group-hover:shadow-lg group-hover:shadow-neon-cyan/10 transition-all duration-300">
        <img src={logo} alt={name} className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className="text-sm font-medium text-text-muted group-hover:text-neon-cyan transition-colors duration-300 whitespace-nowrap">{name}</span>
    </Link>
  );
}

export default function Work() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const totalProjects = works.reduce((acc, w) => acc + w.projects.length, 0);
  const totalMetrics = works.reduce((acc, w) => acc + w.results.metrics.length, 0);

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
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block text-sm font-medium text-neon-cyan bg-neon-cyan/10 px-4 py-1.5 rounded-full mb-5 border border-neon-cyan/20"
          >
            🏆 Real Projects. Real Results.
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-4">Our Work</h1>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">From local businesses across India to global brands in Brazil, Japan, Thailand, South Africa, Italy, and Australia — explore our portfolio of digital transformations across 12+ industries & 6 countries</p>
          <div className="flex justify-center gap-8 flex-wrap">
            {[
              { value: works.length, label: 'Case Studies' },
              { value: totalProjects, label: 'Projects Delivered' },
              { value: totalMetrics, label: 'Proven Metrics' },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl font-bold text-neon-cyan neon-glow-cyan">{stat.value}+</p>
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
            <CompanyLogo key={`${company.id}-${i}`} logo={company.logo} name={company.name} slug={company.slug} />
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
                <Link to={`/work/${company.slug}`} className="block group">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-5 mb-4 p-4 rounded-2xl glass-card"
                  >
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      className="w-16 h-16 rounded-xl bg-white p-2 border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-neon-cyan/40 transition-all duration-300"
                    >
                      <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-2xl font-bold text-text-primary group-hover:text-neon-cyan transition-colors">{company.name}</h2>
                        <svg className="w-5 h-5 text-neon-cyan opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                      <p className="text-sm text-electric-violet">{company.industry} — {company.location}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                      <span className="text-neon-cyan font-bold text-lg">{company.results.metric}</span>
                      <span className="text-xs text-text-muted bg-surface/50 px-3 py-1 rounded-full border border-electric-violet/10 whitespace-nowrap">
                        {company.projects.length} projects
                      </span>
                    </div>
                  </motion.div>
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {company.projects.slice(0, 3).map((project, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="group relative rounded-2xl p-5 glass-card overflow-hidden"
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <div className="rounded-lg overflow-hidden mb-3 bg-surface/30 border border-electric-violet/5">
                          <img src={project.image} alt={project.service} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-block text-xs font-semibold bg-electric-violet/20 text-electric-violet px-3 py-1 rounded-full mb-3"
                        >
                          {project.service}
                        </motion.span>
                        <p className="text-text-primary text-sm mb-3 leading-relaxed line-clamp-2 group-hover:text-neon-cyan transition-colors">{project.description}</p>
                        <div className="flex items-start gap-2 pt-3 border-t border-electric-violet/10">
                          <svg className="w-4 h-4 mt-0.5 shrink-0 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                          </svg>
                          <p className="text-xs text-neon-cyan leading-relaxed line-clamp-2">{project.outcome}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredWorks.length > 0 && (
          <motion.div className="mt-16 text-center" {...{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }}>
            <div className="rounded-2xl p-8 glass-section max-w-2xl mx-auto">
              <span className="text-3xl block mb-3">🚀</span>
              <h2 className="text-2xl font-bold text-text-primary mb-3">Want Results Like These?</h2>
              <p className="text-text-muted text-sm mb-6 max-w-lg mx-auto">Whether you need a website, IT support, digital marketing, or a complete digital transformation — we're ready to help your business grow in 2026.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/pricing"
                  className="bg-brand-gradient text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20"
                >
                  View Services
                </Link>
                <Link to="/contact"
                  className="border border-neon-cyan text-neon-cyan px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-neon-cyan/10"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
