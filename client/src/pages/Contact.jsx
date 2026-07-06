import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import companyInfo from '../data/companyInfo';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/contact', form);
      setSent(true);
    } catch {
      alert('Failed to send message. Please email us directly.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-4">Contact Us</h1>
        <p className="text-lg text-text-muted">Have a question or need help? We're just a message away.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div className="space-y-5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          {[
            { icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z', label: 'Address', value: companyInfo.address },
            { icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', label: 'Email', value: companyInfo.email, href: `mailto:${companyInfo.email}` },
            { icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z', label: 'Phone', value: companyInfo.phone },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-electric-violet/10 bg-surface/30">
              <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            {['instagram', 'facebook'].map((s) => (
              <a key={s} href={`https://${s}.com/${companyInfo.socials?.[s] || '#'}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-electric-violet/20 text-text-muted hover:text-neon-cyan hover:border-neon-cyan/40 transition-all duration-200 text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  {s === 'instagram'
                    ? <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    : <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  }
                </svg>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="rounded-2xl p-6 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30">
            {sent ? (
              <motion.div className="text-center py-10" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                <div className="w-16 h-16 rounded-full bg-neon-cyan/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p className="text-neon-cyan text-lg font-medium">Message sent!</p>
                <p className="text-text-muted text-sm mt-1">We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-text-muted mb-1 block">Your Name</label>
                  <input type="text" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                    className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-muted mb-1 block">Your Email</label>
                  <input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                    className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-muted mb-1 block">Message</label>
                  <textarea placeholder="How can we help you?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5}
                    className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                  />
                </div>
                <button type="submit"
                  className="w-full bg-brand-gradient text-white py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div className="mt-8 rounded-xl overflow-hidden border border-electric-violet/20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <iframe
          src="https://www.google.com/maps?q=Champdani+Hooghly+West+Bengal&output=embed"
          width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy"
          title="Calcutta Node. Location"
        />
      </motion.div>
    </div>
  );
}
