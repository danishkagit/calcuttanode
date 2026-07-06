import { motion } from 'framer-motion';
import companyInfo from '../data/companyInfo';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { duration: 0.5 } };

const milestones = [
  { year: 'Founded', text: 'Started operations in Champdani, Hooghly with a mission to make IT services accessible.' },
  { year: 'Growth', text: 'Expanded across 6 service categories — from web development to digital marketing.' },
  { year: 'Today', text: 'Trusted by 12+ clients with 36+ successful projects delivered.' },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-4">About Calcutta Node.</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">IT Services & Digital Growth Agency based in Champdani, Hooghly, West Bengal</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div className="rounded-2xl p-6 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30" {...fadeUp}>
          <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-3">Who We Are</h2>
          <p className="text-text-muted leading-relaxed">
            Calcutta Node. is an IT services and digital growth agency. We provide remote IT support, data recovery, web development,
            UI/UX design, graphics design, digital marketing, performance marketing, and technical troubleshooting services.
          </p>
        </motion.div>

        <motion.div className="rounded-2xl p-6 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30" {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="w-12 h-12 rounded-xl bg-electric-violet/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-electric-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-3">Our Mission</h2>
          <p className="text-text-muted leading-relaxed">
            Founded by <span className="text-neon-cyan font-medium">Danish Shoaib</span>, our mission is to make professional IT support
            and digital services accessible and affordable for everyone — from individuals to growing businesses.
          </p>
        </motion.div>
      </div>

      <motion.div className="mb-12" {...fadeUp}>
        <h2 className="text-2xl font-bold text-text-primary mb-6 border-l-4 border-neon-cyan pl-4">Our Journey</h2>
        <div className="space-y-4">
          {milestones.map((m, i) => (
            <motion.div key={m.year}
              className="flex items-start gap-4 p-4 rounded-xl border border-electric-violet/10 bg-surface/30"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className="shrink-0 w-20 text-sm font-bold text-neon-cyan pt-0.5">{m.year}</span>
              <div className="w-px self-stretch bg-electric-violet/20" />
              <p className="text-text-muted text-sm leading-relaxed">{m.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="rounded-2xl p-6 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30" {...fadeUp}>
        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Contact Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-3 rounded-lg bg-white/5 border border-electric-violet/10">
            <p className="text-text-muted mb-1">Address</p>
            <p className="text-text-primary">{companyInfo.address}</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-electric-violet/10">
            <p className="text-text-muted mb-1">Email</p>
            <p className="text-text-primary">{companyInfo.email}</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-electric-violet/10">
            <p className="text-text-muted mb-1">Phone</p>
            <p className="text-text-primary">{companyInfo.phone}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
