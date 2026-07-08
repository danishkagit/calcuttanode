import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import companyInfo from '../../data/companyInfo';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function Footer() {
  return (
    <footer className="relative bg-surface/60 border-t border-electric-violet/20 mt-auto overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <motion.div className="sm:col-span-2 md:col-span-1" {...fadeUp}>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-white rounded-lg p-0.5 flex items-center justify-center"><img src={logo} alt="Calcutta Node." className="h-7 w-auto" /></div>
            <span className="text-neon-cyan font-bold">Calcutta Node.</span>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">IT Services & Digital Growth Agency based in Kolkata, India. Serving clients worldwide since 2023.</p>
          <div className="flex gap-3 mt-4">
            {[
              { href: `https://wa.me/91${companyInfo.phone.replace(/\D/g, '')}`, path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
              { href: 'https://instagram.com/' + companyInfo.socials.instagram, path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
              { href: 'https://facebook.com/' + companyInfo.socials.facebook, path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
            ].map((s, i) => (
              <motion.a key={i} whileHover={{ scale: 1.1, y: -2 }} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                  i === 0 ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50' : 'bg-white/5 border-electric-violet/20 text-text-muted hover:text-neon-cyan hover:border-neon-cyan/40'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d={s.path}/></svg>
              </motion.a>
            ))}
          </div>
          <motion.a href="/ai"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-neon-cyan/70 hover:text-neon-cyan transition-colors"
          >
            🤖 Try AI Support
          </motion.a>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.05 }}>
          <h4 className="text-text-primary font-semibold mb-4 text-sm">Quick Links</h4>
          <div className="flex flex-col gap-2.5 text-sm">
            {[
              { label: 'Home', to: '/' },
              { label: 'Our Work', to: '/work' },
              { label: 'AI Chat', to: '/ai' },
              { label: 'Pricing', to: '/pricing' },
              { label: 'About', to: '/about' },
              { label: 'Contact', to: '/contact' },
              { label: 'Free Tools', to: '/tools' },
              { label: 'Mobile App', to: '/app' },
              { label: 'Blog', to: '/blogs' },
            ].map(({ label, to }) => (
              <Link key={label} to={to}
                className="text-text-muted hover:text-neon-cyan transition-colors duration-200 hover:translate-x-1 inline-block"
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
          <h4 className="text-text-primary font-semibold mb-4 text-sm">Services</h4>
          <div className="flex flex-col gap-2.5 text-sm">
            {['Website Development', 'Network Issues', 'Remote Support', 'Digital Marketing', 'UI/UX Design', 'Data Recovery', 'Membership Plans', 'Digital Products'].map((s) => (
              <Link key={s} to={s === 'Membership Plans' ? '/plans' : s === 'Digital Products' ? '/products' : '/pricing'}
                className="text-text-muted hover:text-neon-cyan transition-colors duration-200 hover:translate-x-1 inline-block"
              >
                {s}
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
          <h4 className="text-text-primary font-semibold mb-4 text-sm">Contact</h4>
          <div className="space-y-3 text-sm text-text-muted">
            <motion.div whileHover={{ x: 2 }} className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span className="text-xs sm:text-sm">Kolkata, India</span>
            </motion.div>
            <motion.div whileHover={{ x: 2 }} className="flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href={`mailto:${companyInfo.email}`} className="hover:text-neon-cyan transition-colors text-xs sm:text-sm break-all">{companyInfo.email}</a>
            </motion.div>
            <motion.div whileHover={{ x: 2 }} className="flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              <span className="text-xs sm:text-sm">{companyInfo.phone}</span>
            </motion.div>
            <motion.div whileHover={{ x: 2 }} className="flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span className="text-xs sm:text-sm">24/7 AI Support · Human response within 4 hrs</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-electric-violet/10 py-4 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
        <p className="text-text-muted text-xs">&copy; {new Date().getFullYear()} Calcutta Node. All rights reserved. | Kolkata, India</p>
      </div>
    </footer>
  );
}
