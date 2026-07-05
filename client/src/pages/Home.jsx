import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../data/services'

/* ============================================================
   HOME PAGE
   Sections:
   1. Hero — animated headline + CTA buttons
   2. Services Grid — 12 service cards
   3. Trust / Social proof — reviews placeholder
   4. Final CTA
   ============================================================ */

/* --- Hero Section ------------------------------------------- */
function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4">
      {/* Animated background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Main headline — animated on mount */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          We Build{' '}
          <span className="gradient-text">Digital Solutions</span>
          <br />
          That Scale
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto mb-10"
        >
          From web development to AI automation — Calcutta Node delivers
          end-to-end IT services for startups and enterprises.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/pricing"
            className="px-8 py-4 bg-brand-cyan text-brand-bg font-semibold rounded-xl hover:glow-cyan transition-all duration-300 text-lg"
          >
            View Pricing
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 border border-brand-violet text-brand-violet font-semibold rounded-xl hover:bg-brand-violet/10 transition-all duration-300 text-lg"
          >
            Book a Session
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* --- Services Grid ------------------------------------------ */
function ServicesGrid() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-4"
        >
          Our <span className="gradient-text">Services</span>
        </motion.h2>
        <p className="text-brand-muted text-center mb-12 max-w-xl mx-auto">
          Full-stack IT solutions — from design to deployment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:border-brand-cyan/30 transition-all duration-300 group cursor-pointer"
            >
              {/* Service icon placeholder — emoji for now */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {service.icon || '⚡'}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-text group-hover:text-brand-cyan transition-colors">
                {service.name}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                {service.shortDescription || service.description?.slice(0, 100) + '...'}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- Trust / CTA Section ------------------------------------ */
function TrustSection() {
  const stats = [
    { label: 'Projects Delivered', value: '50+' },
    { label: 'Happy Clients', value: '30+' },
    { label: 'Years Experience', value: '5+' },
    { label: 'Team Members', value: '10+' },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-brand-muted text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-brand-muted max-w-lg mx-auto mb-8">
            Get a free consultation and quote within 24 hours.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-brand-violet text-white font-semibold rounded-xl hover:glow-violet transition-all duration-300 text-lg"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* --- HOME PAGE COMPOSITE ------------------------------------ */
export default function Home() {
  return (
    <div>
      <Hero />
      <ServicesGrid />
      <TrustSection />
    </div>
  )
}
