import { motion } from 'framer-motion';
import services from '../data/services';
import companyInfo from '../data/companyInfo';

const categories = [...new Set(services.map((s) => s.category))];

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { duration: 0.5 } };

const stats = [
  { value: '12+', label: 'Clients' },
  { value: '36+', label: 'Projects' },
  { value: '6', label: 'Service Categories' },
  { value: '99%', label: 'Satisfaction' },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden py-24 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />
        <motion.div className="max-w-4xl mx-auto relative" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.h1 className="text-5xl md:text-7xl font-bold text-neon-cyan neon-glow-cyan mb-4"
            initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            Calcutta Node.
          </motion.h1>
          <p className="text-xl md:text-2xl text-text-muted mb-2">IT Services & Digital Growth Agency</p>
          <p className="text-text-muted mb-10 max-w-lg mx-auto">{companyInfo.address}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/pricing" className="bg-brand-gradient text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 hover:scale-105 active:scale-95">
              View Pricing
            </a>
            <a href="/contact" className="border border-neon-cyan text-neon-cyan px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-neon-cyan/10 hover:shadow-lg hover:shadow-neon-cyan/10">
              Contact Us
            </a>
          </div>
        </motion.div>
      </section>

      <motion.section className="py-12 px-4" {...fadeUp}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} className="text-center p-6 rounded-2xl bg-surface/50 border border-electric-violet/10"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-neon-cyan neon-glow-cyan mb-1">{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {categories.map((category) => (
        <section key={category} className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2 className="text-2xl font-bold text-text-primary mb-6 border-l-4 border-neon-cyan pl-4 flex items-center gap-3" {...fadeUp}>
              {category}
              <span className="text-sm font-normal text-text-muted">({services.filter((s) => s.category === category).length} services)</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.filter((s) => s.category === category).map((service, i) => (
                <motion.div key={service.id}
                  className="group relative rounded-2xl p-6 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30 hover:border-neon-cyan/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-neon-cyan/5"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <h3 className="text-text-primary font-semibold mb-2 group-hover:text-neon-cyan transition-colors">{service.name}</h3>
                  <p className="text-2xl font-bold text-neon-cyan mb-3">₹{service.price}</p>
                  <ul className="space-y-1.5">
                    {service.features.map((f, j) => (
                      <li key={j} className="text-text-muted text-sm flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 shrink-0 text-electric-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <motion.section className="py-16 px-4" {...fadeUp}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-8">What Our Clients Say</h2>
          <div className="relative rounded-2xl p-8 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30">
            <svg className="w-8 h-8 text-neon-cyan/30 mb-4 mx-auto" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z"/></svg>
            <p className="text-text-muted italic text-lg leading-relaxed mb-4">
              "Calcutta Node. transformed our online presence. Professional service, quick turnaround, and exceptional support. Highly recommended for any business looking to grow digitally."
            </p>
            <div className="flex items-center justify-center gap-1 text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="text-neon-cyan font-medium">— Client (placeholder)</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
