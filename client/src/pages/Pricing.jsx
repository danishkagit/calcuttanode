import { motion } from 'framer-motion'
import { services } from '../data/services'

/* ============================================================
   PRICING PAGE
   Displays service tables from services.js data.
   NOTE: Prices must be updated manually by the site owner
   via MANUAL.md → data/services.js
   ============================================================ */

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Transparent <span className="gradient-text">Pricing</span>
        </h1>
        <p className="text-brand-muted max-w-xl mx-auto text-lg">
          Clear, upfront pricing for every service. No hidden fees.
        </p>
        <p className="text-xs text-brand-muted mt-2 italic">
          Prices are indicative — final quote provided after consultation.
        </p>
      </motion.div>

      {/* Services pricing grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.id || service.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass rounded-2xl p-6 flex flex-col"
          >
            <div className="text-3xl mb-3">{service.icon || '⚡'}</div>
            <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
            <p className="text-sm text-brand-muted mb-4 flex-1 leading-relaxed">
              {service.description?.slice(0, 150) || 'Professional service tailored to your needs.'}
            </p>

            {/* Pricing tiers */}
            {service.tiers ? (
              <div className="space-y-3">
                {service.tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-brand-bg/50 border border-white/5"
                  >
                    <div>
                      <p className="text-sm font-medium">{tier.name}</p>
                      <p className="text-xs text-brand-muted">{tier.description || ''}</p>
                    </div>
                    <span className="text-brand-cyan font-semibold whitespace-nowrap">
                      {tier.price || 'Contact'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-brand-bg/50 border border-white/5">
                <p className="text-sm text-brand-muted">Starting from</p>
                <p className="text-xl font-bold text-brand-cyan">
                  {service.price || 'Contact for Quote'}
                </p>
              </div>
            )}

            {/* CTA */}
            <a
              href="/contact"
              className="mt-4 text-center py-2 border border-brand-violet/30 text-brand-violet text-sm rounded-xl hover:bg-brand-violet/10 transition-all"
            >
              Get a Quote
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
