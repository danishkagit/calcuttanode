import { motion } from 'framer-motion';
import ParticleField from '../components/common/ParticleField';

const DOWNLOAD_URL = 'https://github.com/danishkagit/calcuttanode/releases/download/v1.0.0/calcuttanode-app.apk';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { duration: 0.5 } };

const features = [
  { icon: '📱', title: 'Browse Services', desc: 'Explore all IT services, website packages, and digital products with real-time pricing.' },
  { icon: '🤖', title: 'AI Chat Assistant', desc: 'Get instant answers from 4 free AI models — DeepSeek, MiMo, North, and Nemotron.' },
  { icon: '📦', title: 'Digital Products', desc: 'Purchase templates, scripts, and tools directly from your phone.' },
  { icon: '📋', title: 'Track Orders', desc: 'Monitor your service requests and order status in real time.' },
  { icon: '💳', title: 'Secure Payments', desc: 'Pay via Razorpay, UPI, or bank transfer — all within the app.' },
  { icon: '⭐', title: 'Loyalty Rewards', desc: 'Earn points on every purchase and redeem them for discounts.' },
];

const appScreens = [
  { label: 'Home', color: 'from-neon-cyan/20 to-electric-violet/10', icon: '🏠' },
  { label: 'Services', color: 'from-electric-violet/20 to-neon-cyan/10', icon: '📦' },
  { label: 'AI Chat', color: 'from-neon-cyan/20 to-electric-violet/10', icon: '🤖' },
  { label: 'Orders', color: 'from-electric-violet/20 to-neon-cyan/10', icon: '📋' },
];

