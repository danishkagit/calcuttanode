import { motion } from 'framer-motion';
import works from '../data/works';

function CompanyLogo({ logo, name }) {
  return (
    <div className="flex flex-col items-center gap-3 shrink-0 mx-10 group">
      <div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-white p-2.5 border border-gray-200 group-hover:border-neon-cyan/40 group-hover:shadow-lg group-hover:shadow-neon-cyan/10 transition-all duration-300">
        <img src={logo} alt={name} className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className="text-sm font-medium text-text-muted group-hover:text-neon-cyan transition-colors duration-300 whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function Work() {
  const totalProjects = works.reduce((acc, w) => acc + w.projects.length, 0);

  return (
    <div>
      <section className="relative overflow-hidden py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-transparent pointer-events-none" />
        <motion.div className="max-w-4xl mx-auto relative" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-4">Our Work</h1>
          <p className="text-xl text-text-muted mb-8">Trusted by businesses across industries — from startups to enterprises</p>
          <div className="flex justify-center gap-8">
            <div>
              <p className="text-3xl font-bold text-neon-cyan">{works.length}</p>
              <p className="text-sm text-text-muted">Clients</p>
            </div>
            <div className="w-px bg-electric-violet/20" />
            <div>
              <p className="text-3xl font-bold text-neon-cyan">{totalProjects}</p>
              <p className="text-sm text-text-muted">Projects</p>
            </div>
            <div className="w-px bg-electric-violet/20" />
            <div>
              <p className="text-3xl font-bold text-neon-cyan">{works.length * 3}</p>
              <p className="text-sm text-text-muted">Industries</p>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="relative overflow-hidden py-12 border-y border-electric-violet/10 mb-16 bg-gradient-to-r from-transparent via-neon-cyan/5 to-transparent">
        <motion.div className="flex items-center" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
          {[...works, ...works].map((company, i) => (
            <CompanyLogo key={`${company.id}-${i}`} logo={company.logo} name={company.name} />
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-24">
        {works.map((company, idx) => (
          <motion.section key={company.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: idx * 0.05 }}>
            <div className="flex items-center gap-5 mb-8 p-4 rounded-2xl bg-surface/30 border border-electric-violet/10 hover:border-neon-cyan/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-white p-2 border border-gray-200 flex items-center justify-center shrink-0 hover:border-neon-cyan/40 transition-all duration-300">
                <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">{company.name}</h2>
                <p className="text-sm text-electric-violet">{company.industry}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {company.projects.map((project, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative rounded-2xl p-6 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30 hover:border-neon-cyan/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-neon-cyan/5"
                >
                  <span className="inline-block text-xs font-semibold bg-electric-violet/20 text-electric-violet px-3 py-1 rounded-full mb-4">{project.service}</span>
                  <p className="text-text-primary text-sm mb-3 leading-relaxed group-hover:text-neon-cyan transition-colors">{project.description}</p>
                  <div className="flex items-start gap-2 pt-3 border-t border-electric-violet/10">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                    </svg>
                    <p className="text-xs text-neon-cyan leading-relaxed">{project.outcome}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
