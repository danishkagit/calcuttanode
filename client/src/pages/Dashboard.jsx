import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

/* ============================================================
   DASHBOARD PAGE
   Simple user dashboard with sidebar navigation.
   Has its own layout (no Navbar/Footer — handled in App.jsx)
   ============================================================ */

const sidebarLinks = [
  { label: 'Overview', key: 'overview', icon: '📊' },
  { label: 'Wallet', key: 'wallet', icon: '💰' },
  { label: 'Orders', key: 'orders', icon: '📦' },
  { label: 'Settings', key: 'settings', icon: '⚙️' },
]

/* --- Sidebar Component -------------------------------------- */
function Sidebar({ active, onSelect }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="w-64 min-h-screen glass border-r border-white/5 p-4 flex flex-col">
      {/* User info */}
      <div className="mb-8 p-4">
        <div className="w-12 h-12 rounded-full bg-brand-violet/20 flex items-center justify-center text-lg font-bold text-brand-violet mb-3">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <p className="font-semibold text-sm">{user?.name || 'User'}</p>
        <p className="text-xs text-brand-muted truncate">{user?.email || 'user@email.com'}</p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1">
        {sidebarLinks.map((link) => (
          <button
            key={link.key}
            onClick={() => onSelect(link.key)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
              active === link.key
                ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </button>
        ))}
      </nav>

      {/* Logout + back to site */}
      <div className="space-y-2 mt-auto pt-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-left"
        >
          🚪 Logout
        </button>
        <Link
          to="/"
          className="block px-4 py-3 text-sm text-brand-muted hover:text-brand-text hover:bg-white/5 rounded-xl transition-all"
        >
          ← Back to Site
        </Link>
      </div>
    </aside>
  )
}

/* --- Dashboard Panels --------------------------------------- */
function OverviewPanel({ user }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-brand-muted mb-1">Wallet Balance</p>
          <p className="text-2xl font-bold text-brand-cyan">₹{user?.walletBalance || 0}</p>
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-brand-muted mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-brand-violet">0</p>
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-brand-muted mb-1">Member Since</p>
          <p className="text-2xl font-bold text-brand-pink text-lg">
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>
      <div className="glass rounded-xl p-6">
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/pricing" className="px-4 py-2 bg-brand-cyan/10 text-brand-cyan rounded-lg text-sm hover:bg-brand-cyan/20 transition-all">
            Browse Services
          </Link>
          <Link to="/contact" className="px-4 py-2 bg-brand-violet/10 text-brand-violet rounded-lg text-sm hover:bg-brand-violet/20 transition-all">
            Contact Support
          </Link>
          <Link to="/courses" className="px-4 py-2 bg-brand-pink/10 text-brand-pink rounded-lg text-sm hover:bg-brand-pink/20 transition-all">
            Explore Courses
          </Link>
        </div>
      </div>
    </div>
  )
}

function WalletPanel({ user }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Wallet</h2>
      <div className="glass rounded-xl p-6">
        <p className="text-sm text-brand-muted mb-1">Current Balance</p>
        <p className="text-4xl font-bold text-brand-cyan">₹{user?.walletBalance || 0}</p>
      </div>
      <div className="glass rounded-xl p-6">
        <p className="text-brand-muted text-sm">Wallet top-up and transaction history coming soon.</p>
      </div>
    </div>
  )
}

function OrdersPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders</h2>
      <div className="glass rounded-xl p-8 text-center">
        <p className="text-4xl mb-3">📦</p>
        <p className="text-brand-muted">No orders yet. Browse our services to get started.</p>
        <Link to="/pricing" className="inline-block mt-4 px-6 py-2 bg-brand-cyan text-brand-bg rounded-lg text-sm font-semibold hover:glow-cyan transition-all">
          View Services
        </Link>
      </div>
    </div>
  )
}

function SettingsPanel({ user }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="glass rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm text-brand-muted mb-1">Name</label>
          <input
            type="text"
            defaultValue={user?.name || ''}
            className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-brand-text focus:border-brand-cyan focus:outline-none"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm text-brand-muted mb-1">Email</label>
          <input
            type="email"
            defaultValue={user?.email || ''}
            className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-brand-text focus:border-brand-cyan focus:outline-none"
            readOnly
          />
        </div>
        <p className="text-xs text-brand-muted italic">
          Profile editing will be available soon.
        </p>
      </div>
    </div>
  )
}

/* --- MAIN DASHBOARD ----------------------------------------- */
export default function Dashboard() {
  const { user } = useAuth()
  const [activePanel, setActivePanel] = useState('overview')

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-muted mb-4">Please sign in to access your dashboard.</p>
          <Link to="/login" className="px-6 py-3 bg-brand-cyan text-brand-bg rounded-xl font-semibold hover:glow-cyan transition-all">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  const panels = {
    overview: <OverviewPanel user={user} />,
    wallet: <WalletPanel user={user} />,
    orders: <OrdersPanel />,
    settings: <SettingsPanel user={user} />,
  }

  return (
    <div className="flex min-h-screen bg-brand-bg">
      <Sidebar active={activePanel} onSelect={setActivePanel} />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        <motion.div
          key={activePanel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {panels[activePanel]}
        </motion.div>
      </main>
    </div>
  )
}