export default function MobileApp() {
  return (
    <div className="relative min-h-screen">
      <ParticleField count={25} speed={0.15} />

      {/* Hero */}
      <section className="relative pt-16 pb-8 md:pt-24 md:pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Text */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="inline-block text-xs font-semibold text-electric-violet bg-electric-violet/15 px-4 py-1.5 rounded-full mb-5 border border-electric-violet/30"
            >
              📱 Now Available
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-neon-cyan via-electric-violet to-neon-cyan bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                Calcutta Node.
              </span>
              <br />
              <span className="text-text-primary">In Your Pocket</span>
            </h1>
            <p className="text-base md:text-lg text-text-muted max-w-lg mb-8 leading-relaxed">
              Your complete IT services & digital growth agency — right on your phone. Browse, book, pay, and track everything in real time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <motion.a
                href={DOWNLOAD_URL}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 bg-brand-gradient text-white px-6 py-3.5 rounded-xl font-semibold text-base hover:shadow-lg hover:shadow-neon-cyan/20 transition-all"
              >
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 16.435c.723.99 1.154 2.134 1.154 3.334 0 2.36-1.847 3.878-4.09 3.878-1.467 0-2.628-.816-3.887-.816-1.31 0-2.498.828-3.862.828-2.474 0-4.838-2.097-4.838-5.023 0-2.17.847-4.18 2.247-5.623a5.17 5.17 0 013.313-1.602c.736-.058 1.43.036 2.083.17.343.07.68.166 1.029.268.145.042.436.13.666.13.161 0 .414-.064.63-.12a8.59 8.59 0 011.422-.256 5.29 5.29 0 014.163 2.235l.01.014-.222.13a3.984 3.984 0 00-1.854 3.416c0 1.487.564 2.706 1.668 3.543l.077.058zM13.849 3.512c.648-.834 1.047-1.942 1.047-3.052 0-.16-.009-.322-.026-.46-1.14.09-2.23.558-3.088 1.34-.592.54-1.084 1.285-1.318 2.067-.093.31-.146.624-.146.93a2.6 2.6 0 00.024.388c.055.006.111.01.17.01a4.52 4.52 0 003.337-1.223z"/></svg>
                Download for Android
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 border border-neon-cyan/40 text-neon-cyan px-6 py-3.5 rounded-xl font-semibold text-base hover:bg-neon-cyan/10 transition-all opacity-60 cursor-not-allowed"
                title="Coming soon"
              >
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.67-.78 1.77-1.28 2.67-1.2.1 1.04-.3 2.08-1 2.83-.65.7-1.71 1.2-2.66 1.12-.1-1.05.32-2.08 1-2.83z"/></svg>
                iOS (Coming Soon)
              </motion.a>
            </div>
            <div className="flex items-center gap-5 text-xs text-text-muted/60">
              <span>✅ Free to download</span>
              <span>🔒 Secure</span>
              <span>⚡ ~84MB</span>
            </div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-64 md:w-72">
              {/* Phone Frame */}
              <div className="relative mx-auto w-60 md:w-68 h-[480px] md:h-[520px] rounded-[2.5rem] border-2 border-electric-violet/20 bg-background shadow-2xl shadow-neon-cyan/10 overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-background rounded-b-2xl z-10 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-text-muted" />
                  <div className="w-16 h-1.5 rounded-full bg-text-muted" />
                </div>
                {/* Status Bar */}
                <div className="pt-8 px-4 pb-2 flex items-center justify-between text-[10px] text-text-muted/60">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-2 border border-current rounded-sm" />
                    <span className="w-3 h-2 border border-current rounded-sm" />
                    <span className="w-4 h-2 bg-current rounded-sm" />
                  </div>
                </div>
                {/* App Header */}
                <div className="px-4 pb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-neon-cyan to-electric-violet flex items-center justify-center text-[10px] font-bold text-white">CN</div>
                    <span className="text-xs font-semibold text-text-primary">Calcutta Node.</span>
                  </div>
                  <div className="flex gap-1.5">
                    {['All', 'Services', 'Products'].map((t) => (
                      <span key={t} className={`text-[10px] px-2.5 py-1 rounded-full ${t === 'All' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-surface/50 text-text-muted'}`}>{t}</span>
                    ))}
                  </div>
                </div>
                {/* App Screens Content */}
                <div className="px-4 space-y-2.5 overflow-y-auto max-h-[340px]">
                  {appScreens.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={`p-3 rounded-xl bg-gradient-to-r ${s.color} border border-white/5`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{s.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-text-primary">{s.label}</div>
                          <div className="h-1.5 w-3/4 mt-1 rounded-full bg-white/5" />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full border border-neon-cyan/40" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {/* Bottom tab bar indicator */}
                  <div className="pt-2 pb-1 flex justify-around border-t border-white/5">
                    {['🏠', '📦', '🤖', '📋', '👤'].map((icon, i) => (
                      <span key={i} className={`text-sm ${i === 0 ? 'opacity-100' : 'opacity-40'}`}>{icon}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Glow behind phone */}
              <div className="absolute -inset-4 bg-gradient-to-br from-neon-cyan/10 via-electric-violet/5 to-transparent rounded-[3rem] blur-2xl -z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <motion.div {...fadeUp} className="max-w-4xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl glass-card">
          {[
            { value: '4', label: 'Free AI Models' },
            { value: '6', label: 'Service Categories' },
            { value: '99%', label: 'Uptime' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent">{s.value}</div>
              <div className="text-[10px] md:text-xs text-text-muted/60 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <motion.section className="py-12 md:py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-8 md:mb-10" {...fadeUp}>
            <span className="text-sm font-medium text-neon-cyan bg-neon-cyan/10 px-4 py-1.5 rounded-full border border-neon-cyan/20">App Features</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-4">Everything on the Go</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {features.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl glass-card text-center"
              >
                <span className="text-3xl block mb-3">{f.icon}</span>
                <h3 className="text-text-primary font-semibold mb-1 text-sm">{f.title}</h3>
                <p className="text-text-muted text-xs">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Use Website Directly */}
      <motion.section className="py-12 md:py-16 px-4 relative" {...fadeUp}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl p-6 md:p-8 glass-section relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
            <span className="text-3xl md:text-4xl block mb-4">📲</span>
            <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-3">Use the Website Directly</h2>
            <p className="text-sm md:text-base text-text-muted mb-6 max-w-lg mx-auto">
              No app? No problem. The full Calcutta Node. experience is available right in your mobile browser. 
              All features, same account, same data — synced instantly.
            </p>
            <div className="flex gap-3 justify-center flex-wrap text-sm text-text-muted">
              <span className="px-3 py-1.5 rounded-lg bg-surface/50 border border-electric-violet/10">Same login</span>
              <span className="px-3 py-1.5 rounded-lg bg-surface/50 border border-electric-violet/10">Same orders</span>
              <span className="px-3 py-1.5 rounded-lg bg-surface/50 border border-electric-violet/10">Same wallet</span>
              <span className="px-3 py-1.5 rounded-lg bg-surface/50 border border-electric-violet/10">Real-time sync</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Download CTA */}
      <motion.section className="py-12 md:py-16 px-4 text-center relative" {...fadeUp}>
        <div className="max-w-xl mx-auto">
          <div className="p-6 md:p-8 rounded-2xl glass-section relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-cyan/[0.03] via-transparent to-electric-violet/[0.03] pointer-events-none" />
            <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-2">Get the App</h2>
            <p className="text-sm text-text-muted mb-6">Download the Android APK directly. No Play Store required.</p>
            <motion.a
              href={DOWNLOAD_URL}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-brand-gradient text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-neon-cyan/20 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              Download APK
            </motion.a>
            <p className="text-xs text-text-muted/50 mt-4">Version 1.0.0 — ~84MB — Requires Android 7.0+</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
