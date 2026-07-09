import { useState, useEffect, useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import PaymentModal from '../components/dashboard/PaymentModal';
import ReferralSection from '../components/dashboard/ReferralSection';
import LoyaltySection from '../components/dashboard/LoyaltySection';
import CouponSection from '../components/dashboard/CouponSection';
import ReviewSection from '../components/dashboard/ReviewSection';
import WishlistSection from '../components/dashboard/WishlistSection';
import OrderTracker from '../components/dashboard/OrderTracker';
import AdminDashboard from '../components/dashboard/AdminDashboard';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const { section: urlSection } = useParams();
  const [section, setSection] = useState(urlSection || 'overview');
  const [showPayment, setShowPayment] = useState(false);
  const [data, setData] = useState({ overview: {}, orders: [], wallet: 0, transactions: [] });
  const [mySub, setMySub] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [notifications, setNotifications] = useState({ notifications: [], unreadCount: 0 });
  const [showNotif, setShowNotif] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [booking, setBooking] = useState(null);
  const [notes, setNotes] = useState('');
  const [placing, setPlacing] = useState(false);
  const [servicesList, setServicesList] = useState([]);

  const categories = useMemo(() => [...new Set(servicesList.map((s) => s.category))], [servicesList]);

  useEffect(() => {
    if (urlSection) setSection(urlSection);
  }, [urlSection]);

  useEffect(() => {
    api.get('/services')
      .then((res) => setServicesList(Array.isArray(res.data) ? res.data : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [overviewRes, ordersRes, walletRes, txRes, subRes, purchasesRes, notifRes] = await Promise.all([
          api.get('/dashboard/overview'),
          api.get('/dashboard/orders'),
          api.get('/dashboard/wallet'),
          api.get('/dashboard/transactions'),
          api.get('/subscriptions/my').catch(() => ({ data: null })),
          api.get('/products/my/purchases').catch(() => ({ data: [] })),
          api.get('/notifications').catch(() => ({ data: { notifications: [], unreadCount: 0 } })),
        ]);
        setData({ overview: overviewRes.data, orders: ordersRes.data, wallet: walletRes.data.balance, transactions: txRes.data });
        setMySub(subRes.data);
        setPurchases(purchasesRes.data);
        setNotifications(notifRes.data || { notifications: [], unreadCount: 0 });
      } catch {}
    };
    fetchData();
  }, [user, refresh]);

  const markNotifRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev => ({
        ...prev,
        notifications: prev.notifications.map(n => n._id === id ? { ...n, isRead: true } : n),
        unreadCount: Math.max(0, prev.unreadCount - 1),
      }));
    } catch {}
  };

  const markAllRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications(prev => ({
        ...prev,
        notifications: prev.notifications.map(n => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));
    } catch {}
  };

  const placeOrder = async (service) => {
    setPlacing(true);
    try {
      await api.post('/dashboard/order', {
        serviceId: service._id,
        serviceName: service.name,
        price: service.price,
        remoteAccessNotes: notes,
      });
      setBooking(null);
      setNotes('');
      setRefresh((r) => r + 1);
      setSection('orders');
    } catch {
      alert('Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  const toggleWishlist = async (serviceId) => {
    try {
      const res = await api.post('/wishlist/toggle', { serviceId });
      return res.data.saved;
    } catch {
      return false;
    }
  };

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  const isAdmin = user.role === 'admin';
  const mainSections = ['overview', 'orders', 'wallet', 'book-service', 'subscription', 'purchases', 'wishlist', 'coupons', 'reviews', 'referral', 'loyalty', 'profile'];
  if (isAdmin) mainSections.push('admin');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6 flex-col md:flex-row">
      <aside className="w-full md:w-64 shrink-0">
        <div className="glass-card rounded-xl p-4 space-y-1 md:sticky md:top-20">
          <div className="flex items-center justify-between px-4 py-2 mb-2">
            <p className="text-xs text-text-muted font-medium flex items-center gap-2">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-1 hover:text-text-primary transition-colors" aria-label="Toggle sidebar">
                <svg className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              Dashboard
            </p>
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative p-1.5 text-text-muted hover:text-text-primary transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
                {notifications.unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                    {notifications.unreadCount > 9 ? '9+' : notifications.unreadCount}
                  </span>
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-electric-violet/20 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
                  <div className="flex justify-between items-center p-3 border-b border-electric-violet/20">
                    <p className="text-sm font-medium text-text-primary">Notifications</p>
                    {notifications.unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-neon-cyan hover:underline">Mark all read</button>
                    )}
                  </div>
                  {notifications.notifications.length === 0 ? (
                    <p className="text-text-muted text-sm text-center py-6">No notifications</p>
                  ) : (
                    notifications.notifications.map(n => (
                      <button key={n._id} onClick={() => { if (!n.isRead) markNotifRead(n._id); }}
                        className={`w-full text-left p-3 border-b border-electric-violet/10 hover:bg-electric-violet/5 transition-colors ${!n.isRead ? 'bg-neon-cyan/5' : ''}`}
                      >
                        <p className="text-sm font-medium text-text-primary">{n.title}</p>
                        <p className="text-xs text-text-muted mt-0.5">{n.message}</p>
                        <p className="text-[10px] text-text-muted/50 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={`md:!max-h-none overflow-hidden transition-all duration-300 ${sidebarOpen ? 'max-h-[800px]' : 'max-h-0 md:max-h-none'}`}>
            {mainSections.map((s) => (
              <button key={s} onClick={() => { setSection(s); setSidebarOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  section === s ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {s === 'overview' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                {s === 'orders' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
                {s === 'wallet' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M16 12a2 2 0 100 4 2 2 0 000-4z"/><path d="M1 8h22"/></svg>}
                {s === 'book-service' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>}
                {s === 'subscription' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                {s === 'purchases' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M7 10h10M7 13h10"/></svg>}
                {s === 'wishlist' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>}
                {s === 'coupons' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12H4M20 12a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v4a2 2 0 002 2m16 0a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2"/></svg>}
                {s === 'reviews' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
                {s === 'referral' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>}
                {s === 'loyalty' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>}
                {s === 'profile' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                {s === 'admin' && <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                <span className="truncate">{s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}</span>
              </button>
            ))}
            <hr className="border-electric-violet/20 my-2" />
            <button onClick={logout}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <motion.div key={section} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
          className="glass-card rounded-xl p-6 min-h-[400px]"
        >
          {section === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-1">Overview</h2>
              <p className="text-text-muted mb-6">Welcome back, {user.name}!</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
                  <p className="text-text-muted text-sm mb-1">Active Orders</p>
                  <p className="text-3xl font-bold text-neon-cyan">{data.overview.activeOrders || 0}</p>
                </div>
                <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
                  <p className="text-text-muted text-sm mb-1">Wallet Balance</p>
                  <p className="text-3xl font-bold text-neon-cyan">₹{data.overview.walletBalance || 0}</p>
                </div>
                <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
                  <p className="text-text-muted text-sm mb-1">Loyalty Points</p>
                  <p className="text-3xl font-bold text-purple-400">{data.overview.loyaltyPoints || 0}</p>
                </div>
                <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10 text-center">
                  <p className="text-text-muted text-sm mb-1">Referral Earnings</p>
                  <p className="text-3xl font-bold text-green-400">₹{data.overview.referralEarnings || 0}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {data.overview.activeSub && (
                  <div className="bg-background/50 rounded-xl p-4 border border-neon-cyan/30">
                    <p className="text-text-muted text-xs mb-1">Active Subscription</p>
                    <p className="text-text-primary font-medium">{data.overview.activeSub.planName}</p>
                    <p className="text-text-muted text-xs">Expires: {new Date(data.overview.activeSub.endDate).toLocaleDateString()}</p>
                  </div>
                )}
                <div className="bg-background/50 rounded-xl p-4 border border-electric-violet/10">
                  <p className="text-text-muted text-xs mb-1">Notifications</p>
                  <p className="text-text-primary font-medium">{data.overview.unreadNotifications || 0} unread</p>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => setSection('book-service')} className="bg-brand-gradient text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 hover:scale-[1.02] active:scale-[0.98]">
                  Book a Service
                </button>
                <button onClick={() => setSection('wallet')} className="border border-neon-cyan text-neon-cyan px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-neon-cyan/10">
                  Add Funds
                </button>
                <button onClick={() => setSection('referral')} className="border border-green-400/50 text-green-400 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-green-400/10">
                  Refer & Earn
                </button>
              </div>
            </div>
          )}

          {section === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-1">My Orders</h2>
              <p className="text-text-muted mb-6">Track your service requests</p>
              {data.orders.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-text-muted/30 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <p className="text-text-muted">No orders yet.</p>
                  <button onClick={() => setSection('book-service')} className="mt-4 text-neon-cyan text-sm hover:underline">Book your first service</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.orders.map((order) => (
                    <div key={order._id}>
                      <OrderTracker order={order} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {section === 'wallet' && (
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-1">Wallet</h2>
              <p className="text-text-muted mb-6">Manage your funds</p>
              <div className="bg-background/50 rounded-xl p-8 border border-electric-violet/10 text-center mb-8 max-w-md mx-auto">
                <p className="text-text-muted text-sm mb-2">Current Balance</p>
                <p className="text-5xl font-bold text-neon-cyan my-3">₹{data.wallet}</p>
                <button onClick={() => setShowPayment(true)} className="bg-brand-gradient text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 hover:scale-[1.02] active:scale-[0.98]">
                  Add Funds
                </button>
              </div>
              <h3 className="text-text-primary font-semibold mb-3">Transaction History</h3>
              {data.transactions.length === 0 ? (
                <p className="text-text-muted text-sm">No transactions yet.</p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {data.transactions.map((tx) => (
                    <div key={tx._id} className="bg-background/50 rounded-lg p-3.5 border border-electric-violet/10 flex justify-between items-center text-sm">
                      <div>
                        <p className="text-text-primary">{tx.description || tx.method}</p>
                        <p className="text-text-muted text-xs mt-0.5">{new Date(tx.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`font-medium ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {section === 'book-service' && (
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-1">Book a Service</h2>
              <p className="text-text-muted mb-6">Choose from our {servicesList.length} services</p>
              <AnimatePresence>
                {booking ? (
                  <motion.div key="booking-form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <button onClick={() => { setBooking(null); setNotes(''); }} className="text-sm text-text-muted hover:text-neon-cyan transition-colors mb-4 flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                      Back to services
                    </button>
                    <div className="rounded-xl p-6 border border-neon-cyan/30 bg-gradient-to-b from-neon-cyan/5 to-surface">
                      <h3 className="text-lg font-bold text-text-primary mb-1">{booking.name}</h3>
                      <p className="text-2xl font-bold text-neon-cyan mb-4">₹{booking.price}</p>
                      <div className="space-y-2 mb-4">
                        {booking.features.map((f, i) => (
                          <p key={i} className="text-text-muted text-sm flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 shrink-0 text-electric-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                            {f}
                          </p>
                        ))}
                      </div>
                      <textarea placeholder="Any specific requirements or remote access details?" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                        className="w-full bg-background border border-electric-violet/20 rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan transition-colors resize-none mb-4"
                      />
                      <button onClick={() => placeOrder(booking)} disabled={placing}
                        className="w-full bg-brand-gradient text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 disabled:opacity-50"
                      >
                        {placing ? 'Placing Order...' : 'Confirm & Place Order'}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="service-list" exit={{ opacity: 0 }}>
                    {categories.map((cat) => (
                      <div key={cat} className="mb-6">
                        <h3 className="text-sm font-semibold text-electric-violet uppercase tracking-wider mb-3">{cat}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {servicesList.filter((s) => s.category === cat).map((s) => (
                            <button key={s._id} onClick={() => setBooking(s)}
                              className="text-left p-4 rounded-xl border border-electric-violet/20 bg-background/30 hover:border-neon-cyan/40 transition-all duration-200 group"
                            >
                              <p className="text-text-primary font-medium text-sm group-hover:text-neon-cyan transition-colors">{s.name}</p>
                              <p className="text-neon-cyan font-bold mt-1">₹{s.price}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {section === 'subscription' && (
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-1">My Subscription</h2>
              <p className="text-text-muted mb-6">Manage your membership plan</p>
              {mySub && mySub.status === 'active' ? (
                <div className="bg-background/50 rounded-xl p-6 border border-neon-cyan/30 max-w-md">
                  <p className="text-neon-cyan font-bold text-lg">{mySub.planName}</p>
                  <p className="text-text-muted text-sm mt-2">
                    Started {new Date(mySub.startDate).toLocaleDateString()} &bull; Expires {new Date(mySub.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-text-primary text-sm mt-1">
                    {Math.ceil((new Date(mySub.endDate) - new Date()) / (1000 * 60 * 60 * 24))} days remaining
                  </p>
                  {mySub.autoRenew && <p className="text-green-400 text-xs mt-2">Auto-renew is ON</p>}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-text-muted/30 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <p className="text-text-muted">No active subscription.</p>
                  <a href="/plans" className="mt-4 inline-block text-neon-cyan text-sm hover:underline">View plans</a>
                </div>
              )}
            </div>
          )}

          {section === 'purchases' && (
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-1">My Purchases</h2>
              <p className="text-text-muted mb-6">Digital products you've bought</p>
              {purchases.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-text-muted/30 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M7 10h10M7 13h10"/></svg>
                  <p className="text-text-muted">No purchases yet.</p>
                  <a href="/products" className="mt-4 inline-block text-neon-cyan text-sm hover:underline">Browse products</a>
                </div>
              ) : (
                <div className="space-y-3">
                  {purchases.map((p) => (
                    <div key={p._id} className="bg-background/50 rounded-xl p-4 border border-electric-violet/10 flex justify-between items-center">
                      <div>
                        <p className="text-text-primary font-medium">{p.productName}</p>
                        <p className="text-text-muted text-xs mt-1">₹{p.amount} &bull; {new Date(p.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        {p.downloadToken && (
                          <button onClick={async () => {
                            try {
                              const { data } = await api.get(`/products/download/${p.downloadToken}`);
                              window.open(data.fileUrl, '_blank');
                            } catch { alert('Download failed'); }
                          }}
                            className="text-xs bg-neon-cyan/20 text-neon-cyan px-3 py-1.5 rounded-lg hover:bg-neon-cyan/30 transition-colors"
                          >
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {section === 'wishlist' && <WishlistSection />}
          {section === 'coupons' && <CouponSection />}
          {section === 'reviews' && <ReviewSection />}
          {section === 'referral' && <ReferralSection />}
          {section === 'loyalty' && <LoyaltySection onRefresh={() => setRefresh(r => r + 1)} />}

          {section === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-1">Profile</h2>
              <p className="text-text-muted mb-6">Your account details</p>
              <div className="max-w-md space-y-4">
                {[
                  { label: 'Name', value: user.name },
                  { label: 'Email', value: user.email },
                  { label: 'Phone', value: user.phone || 'Not set' },
                  { label: 'Role', value: user.role },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between p-3.5 rounded-lg bg-background/50 border border-electric-violet/10">
                    <span className="text-text-muted text-sm">{item.label}</span>
                    <span className="text-text-primary text-sm font-medium">{item.value}</span>
                  </div>
                ))}
                <hr className="border-electric-violet/20" />
                <p className="text-text-muted text-xs">Notifications are {user.emailNotifications ? 'enabled' : 'disabled'}</p>
              </div>
            </div>
          )}

          {section === 'admin' && isAdmin && <AdminDashboard />}
        </motion.div>
      </main>

      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} onSuccess={() => setRefresh((r) => r + 1)} />}
    </div>
  );
}
