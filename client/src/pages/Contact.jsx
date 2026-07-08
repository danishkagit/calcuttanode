import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import companyInfo from '../data/companyInfo';
import ParticleField from '../components/common/ParticleField';

const subjects = [
  'General Inquiry',
  'Technical Support',
  'Website Development',
  'Digital Marketing',
  'Design (UI/UX / Graphics)',
  'Data Recovery',
  'Subscription / Membership',
  'Partnership / Collaboration',
  'Feedback / Suggestion',
  'Other',
];

const businessHours = [
  { day: 'AI Chat Support', hours: '24/7 — Instant' },
  { day: 'Human Response', hours: 'Within 4 hours' },
  { day: 'Weekend Support', hours: 'Available (reduced staff)' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post('/auth/contact', form);
      setSent(true);
    } catch {
      alert('Failed to send message. Please email us directly at ' + companyInfo.email);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <ParticleField count={35} speed={0.15} color="#593C5F" />

      <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="inline-block text-5xl mb-4"
          >
            📬
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-4">Contact Us</h1>
          <p className="text-lg text-text-muted">Have a question or need help? We're just a message away.</p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 inline-flex items-center gap-2 text-sm bg-neon-cyan/10 text-neon-cyan px-4 py-2 rounded-full border border-neon-cyan/20"
          >
            <span>⚡</span>
            <span>Most inquiries get a response within 4 hours</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div className="space-y-5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {[
              { icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z', icon2: 'M12 10a3 3 0 100-6 3 3 0 000 6z', label: 'Address', value: companyInfo.address },
              { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: companyInfo.email, href: `mailto:${companyInfo.email}` },
              { icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z', label: 'Phone', value: companyInfo.phone, href: `tel:${companyInfo.phone}` },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4, y: -2 }}
                className="flex items-start gap-3 p-4 rounded-xl border border-electric-violet/10 bg-surface/30 hover:border-neon-cyan/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-neon-cyan/20 transition-all duration-300">
                  <svg className="w-5 h-5 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d={item.icon}/>{item.icon2 && <path d={item.icon2}/>}
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-0.5">{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="text-text-primary text-sm hover:text-neon-cyan transition-colors">{item.value}</a>
                    : <p className="text-text-primary text-sm">{item.value}</p>
                  }
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="p-4 rounded-xl border border-electric-violet/10 bg-surface/30 hover:border-neon-cyan/30 transition-all duration-300"
            >
              <h3 className="text-text-primary font-semibold text-sm mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Availability
              </h3>
              <div className="space-y-2">
                {businessHours.map((b, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-text-muted">{b.day}</span>
                    <span className="text-xs font-medium text-neon-cyan">{b.hours}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted mt-3 border-t border-electric-violet/10 pt-3">🌐 Available worldwide — time zone friendly</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                href={`https://wa.me/91${companyInfo.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-200 text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </motion.a>
              {['instagram', 'facebook'].map((s) => (
                <motion.a key={s} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  href={`https://${s}.com/${companyInfo.socials?.[s] || '#'}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-electric-violet/20 text-text-muted hover:text-neon-cyan hover:border-neon-cyan/40 transition-all duration-200 text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    {s === 'instagram'
                      ? <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      : <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    }
                  </svg>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="rounded-2xl p-6 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30 backdrop-blur-sm">
              {sent ? (
                <motion.div className="text-center py-10" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-neon-cyan/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <svg className="w-8 h-8 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  </motion.div>
                  <p className="text-neon-cyan text-lg font-medium">Message sent!</p>
                  <p className="text-text-muted text-sm mt-1">We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                    className="mt-4 text-sm text-neon-cyan hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-text-muted mb-1.5 block font-medium">Your Name *</label>
                    <input type="text" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                      className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-muted mb-1.5 block font-medium">Your Email *</label>
                    <input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                      className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-muted mb-1.5 block font-medium">Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-muted mb-1.5 block font-medium">Subject</label>
                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/20 transition-all"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-text-muted mb-1.5 block font-medium">Message *</label>
                    <textarea placeholder="Tell us how we can help you..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5}
                      className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/20 transition-colors resize-none"
                    />
                  </div>
                  <motion.button type="submit" disabled={sending}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand-gradient text-white py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 disabled:opacity-70"
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                  </motion.button>
                  <p className="text-xs text-text-muted text-center">We typically respond within 4 hours. AI support is available 24/7.</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>


      </div>
    </div>
  );
}
