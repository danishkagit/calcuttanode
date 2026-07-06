import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, setUser } = useAuth();
  const navigate = useNavigate();
  const btnRef = useRef(null);

  useEffect(() => {
    const initGSI = () => {
      if (!window.google || !btnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
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
    <div className="max-w-md mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent">Welcome Back</h1>
        <p className="text-text-muted text-center text-sm mb-8">Sign in to your account</p>

        <div className="rounded-2xl p-8 border border-electric-violet/20 bg-gradient-to-b from-surface/80 to-surface/30 backdrop-blur-sm">
          {error && (
            <motion.div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 mb-4" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <p className="text-red-400 text-sm text-center">{error}</p>
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-text-muted mb-1 block">Email</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-text-muted mb-1 block">Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>
            <button type="submit"
              className="w-full bg-brand-gradient text-white py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <hr className="flex-1 border-electric-violet/20" />
            <span className="text-text-muted text-sm">or</span>
            <hr className="flex-1 border-electric-violet/20" />
          </div>

          <div ref={btnRef} className="flex justify-center"></div>

          <p className="text-text-muted text-sm text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-neon-cyan hover:text-neon-cyan/80 transition-colors font-medium">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
