import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import ParticleField from '../components/common/ParticleField';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, setUser } = useAuth();
  const navigate = useNavigate();
  const btnRef = useRef(null);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    const initGSI = () => {
      if (!window.google || !btnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            const { data } = await api.post('/auth/google', { credential: response.credential });
            localStorage.setItem('accessToken', data.accessToken);
            setUser(data.user);
            navigate('/dashboard');
          } catch (err) {
            setError(err.response?.data?.message || 'Google sign-in failed');
          }
        },
      });
      window.google.accounts.id.renderButton(btnRef.current, { theme: 'outline', size: 'large', type: 'standard', shape: 'pill', width: 280 });
    };
    if (window.google) { initGSI(); return; }
    const check = setInterval(() => {
      if (window.google) { clearInterval(check); initGSI(); }
    }, 200);
    return () => clearInterval(check);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <ParticleField count={25} speed={0.15} color="#593C5F" />

      <div className="max-w-md w-full mx-auto px-4 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="text-4xl text-center mb-4"
          >
            👋
          </motion.div>
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent">Welcome Back</h1>
          <p className="text-text-muted text-center text-sm mb-8">Sign in to your account</p>

          <motion.div
            whileHover={{ boxShadow: '0 0 30px rgba(126,187,197,0.08)' }}
            className="rounded-2xl p-8 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30 backdrop-blur-sm"
          >
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 mb-4 flex items-center gap-2"
              >
                <span>⚠️</span>
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-text-muted mb-1.5 block font-medium">Email</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/20 transition-all"
                />
              </div>
              <div>
                <label className="text-sm text-text-muted mb-1.5 block font-medium">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required
                    className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 pr-10 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/20 transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>
              <motion.button type="submit"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full bg-brand-gradient text-white py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20"
              >
                Sign In
              </motion.button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <hr className="flex-1 border-electric-violet/20" />
              <span className="text-text-muted text-sm">or</span>
              <hr className="flex-1 border-electric-violet/20" />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} className="flex justify-center">
              {GOOGLE_CLIENT_ID && <div ref={btnRef}></div>}
            </motion.div>

            <p className="text-text-muted text-sm text-center mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-neon-cyan hover:text-neon-cyan/80 transition-colors font-medium">Create one</Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
