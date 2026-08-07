import { motion } from 'framer-motion';

export default function IndependenceBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] p-[1px] shadow-lg mb-6"
    >
      <div className="bg-background px-4 py-3 text-center flex items-center justify-center flex-wrap gap-4">
        <span className="text-text-primary font-bold text-sm">🇮🇳 Independence Day 2026 Special:</span>
        <span className="text-text-primary text-sm">Experience Digital Freedom! Get a Risk-Free Trial on our services.</span>
        <a href="/pricing" className="bg-brand-gradient text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:scale-105 transition-transform">
          Claim Offer
        </a>
      </div>
    </motion.div>
  );
}
