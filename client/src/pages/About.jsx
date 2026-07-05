import { motion } from 'framer-motion'
import { companyInfo } from '../data/companyInfo'

/* ============================================================
   ABOUT PAGE
   Sections: Company story, mission, founder, timeline
   ============================================================ */

const timeline = [
  { year: '2020', title: 'Founded', desc: 'Calcutta Node started as a freelance web dev shop.' },
  { year: '2021', title: 'First Major Client', desc: 'Delivered enterprise SaaS for a fintech startup.' },
  { year: '2022', title: 'Team Grew', desc: 'Expanded to 10+ members across design, dev, and marketing.' },
  { year: '2023', title: 'AI Integration', desc: 'Started offering AI automation and chatbot services.' },
  { year: '2024', title: 'Global Clients', desc: 'Now serving clients across 10+ countries.' },
]

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          About <span className="gradient-text">Calcutta Node</span>
        </h1>
        <p className="text-brand-muted max-w-2xl mx-auto text-lg">
          We are a team of developers, designers, and strategists building
          digital products that make a difference.
        </p>
      </motion.div>

      {/* Company Story */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-8 mb-12"
      >
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-brand-muted leading-relaxed mb-4">
          {companyInfo?.story ||
            'Calcutta Node was born from a passion for technology and a desire to make quality IT services accessible to businesses of all sizes. Based in Kolkata, India, we combine local talent with global standards.'}
        </p>
        <p className="text-brand-muted leading-relaxed">
          {companyInfo?.storyContinued ||
            'What started as a one-person freelance operation has grown into a full-service IT agency, delivering projects across web development, mobile apps, AI automation, and digital marketing.'}
        </p>
      </motion.section>

      {/* Mission */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-8 mb-12"
      >
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-brand-muted leading-relaxed">
          {companyInfo?.mission ||
            'To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation. We believe great software should be accessible, not exclusive.'}
        </p>
      </motion.section>

      {/* Founder */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-8 mb-12"
      >
        <h2 className="text-2xl font-bold mb-4">Meet the Founder</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Placeholder avatar */}
          <div className="w-24 h-24 rounded-full bg-brand-violet/20 flex items-center justify-center text-3xl font-bold text-brand-violet">
            {companyInfo?.founderInitials || 'DS'}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">
              {companyInfo?.founderName || 'Danish Shoaib'}
            </h3>
            <p className="text-brand-cyan text-sm mb-2">Founder & Lead Developer</p>
            <p className="text-brand-muted text-sm leading-relaxed">
              {companyInfo?.founderBio ||
                'Full-stack developer with 5+ years of experience building web apps, mobile apps, and AI solutions. Passionate about clean code and scalable architecture.'}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-brand-violet/30" />
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative flex items-center ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Dot on timeline */}
                <div className="absolute left-4 sm:left-1/2 w-3 h-3 bg-brand-cyan rounded-full -translate-x-1/2 z-10" />
                {/* Content card */}
                <div className={`ml-10 sm:ml-0 sm:w-5/12 ${i % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'}`}>
                  <div className="glass rounded-xl p-4">
                    <span className="text-brand-cyan text-sm font-semibold">{item.year}</span>
                    <h3 className="font-semibold mt-1">{item.title}</h3>
                    <p className="text-brand-muted text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
