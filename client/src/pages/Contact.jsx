import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api'
import { companyInfo } from '../data/companyInfo'

/* ============================================================
   CONTACT PAGE
   Sections: Contact form, company details, Google Maps embed
   ============================================================ */

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus({ type: '', text: '' })
    try {
      await api.post('/contact', form)
      setStatus({ type: 'success', text: 'Message sent! We\'ll get back to you within 24 hours.' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus({ type: 'error', text: err.response?.data?.message || 'Failed to send message. Try again.' })
    } finally {
      setSubmitting(false)
    }
  }

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
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-brand-muted max-w-xl mx-auto text-lg">
          Have a project in mind? We'd love to hear about it.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>

          {/* Status message */}
          {status.text && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                status.type === 'success'
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {status.text}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-brand-muted mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-brand-text focus:border-brand-cyan focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm text-brand-muted mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-brand-text focus:border-brand-cyan focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-brand-muted mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-brand-text focus:border-brand-cyan focus:outline-none transition-colors"
                placeholder="Project inquiry"
              />
            </div>
            <div>
              <label className="block text-sm text-brand-muted mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-brand-text focus:border-brand-cyan focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-brand-cyan text-brand-bg font-semibold rounded-xl hover:glow-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </motion.form>

        {/* Contact Details + Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Company details */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">Contact Details</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-brand-cyan mt-0.5">📍</span>
                <div>
                  <p className="font-medium text-brand-text">Address</p>
                  <p className="text-brand-muted">
                    {companyInfo?.address || 'Kolkata, West Bengal, India'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand-cyan mt-0.5">📧</span>
                <div>
                  <p className="font-medium text-brand-text">Email</p>
                  <p className="text-brand-muted">
                    {companyInfo?.email || 'hello@calcuttanode.com'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand-cyan mt-0.5">📱</span>
                <div>
                  <p className="font-medium text-brand-text">Phone</p>
                  <p className="text-brand-muted">
                    {companyInfo?.phone || '+91 98765 43210'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand-cyan mt-0.5">💬</span>
                <div>
                  <p className="font-medium text-brand-text">WhatsApp</p>
                  <p className="text-brand-muted">
                    {companyInfo?.whatsapp || '+91 98765 43210'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps placeholder */}
          <div className="glass rounded-2xl overflow-hidden h-64">
            <iframe
              title="Calcutta Node Location"
              src={companyInfo?.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.7071799156!2d88.20000000000001!3d22.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db490d0b35%3A0x407f180dcb8b2d0!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890'}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8)' }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
