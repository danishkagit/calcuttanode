import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import services from '../data/services';
import PaymentModal from '../components/dashboard/PaymentModal';

const categories = [...new Set(services.map((s) => s.category))];
const sections = ['overview', 'orders', 'wallet', 'book-service', 'subscription', 'purchases', 'profile'];

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const [section, setSection] = useState('overview');
  const [showPayment, setShowPayment] = useState(false);
  const [data, setData] = useState({ overview: {}, orders: [], wallet: 0, transactions: [] });
  const [mySub, setMySub] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [booking, setBooking] = useState(null);
  const [notes, setNotes] = useState('');
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [overviewRes, ordersRes, walletRes, txRes, subRes, purchasesRes] = await Promise.all([
          api.get('/dashboard/overview'),
          api.get('/dashboard/orders'),
          api.get('/dashboard/wallet'),
          api.get('/dashboard/transactions'),
          api.get('/subscriptions/my').catch(() => ({ data: null })),
          api.get('/products/my/purchases').catch(() => ({ data: [] })),
        ]);
        setData({ overview: overviewRes.data, orders: ordersRes.data, wallet: walletRes.data.balance, transactions: txRes.data });
        setMySub(subRes.data);
        setPurchases(purchasesRes.data);
      } catch {}
    };
    fetchData();
  }, [user, refresh]);

  const placeOrder = async (service) => {
    setPlacing(true);
    try {
      await api.post('/dashboard/order', {
        serviceId: service.id,
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

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6 flex-col md:flex-row">
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-surface/50 rounded-xl p-4 border border-electric-violet/20 space-y-1 sticky top-20">
          {sections.map((s) => (
            <button key={s} onClick={() => setSection(s)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                section === s ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-text-muted hover:text-text-primary hover:bg-white/5'
              }`}
            >
              {s === 'overview' && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
              {s === 'orders' && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>}
              {s === 'wallet' && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M16 12a2 2 0 100 4 2 2 0 000-4z"/><path d="M1 8h22"/></svg>}
              {s === 'book-service' && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>}
              {s === 'subscription' && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
              {s === 'purchases' && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M7 10h10M7 13h10"/></svg>}
              {s === 'profile' && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
            </button>
          ))}
          <hr className="border-electric-violet/20 my-2" />
          <button onClick={logout}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <motion.div key={section} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
          className="bg-surface/50 rounded-xl p-6 border border-electric-violet/20 min-h-[400px]"
        >
          {section === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-1">Overview</h2>
              <p className="text-text-muted mb-6">Welcome back, {user.name}!</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10">
                  <p className="text-text-muted text-sm mb-1">Active Orders</p>
                  <p className="text-3xl font-bold text-neon-cyan">{data.overview.activeOrders || 0}</p>
                </div>
                <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10">
                  <p className="text-text-muted text-sm mb-1">Wallet Balance</p>
                  <p className="text-3xl font-bold text-neon-cyan">₹{data.overview.walletBalance || 0}</p>
                </div>
                <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10">
                  <p className="text-text-muted text-sm mb-1">Last Activity</p>
                  <p className="text-sm text-text-primary mt-2">{data.overview.lastActivity ? new Date(data.overview.lastActivity).toLocaleDateString() : 'None'}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setSection('book-service')} className="bg-brand-gradient text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 hover:scale-[1.02] active:scale-[0.98]">
                  Book a Service
                </button>
                <button onClick={() => setSection('wallet')} className="border border-neon-cyan text-neon-cyan px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-neon-cyan/10">
                  Add Funds
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
                    <div key={order._id} className="bg-background/50 rounded-xl p-4 border border-electric-violet/10 flex justify-between items-center">
                      <div>
                        <p className="text-text-primary font-medium">{order.serviceName}</p>
                        <p className="text-text-muted text-xs mt-1">{new Date(order.createdAt).toLocaleDateString()} &bull; ₹{order.priceAtBooking}</p>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
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
                <div className="space-y-2 max-h-72 overflow-y-auto">
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
              <p className="text-text-muted mb-6">Choose from our {services.length} services</p>

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
                          {services.filter((s) => s.category === cat).map((s) => (
                            <button key={s.id} onClick={() => setBooking(s)}
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
                  ))}
                </div>
              )}
            </div>
          )}

          {section === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-1">Profile</h2>
              <p className="text-text-muted mb-6">Your account details</p>
              <div className="max-w-md space-y-4">
                {[
                  { label: 'Name', value: user.name },
                  { label: 'Email', value: user.email },
                  { label: 'Phone', value: user.phone },
                  { label: 'Role', value: user.role },
                  { label: 'Referral Code', value: user.referralCode || 'N/A' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between p-3.5 rounded-lg bg-background/50 border border-electric-violet/10">
                    <span className="text-text-muted text-sm">{item.label}</span>
                    <span className="text-text-primary text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} onSuccess={() => setRefresh((r) => r + 1)} />}
    </div>
  );
}
