import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', referralCode: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) setForm(f => ({ ...f, referralCode: ref }));
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent">Create Account</h1>
        <p className="text-text-muted text-center text-sm mb-8">Join Calcutta Node. today</p>

        <div className="rounded-2xl p-8 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30 backdrop-blur-sm">
          {error && (
            <motion.div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 mb-4" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <p className="text-red-400 text-sm text-center">{error}</p>
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-text-muted mb-1 block">Full Name</label>
              <input type="text" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-text-muted mb-1 block">Email</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-text-muted mb-1 block">Phone</label>
              <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required
                className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-text-muted mb-1 block">Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required
                className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>
            <button type="submit"
              className="w-full bg-brand-gradient text-white py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>
          <p className="text-text-muted text-sm text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-neon-cyan hover:text-neon-cyan/80 transition-colors font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
