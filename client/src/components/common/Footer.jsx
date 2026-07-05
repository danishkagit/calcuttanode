import { Link } from 'react-router-dom'

/* ============================================================
   FOOTER — company info, quick links, contact, socials
   ============================================================ */

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-brand-surface border-t border-white/5 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/logo.png"
                alt="Calcutta Node"
                className="h-6 w-6"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <span className="text-lg font-bold gradient-text">Calcutta Node</span>
            </div>
            <p className="text-sm text-brand-muted mb-4">
              Professional IT services and digital growth solutions for businesses worldwide.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://instagram.com/danish_shoaib"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-muted hover:text-brand-cyan transition-colors"
              >
                📸 Instagram
              </a>
              <a
                href="https://facebook.com/Dan7860"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-muted hover:text-brand-violet transition-colors"
              >
                📘 Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-brand-text mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-brand-muted hover:text-brand-cyan transition-colors">About Us</Link></li>
              <li><Link to="/pricing" className="text-brand-muted hover:text-brand-cyan transition-colors">Pricing & Services</Link></li>
              <li><Link to="/blog" className="text-brand-muted hover:text-brand-cyan transition-colors">Latest Blogs</Link></li>
              <li><Link to="/tools" className="text-brand-muted hover:text-brand-cyan transition-colors">Free Tools</Link></li>
              <li><Link to="/courses" className="text-brand-muted hover:text-brand-cyan transition-colors">Courses & Training</Link></li>
              <li><Link to="/contact" className="text-brand-muted hover:text-brand-cyan transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-brand-text mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-brand-cyan mt-0.5">📍</span>
                <span className="text-brand-muted">
                  15, Dr. Noorie Lane No. 1, Champdani, Hooghly, West Bengal – 712222
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-cyan">📱</span>
                <span className="text-brand-muted">+91 8584885450</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-violet">📧</span>
                <span className="text-brand-muted">Dnsh00786@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 mt-6">
          <p className="text-sm text-brand-muted text-center">
            &copy; {currentYear} Calcutta Node. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
