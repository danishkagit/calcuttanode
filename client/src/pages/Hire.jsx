import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleField from '../components/common/ParticleField';

const packages = [
  {
    title: 'Website',
    price: '₹9,999',
    original: '₹14,999',
    badge: 'Popular',
    icon: '🌐',
    features: ['5-page responsive site', 'Custom domain + hosting setup', 'Contact form + WhatsApp integration', 'SEO meta tags + OG cards', '1 revision round'],
  },
  {
    title: 'AI Chatbot',
    price: '₹14,999',
    original: '₹24,999',
    badge: 'Best Value',
    icon: '🤖',
    features: ['Custom-trained AI chatbot', 'WhatsApp + web integration', 'Knowledge base setup (PDF/docs)', 'Multi-language support', '1 month support included'],
  },
  {
    title: 'Full-Stack App',
    price: '₹24,999',
    original: '₹39,999',
    badge: 'Premium',
    icon: '⚡',
    features: ['React + Node.js full app', 'User auth + dashboard', 'Razorpay payment integration', 'Admin panel', '3 months support'],
  },
  {
    title: 'AI Automation',
    price: '₹7,999',
    original: '₹12,999',
    badge: 'Quick Setup',
    icon: '🔧',
    features: ['Custom GPT / AI workflow', 'API integration (your tools)', 'Automated email/WhatsApp', 'Data extraction pipeline', '2 weeks delivery'],
  },
  {
    title: 'SEO Audit',
    price: '₹3,999',
    original: '₹7,999',
    badge: 'Starter',
    icon: '📊',
    features: ['Technical SEO audit report', 'Keyword research (30 terms)', 'Content optimization tips', 'Competitor analysis', 'Schema markup suggestions'],
  },
  {
    title: 'Digital Marketing',
    price: '₹5,999/mo',
    original: '₹9,999/mo',
    badge: 'Retainer',
    icon: '📈',
    features: ['Social media management', 'Google ads setup & management', 'WhatsApp broadcast campaigns', 'Monthly performance report', 'Dedicated account manager (me)'],
  },
];

const workSteps = [
  { step: '01', title: 'Discovery Call', desc: '30-min free call to understand your needs' },
  { step: '02', title: 'Proposal', desc: 'Detailed scope, timeline, and fixed-price quote' },
  { step: '03', title: 'Build & Iterate', desc: 'Agile development with weekly updates' },
  { step: '04', title: 'Launch & Support', desc: 'Deploy, handoff, and 30-day post-launch support' },
];

export default function Hire() {
  return (
    <div className="relative min-h-screen">
      <ParticleField count={30} speed={0.1} color="#00FFD1" />
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block text-5xl mb-4">🚀</motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">Hire Me</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">You need something built. I make it happen — websites, chatbots, apps, automation. Solo founder, zero overhead, fast delivery.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {packages.map((pkg, i) => (
            <motion.div key={pkg.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
              className="glass-card rounded-2xl p-6 flex flex-col relative overflow-hidden group"
            >
              {pkg.badge && (
                <span className="absolute top-3 right-3 bg-brand-gradient text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{pkg.badge}</span>
              )}
              <div className="text-3xl mb-3">{pkg.icon}</div>
              <h3 className="text-lg font-bold text-text-primary mb-1">{pkg.title}</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-neon-cyan">{pkg.price}</span>
                {pkg.original && <span className="text-text-muted text-sm line-through ml-2">{pkg.original}</span>}
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {pkg.features.map(f => (
                  <li key={f} className="text-text-muted text-sm flex items-start gap-2">
                    <span className="text-neon-cyan mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="https://calendly.com/danishshoaib/30min" target="_blank" rel="noopener noreferrer"
                className="block text-center bg-brand-gradient text-white py-2.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-neon-cyan/25"
              >
                Book Free Call
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-text-primary text-center mb-6">How It Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {workSteps.map((s, i) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-brand-gradient text-white text-sm font-bold flex items-center justify-center mx-auto mb-2">{s.step}</div>
                <h3 className="text-sm font-semibold text-text-primary">{s.title}</h3>
                <p className="text-xs text-text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center">
          <Link to="/contact" className="inline-block border border-neon-cyan/40 text-neon-cyan px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-neon-cyan/10 transition-all">Or send a custom inquiry →</Link>
        </motion.div>
      </div>
    </div>
  );
}
