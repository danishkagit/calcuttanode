import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

/* ============================================================
   REGISTER PAGE
   Name + email + phone + password form → calls AuthContext.register()
   Redirects to /dashboard on success
   ============================================================ */

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Client-side password match check
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters with uppercase, lowercase, number, and special character.')
      return
    }

    setSubmitting(true)
    try {
      await register({ name: form.name, email: form.email, phone: form.phone, password: form.password, confirmPassword: form.confirmPassword })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-center mb-2">
            Create <span className="gradient-text">Account</span>
          </h1>
          <p className="text-brand-muted text-center text-sm mb-8">
            Join Calcutta Node to access your dashboard
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-brand-muted mb-1">Full Name</label>
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
              <label className="block text-sm text-brand-muted mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-brand-text focus:border-brand-cyan focus:outline-none transition-colors"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm text-brand-muted mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-brand-text focus:border-brand-cyan focus:outline-none transition-colors"
                placeholder="Min 6 characters"
              />
            </div>
            <div>
              <label className="block text-sm text-brand-muted mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-brand-text focus:border-brand-cyan focus:outline-none transition-colors"
                placeholder="Re-enter password"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-brand-violet text-white font-semibold rounded-xl hover:glow-violet transition-all duration-300 disabled:opacity-50"
            >
              {submitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-brand-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-cyan hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
