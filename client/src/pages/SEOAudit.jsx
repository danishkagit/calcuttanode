import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleField from '../components/common/ParticleField';

const tiers = [
  {
    name: 'Free Audit',
    price: '₹0',
    badge: 'DIY',
    icon: '🔍',
    features: [
      'AI content generator (500 words)',
      'Meta tag analyzer (1 page)',
      'Keyword suggestions (10 terms)',
      'Schema markup generator',
      'Basic readability score',
    ],
    cta: 'Use Free Tools',
    to: '/seo',
  },
  {
    name: 'Starter',
    price: '₹1,999',
    original: '₹3,999',
    badge: 'Popular',
    icon: '📈',
    features: [
      'Everything in Free, plus:',
      'Full technical SEO audit',
      'On-page optimization report',
      'Competitor analysis (3 sites)',
      '30 keyword suggestions',
      'PDF report delivered',
    ],
    cta: 'Book Now',
    to: null,
  },
  {
    name: 'Growth',
    price: '₹4,999',
    original: '₹9,999',
    badge: 'Best Value',
    icon: '🚀',
    features: [
      'Everything in Starter, plus:',
      'Content strategy (5 articles)',
      'Backlink opportunity analysis',
      'Schema implementation',
      'GSC + Analytics setup review',
      '1-month rank tracking',
      '30-min consultation call',
    ],
    cta: 'Book Now',
    to: null,
  },
  {
    name: 'Enterprise',
    price: '₹14,999',
    original: '₹24,999',
    badge: 'Premium',
    icon: '🏢',
    features: [
      'Everything in Growth, plus:',
      'Full site migration support',
      'Custom automation scripts',
      'Ongoing monthly reports',
      'Dedicated Slack/WhatsApp support',
      'Priority delivery (48 hrs)',
    ],
    cta: 'Book Now',
    to: null,
  },
];

const includedTools = [
  { icon: '✍️', name: 'Content Generator', desc: 'AI-powered blog posts, product descriptions, and landing page copy optimized for SEO.' },
  { icon: '🏷️', name: 'Meta Tag Builder', desc: 'Generate title tags, meta descriptions, and OG tags that drive clicks.' },
  { icon: '🔑', name: 'Keyword Suggester', desc: 'Discover high-value keywords with search intent analysis.' },
  { icon: '📊', name: 'Content Analyzer', desc: 'Check readability, keyword density, and SEO score instantly.' },
  { icon: '🔗', name: 'Schema Generator', desc: 'Create JSON-LD structured data for rich snippets.' },
];

export default function SEOAudit() {
  return (
    <div className="relative min-h-screen">
      <ParticleField count={20} speed={0.08} color="#00FFD1" />
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block text-5xl mb-4">📊</motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">SEO Audit</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto mb-4">AI-powered SEO analysis and optimization. From a quick content check to a full site audit — pick your tier.</p>
          <Link to="/seo" className="inline-block border border-neon-cyan/30 text-neon-cyan px-5 py-2 rounded-xl text-sm font-semibold hover:bg-neon-cyan/10 transition-all">
            Try Free SEO Tools First →
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {tiers.map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }}
              className="glass-card rounded-2xl p-5 flex flex-col relative overflow-hidden"
            >
              {tier.badge && (
                <span className="absolute top-3 right-3 bg-brand-gradient text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{tier.badge}</span>
              )}
              <div className="text-3xl mb-2">{tier.icon}</div>
              <h3 className="text-lg font-bold text-text-primary mb-0.5">{tier.name}</h3>
              <div className="mb-3">
                <span className="text-2xl font-bold text-neon-cyan">{tier.price}</span>
                {tier.original && <span className="text-text-muted text-sm line-through ml-2">{tier.original}</span>}
              </div>
              <ul className="space-y-1.5 mb-5 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="text-text-muted text-xs flex items-start gap-2">
                    <span className="text-neon-cyan mt-0.5 shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              {tier.to ? (
                <Link to={tier.to} className="block text-center bg-brand-gradient text-white py-2.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-neon-cyan/25">
                  {tier.cta}
                </Link>
              ) : (
                <a href="https://calendly.com/danishshoaib/30min" target="_blank" rel="noopener noreferrer"
                  className="block text-center bg-brand-gradient text-white py-2.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-neon-cyan/25"
                >
                  {tier.cta}
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-8">
          <h2 className="text-xl font-bold text-text-primary text-center mb-5">Free SEO Tools Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {includedTools.map(tool => (
              <div key={tool.name} className="glass-card rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl shrink-0">{tool.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">{tool.name}</h3>
                  <p className="text-xs text-text-muted">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center">
          <p className="text-text-muted text-sm mb-3">Not sure which tier fits? Book a free 15-min discovery call.</p>
          <a href="https://calendly.com/danishshoaib/30min" target="_blank" rel="noopener noreferrer"
            className="inline-block bg-brand-gradient text-white px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-neon-cyan/25"
          >
            Book Free Call
          </a>
        </motion.div>
      </div>
    </div>
  );
}
