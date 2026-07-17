import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import works from '../data/works';
import ParticleField from '../components/common/ParticleField';

const industryThemes = {
  'Food & Catering': { primary: '#ef4444', secondary: '#f97316', gradient: 'from-red-500/10 via-orange-500/5 to-transparent', badge: 'industry-badge-food' },
  'Food & Beverage': { primary: '#ef4444', secondary: '#22c55e', gradient: 'from-red-500/10 via-green-500/5 to-transparent', badge: 'industry-badge-cafe' },
  'Healthcare': { primary: '#3b82f6', secondary: '#14b8a6', gradient: 'from-blue-500/10 via-teal-500/5 to-transparent', badge: 'industry-badge-health' },
  'Healthcare / Dental': { primary: '#14b8a6', secondary: '#3b82f6', gradient: 'from-teal-500/10 via-blue-500/5 to-transparent', badge: 'industry-badge-dental' },
  'Healthcare / Pharmacy': { primary: '#22c55e', secondary: '#3b82f6', gradient: 'from-green-500/10 via-blue-500/5 to-transparent', badge: 'industry-badge-pharmacy' },
  'Retail & Grocery': { primary: '#f59e0b', secondary: '#22c55e', gradient: 'from-amber-500/10 via-green-500/5 to-transparent', badge: 'industry-badge-retail' },
  'Education': { primary: '#4f46e5', secondary: '#8b5cf6', gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent', badge: 'industry-badge-edu' },
  'Beauty & Wellness': { primary: '#f472b6', secondary: '#ec4899', gradient: 'from-pink-500/10 via-rose-500/5 to-transparent', badge: 'industry-badge-beauty' },
  'IT Services': { primary: '#0ea5e9', secondary: '#06b6d4', gradient: 'from-sky-500/10 via-cyan-500/5 to-transparent', badge: 'industry-badge-tech' },
  'Organic Products': { primary: '#10b981', secondary: '#059669', gradient: 'from-emerald-500/10 via-green-500/5 to-transparent', badge: 'industry-badge-organic' },
  'Fitness & Wellness': { primary: '#06b6d4', secondary: '#22c55e', gradient: 'from-cyan-500/10 via-green-500/5 to-transparent', badge: 'industry-badge-fitness' },
  'Handicrafts & Marketplace': { primary: '#14b8a6', secondary: '#d97706', gradient: 'from-teal-500/10 via-amber-500/5 to-transparent', badge: 'industry-badge-artisan' },
  'Tourism & Adventure': { primary: '#f97316', secondary: '#22c55e', gradient: 'from-orange-500/10 via-green-500/5 to-transparent', badge: 'industry-badge-tourism' },
  'Hospitality': { primary: '#eab308', secondary: '#ef4444', gradient: 'from-yellow-500/10 via-red-500/5 to-transparent', badge: 'industry-badge-hospitality' },
  'Interior Design': { primary: '#f472b6', secondary: '#eab308', gradient: 'from-pink-500/10 via-yellow-500/5 to-transparent', badge: 'industry-badge-interior' },
  'Home Services': { primary: '#3b82f6', secondary: '#f97316', gradient: 'from-blue-500/10 via-orange-500/5 to-transparent', badge: 'industry-badge-home' },
};

const industryIcon = {
  'Food & Catering': '🍽️', 'Food & Beverage': '☕', 'Healthcare': '🏥', 'Healthcare / Dental': '🦷',
  'Healthcare / Pharmacy': '💊', 'Retail & Grocery': '🛒', 'Education': '📚', 'Beauty & Wellness': '💅',
  'IT Services': '💻', 'Organic Products': '🌿', 'Fitness & Wellness': '💪', 'Handicrafts & Marketplace': '🎨',
  'Tourism & Adventure': '🏔️', 'Hospitality': '🍺', 'Interior Design': '🏠', 'Home Services': '🔧',
};

export default function CaseStudy() {
  const { slug } = useParams();
  const company = works.find(w => w.slug === slug);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Case Study Not Found</h1>
          <Link to="/work" className="text-neon-cyan hover:underline">← Back to all case studies</Link>
        </div>
      </div>
    );
  }

  const theme = industryThemes[company.industry] || { primary: '#7EBBC5', secondary: '#543A67', gradient: 'from-neon-cyan/10 via-electric-violet/5 to-transparent', badge: 'industry-badge-tech' };
  const relatedWorks = works.filter(w => w.id !== company.id).slice(0, 3);

  return (
    <div className="relative min-h-screen">
      <ParticleField count={20} speed={0.15} />

      <section className={`relative overflow-hidden py-16 px-4`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} pointer-events-none`} />
        <div className="absolute top-10 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: `${theme.primary}15` }} />
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: `${theme.secondary}10`, animationDelay: '1.5s' }} />
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <Link to="/work" className="text-neon-cyan hover:text-neon-cyan/80 text-sm flex items-center gap-1 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to All Case Studies
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="portfolio-card rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6"
          >
            <div className="w-24 h-24 rounded-2xl bg-surface/80 p-3 border border-neon-cyan/10 flex items-center justify-center shrink-0">
              <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-2">{company.name}</h1>
              <p className="text-text-muted mb-3">{company.industry} — {company.location}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="bg-electric-violet/15 text-electric-violet text-xs px-3 py-1 rounded-full font-medium">Founded {company.founded}</span>
                <span className={theme.badge + ' text-xs px-3 py-1 rounded-full font-medium'}>Case Study</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6"
          >
            {company.results.metrics.map((m, i) => (
              <div key={i}
                className="portfolio-card rounded-xl p-4 text-center hover:border-neon-cyan/20 transition-all duration-300"
                style={{ borderColor: `${theme.primary}20` }}
              >
                <p className="text-2xl md:text-3xl font-bold neon-glow-cyan" style={{ color: theme.primary }}>{m.value}</p>
                <p className="text-xs text-text-muted mt-1">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-20">

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <div className="portfolio-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{industryIcon[company.industry] || '⚠️'}</span>
              <h2 className="text-2xl font-bold text-text-primary">The Challenge</h2>
            </div>
            <p className="text-text-muted leading-relaxed text-[15px]">{company.challenge}</p>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <div className="portfolio-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💡</span>
              <h2 className="text-2xl font-bold text-text-primary">Our Solution</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <p className="text-text-muted leading-relaxed text-[15px]">{company.solution}</p>
              <div className="rounded-xl overflow-hidden border border-neon-cyan/10 bg-surface/30 p-2">
                <img src={company.image} alt={`${company.name} project`} className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-2xl p-8 md:p-10 bg-gradient-to-br from-neon-cyan/10 via-electric-violet/5 to-transparent border border-neon-cyan/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl" />
            <div className="flex items-center gap-3 mb-4 relative">
              <span className="text-2xl">📈</span>
              <h2 className="text-2xl font-bold text-text-primary">Results</h2>
            </div>
            <div className="relative">
              <p className="text-4xl md:text-5xl font-bold neon-glow-cyan mb-2" style={{ color: theme.primary }}>{company.results.metric}</p>
              <p className="text-lg text-text-muted mb-6">{company.results.label}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
              {company.results.metrics.map((m, i) => (
                <div key={i} className="bg-surface/40 backdrop-blur-sm rounded-xl p-4 text-center border border-neon-cyan/5">
                  <p className="text-xl font-bold" style={{ color: theme.primary }}>{m.value}</p>
                  <p className="text-xs text-text-muted mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🛠️</span>
            <h2 className="text-2xl font-bold text-text-primary">Projects Delivered</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {company.projects.map((project, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="portfolio-card rounded-xl p-5 hover:border-neon-cyan/20 transition-all duration-300 group"
                style={{ borderColor: `${theme.primary}15` }}
              >
                <div className="rounded-lg overflow-hidden mb-4 bg-surface/30 border border-neon-cyan/5">
                  <img src={project.image} alt={project.service} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${theme.badge}`}>{project.service}</span>
                <p className="text-text-primary text-sm mb-3 leading-relaxed">{project.description}</p>
                <div className="flex items-start gap-2 pt-3 border-t border-neon-cyan/10">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  <p className="text-xs text-neon-cyan leading-relaxed">{project.outcome}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <div className="portfolio-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">⚡</span>
              <h2 className="text-xl font-bold text-text-primary">Technology Stack Used</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {company.techStack.map((tech, i) => (
                <span key={i}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-neon-cyan/5 text-neon-cyan border border-neon-cyan/10 hover:bg-neon-cyan/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <div className="relative rounded-2xl p-8 md:p-10 bg-gradient-to-br from-electric-violet/10 via-neon-cyan/5 to-transparent border border-electric-violet/10 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-electric-violet/5 rounded-full blur-3xl" />
            <div className="relative">
              <span className="text-5xl block mb-4 text-electric-violet opacity-50">"</span>
              <p className="text-lg md:text-xl text-text-primary leading-relaxed italic mb-6">{company.testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-electric-violet flex items-center justify-center text-white font-bold text-sm">
                  {company.testimonial.person.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">{company.testimonial.person}</p>
                  <p className="text-xs text-text-muted">{company.testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold text-text-primary mb-6">Explore More Case Studies</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedWorks.map(related => (
              <Link key={related.id} to={`/work/${related.slug}`}
                className="portfolio-card rounded-xl p-5 hover:border-neon-cyan/20 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-surface/80 p-1.5 border border-neon-cyan/10 flex items-center justify-center">
                    <img src={related.logo} alt={related.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate group-hover:text-neon-cyan transition-colors">{related.name}</p>
                    <p className="text-xs text-text-muted truncate">{related.industry}</p>
                  </div>
                  <svg className="w-4 h-4 text-text-muted group-hover:text-neon-cyan group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <p className="text-xs text-text-muted line-clamp-2">{related.challenge.slice(0, 120)}...</p>
              </Link>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="rounded-2xl p-8 glass-section max-w-2xl mx-auto text-center">
            <span className="text-3xl block mb-3">🚀</span>
            <h2 className="text-2xl font-bold text-text-primary mb-3">Want Results Like {company.name}?</h2>
            <p className="text-text-muted text-sm mb-6 max-w-lg mx-auto">Every business is unique, but the approach is proven. Let's discuss how we can help your business achieve similar growth.</p>
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
        </motion.section>

      </div>
    </div>
  );
}
