import { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function AdminDashboard() {
  const [section, setSection] = useState('overview');
  const [overview, setOverview] = useState(null);
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [orders, setOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [txFilter, setTxFilter] = useState('all');
  const [subscriptions, setSubscriptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [revenue, setRevenue] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [editProduct, setEditProduct] = useState(null);
  const [editPlan, setEditPlan] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [broadcast, setBroadcast] = useState({ title: '', message: '' });
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [ov, u, o, t, s, p, pl, m, r, rev] = await Promise.all([
          api.get('/admin/overview'),
          api.get(`/admin/users${userSearch ? `?search=${userSearch}` : ''}`),
          api.get(`/admin/orders${orderFilter !== 'all' ? `?status=${orderFilter}` : ''}`),
          api.get(`/admin/transactions${txFilter !== 'all' ? `?status=${txFilter}` : ''}`),
          api.get('/admin/subscriptions'),
          api.get('/admin/products'),
          api.get('/admin/plans'),
          api.get('/admin/messages'),
          api.get('/admin/reviews'),
          api.get('/admin/revenue'),
        ]);
        setOverview(ov.data);
        setUsers(u.data);
        setOrders(o.data);
        setTransactions(t.data);
        setSubscriptions(s.data);
        setProducts(p.data);
        setPlans(pl.data);
        setMessages(m.data);
        setReviews(r.data);
        setRevenue(rev.data);
      } catch {}
    };
    fetchAll();
  }, [refresh, userSearch, orderFilter, txFilter]);

  const apiCall = async (method, url, body = null, msg = 'Success') => {
    setLoading(l => ({ ...l, [url]: true }));
    try {
      if (body) await api[method](url, body);
      else await api[method](url);
      setRefresh(r => r + 1);
      return true;
    } catch (err) {
      alert(err.response?.data?.message || 'Failed');
      return false;
    } finally {
      setLoading(l => ({ ...l, [url]: false }));
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'orders', label: 'Orders', icon: '📋' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'plans', label: 'Sub Plans', icon: '📜' },
    { id: 'transactions', label: 'Transactions', icon: '💰' },
    { id: 'subscriptions', label: 'Subscriptions', icon: '🔄' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'messages', label: 'Messages', icon: '✉️' },
    { id: 'revenue', label: 'Revenue', icon: '📈' },
    { id: 'broadcast', label: 'Broadcast', icon: '📢' },
    { id: 'seed', label: 'Seed', icon: '🌱' },
  ];

  const StatCard = ({ label, value, color }) => (
    <div className="bg-background/50 rounded-xl p-4 border border-electric-violet/10">
      <p className="text-text-muted text-xs mb-1">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value ?? '—'}</p>
    </div>
  );

  const FormInput = ({ label, value, onChange, type = 'text', required, placeholder, multiline, rows = 3 }) => (
    <div>
      <label className="text-xs text-text-muted block mb-1">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
          className="w-full bg-background border border-electric-violet/20 rounded-lg px-3 py-2 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-neon-cyan resize-none"
        />
      ) : (
        <input type={type} value={value} onChange={onChange} required={required} placeholder={placeholder}
          className="w-full bg-background border border-electric-violet/20 rounded-lg px-3 py-2 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-neon-cyan"
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Admin Dashboard</h2>
          <p className="text-text-muted text-sm">Full platform management</p>
        </div>
        <button onClick={() => setRefresh(r => r + 1)} className="text-xs text-neon-cyan hover:underline">Refresh</button>
      </div>

      <div className="flex gap-1.5 mb-6 flex-wrap">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setSection(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              section === t.id
                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                : 'bg-electric-violet/10 text-text-muted hover:text-text-primary border border-transparent'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {section === 'overview' && overview && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
            <StatCard label="Total Users" value={overview.totalUsers} color="text-neon-cyan" />
            <StatCard label="Total Orders" value={overview.totalOrders} color="text-blue-400" />
            <StatCard label="Total Revenue" value={`₹${(overview.totalRevenue || 0).toLocaleString()}`} color="text-green-400" />
            <StatCard label="Pending Orders" value={overview.pendingOrders} color="text-yellow-400" />
            <StatCard label="Pending Transfers" value={overview.pendingTransfers} color="text-red-400" />
            <StatCard label="Active Products" value={overview.totalProducts} color="text-purple-400" />
            <StatCard label="Active Subs" value={overview.activeSubs} color="text-pink-400" />
            <StatCard label="Pending Reviews" value={overview.pendingReviews} color="text-orange-400" />
            <StatCard label="New Users (7d)" value={overview.recentUsers} color="text-teal-400" />
            <StatCard label="Unread Messages" value={overview.unreadMessages} color="text-rose-400" />
            <StatCard label="Total Blogs" value={overview.totalBlogs} color="text-indigo-400" />
            <StatCard label="Active Plans" value={overview.totalPlans} color="text-amber-400" />
          </div>
        </div>
      )}

      {section === 'users' && (
        <div>
          <div className="flex gap-2 mb-4">
            <input type="text" placeholder="Search by name or email..." value={userSearch} onChange={e => setUserSearch(e.target.value)}
              className="flex-1 bg-background border border-electric-violet/20 rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-text-muted border-b border-electric-violet/20">
                  <th className="text-left py-2 px-2">Name</th>
                  <th className="text-left py-2 px-2">Email</th>
                  <th className="text-center py-2 px-2">Role</th>
                  <th className="text-right py-2 px-2">Wallet</th>
                  <th className="text-right py-2 px-2">Ref Earnings</th>
                  <th className="text-right py-2 px-2">Loyalty</th>
                  <th className="text-center py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="border-b border-electric-violet/10 hover:bg-electric-violet/5">
                    <td className="py-2 px-2 text-text-primary">{u.name}</td>
                    <td className="py-2 px-2 text-text-muted">{u.email}</td>
                    <td className="py-2 px-2 text-center">
                      <select value={u.role} onChange={e => apiCall('patch', `/admin/users/${u._id}/role`, { role: e.target.value })}
                        className="text-[10px] bg-background border border-electric-violet/20 rounded px-1 py-0.5 text-text-primary">
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="py-2 px-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-neon-cyan">₹{u.walletBalance}</span>
                        <button onClick={() => { const a = prompt('Adjust wallet by (+/- amount):'); if (a) apiCall('patch', `/admin/users/${u._id}/wallet`, { amount: Number(a), description: 'Admin adjustment' }); }}
                          className="text-[10px] text-neon-cyan hover:underline">edit</button>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-right text-green-400">₹{u.referralEarnings || 0}</td>
                    <td className="py-2 px-2 text-right text-purple-400">{u.loyaltyPoints || 0}</td>
                    <td className="py-2 px-2 text-center">
                      <button onClick={() => { if (confirm('Delete this user and all their data?')) apiCall('delete', `/admin/users/${u._id}`); }}
                        className="text-[10px] text-red-400 hover:underline">delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {section === 'orders' && (
        <div>
          <div className="flex gap-2 mb-4">
            {['all', 'pending', 'in-progress', 'completed', 'cancelled'].map(s => (
              <button key={s} onClick={() => setOrderFilter(s)}
                className={`text-[10px] px-2 py-1 rounded ${orderFilter === s ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-electric-violet/10 text-text-muted'}`}>
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {orders.map(o => (
              <div key={o._id} className="bg-background/50 rounded-xl p-3 border border-electric-violet/10">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary text-sm font-medium truncate">{o.serviceName}</p>
                    <p className="text-text-muted text-[10px]">{o.userId?.name || 'Unknown'} &bull; {o.userId?.email || ''}</p>
                    <p className="text-text-muted text-[10px]">₹{o.finalPrice || o.priceAtBooking} &bull; {new Date(o.createdAt).toLocaleDateString()}</p>
                    {o.couponCode && <p className="text-green-400 text-[10px]">Coupon: {o.couponCode} (-₹{o.discountApplied})</p>}
                    {o.remoteAccessNotes && <p className="text-text-muted text-[10px] mt-1 bg-background rounded p-1">Notes: {o.remoteAccessNotes}</p>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <select value={o.status} onChange={e => apiCall('patch', `/admin/orders/${o._id}/status`, { status: e.target.value })}
                      className="text-[10px] bg-background border border-electric-violet/20 rounded px-1.5 py-1 text-text-primary">
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button onClick={() => { if (confirm('Delete this order?')) apiCall('delete', `/admin/orders/${o._id}`); }}
                      className="text-[10px] text-red-400 hover:underline">del</button>
                  </div>
                </div>
              </div>
            ))}
            {orders.length === 0 && <p className="text-text-muted text-sm text-center py-6">No orders</p>}
          </div>
        </div>
      )}

      {section === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-text-muted text-sm">{products.length} products</p>
            <button onClick={() => { setEditProduct(null); setShowProductForm(true); }}
              className="bg-brand-gradient text-white px-3 py-1.5 rounded-lg text-xs font-medium">+ Add Product</button>
          </div>

          {showProductForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowProductForm(false)}>
              <div className="bg-surface rounded-xl p-6 border border-electric-violet/20 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-text-primary mb-4">{editProduct ? 'Edit Product' : 'New Product'}</h3>
                <ProductForm product={editProduct} onSave={async (data) => {
                  const ok = editProduct
                    ? await apiCall('put', `/admin/products/${editProduct._id}`, data)
                    : await apiCall('post', '/admin/products', data);
                  if (ok) { setShowProductForm(false); setEditProduct(null); }
                }} onCancel={() => { setShowProductForm(false); setEditProduct(null); }} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map(p => (
              <div key={p._id} className="bg-background/50 rounded-xl p-3 border border-electric-violet/10">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-text-primary text-sm font-medium truncate">{p.name}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${p.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {p.isActive ? 'active' : 'inactive'}
                  </span>
                </div>
                <p className="text-neon-cyan font-bold text-sm">₹{p.price}</p>
                <p className="text-text-muted text-[10px] mt-1">{p.category} &bull; {p.salesCount || 0} sales</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => { setEditProduct(p); setShowProductForm(true); }}
                    className="text-[10px] text-neon-cyan hover:underline">Edit</button>
                  <button onClick={() => { if (confirm(`Delete "${p.name}"?`)) apiCall('delete', `/admin/products/${p._id}`); }}
                    className="text-[10px] text-red-400 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === 'plans' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-text-muted text-sm">{plans.length} plans</p>
            <button onClick={() => { setEditPlan(null); setShowPlanForm(true); }}
              className="bg-brand-gradient text-white px-3 py-1.5 rounded-lg text-xs font-medium">+ Add Plan</button>
          </div>

          {showPlanForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowPlanForm(false)}>
              <div className="bg-surface rounded-xl p-6 border border-electric-violet/20 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-text-primary mb-4">{editPlan ? 'Edit Plan' : 'New Plan'}</h3>
                <PlanForm plan={editPlan} onSave={async (data) => {
                  const ok = editPlan
                    ? await apiCall('put', `/admin/plans/${editPlan._id}`, data)
                    : await apiCall('post', '/admin/plans', data);
                  if (ok) { setShowPlanForm(false); setEditPlan(null); }
                }} onCancel={() => { setShowPlanForm(false); setEditPlan(null); }} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {plans.map(p => (
              <div key={p._id} className={`bg-background/50 rounded-xl p-4 border ${p.isActive ? 'border-electric-violet/10' : 'border-red-500/30'}`}>
                <p className="text-text-primary font-bold">{p.name}</p>
                <p className="text-2xl font-bold text-neon-cyan my-1">₹{p.price}</p>
                <p className="text-text-muted text-xs">{p.durationDays} days</p>
                <div className="mt-2 space-y-1">
                  {p.features?.map((f, i) => <p key={i} className="text-text-muted text-[10px]">✓ {f}</p>)}
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => { setEditPlan(p); setShowPlanForm(true); }}
                    className="text-[10px] text-neon-cyan hover:underline">Edit</button>
                  <button onClick={() => { if (confirm(`Delete "${p.name}"?`)) apiCall('delete', `/admin/plans/${p._id}`); }}
                    className="text-[10px] text-red-400 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === 'transactions' && (
        <div>
          <div className="flex gap-2 mb-4">
            {['all', 'pending', 'success', 'failed'].map(s => (
              <button key={s} onClick={() => setTxFilter(s)}
                className={`text-[10px] px-2 py-1 rounded ${txFilter === s ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-electric-violet/10 text-text-muted'}`}>
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {transactions.map(tx => (
              <div key={tx._id} className="bg-background/50 rounded-xl p-3 border border-electric-violet/10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-text-primary text-sm">{tx.description || tx.method || 'Transaction'}</p>
                    <p className="text-text-muted text-[10px]">{tx.userId?.name || 'Unknown'} &bull; {tx.method} {tx.utrNumber ? `&bull; UTR: ${tx.utrNumber}` : ''}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`font-medium text-sm ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                    </p>
                    {tx.method === 'bank_transfer' && tx.status === 'pending' && (
                      <div className="flex gap-1 mt-1 justify-end">
                        <button onClick={() => apiCall('patch', `/admin/transactions/${tx._id}/approve`, { status: 'success' })}
                          className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">Approve</button>
                        <button onClick={() => apiCall('patch', `/admin/transactions/${tx._id}/approve`, { status: 'failed' })}
                          className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">Reject</button>
                      </div>
                    )}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${tx.status === 'success' ? 'bg-green-500/20 text-green-400' : tx.status === 'failed' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {transactions.length === 0 && <p className="text-text-muted text-sm text-center py-6">No transactions</p>}
          </div>
        </div>
      )}

      {section === 'subscriptions' && (
        <div className="space-y-2">
          {subscriptions.map(s => (
            <div key={s._id} className="bg-background/50 rounded-xl p-3 border border-electric-violet/10 flex justify-between items-center">
              <div>
                <p className="text-text-primary text-sm font-medium">{s.planName}</p>
                <p className="text-text-muted text-[10px]">{s.userId?.name || 'Unknown'} &bull; {s.userId?.email || ''}</p>
                <p className="text-text-muted text-[10px]">{new Date(s.startDate).toLocaleDateString()} - {new Date(s.endDate).toLocaleDateString()}</p>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full ${s.status === 'active' ? 'bg-green-500/20 text-green-400' : s.status === 'expired' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {s.status}
              </span>
            </div>
          ))}
          {subscriptions.length === 0 && <p className="text-text-muted text-sm text-center py-6">No subscriptions</p>}
        </div>
      )}

      {section === 'reviews' && (
        <div className="space-y-2">
          {reviews.map(r => (
            <div key={r._id} className="bg-background/50 rounded-xl p-3 border border-electric-violet/10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-text-primary text-sm font-medium">{r.serviceName}</p>
                  <p className="text-text-muted text-[10px]">{r.userId?.name || 'Unknown'} &bull; {r.userId?.email || ''}</p>
                  <div className="flex gap-0.5 my-1">
                    {[1,2,3,4,5].map(n => <span key={n} className={`text-xs ${n <= r.rating ? 'text-yellow-400' : 'text-text-muted/30'}`}>★</span>)}
                  </div>
                  {r.comment && <p className="text-text-muted text-xs">{r.comment}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {!r.isApproved && (
                    <button onClick={() => apiCall('patch', `/admin/reviews/${r._id}/approve`)}
                      className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">Approve</button>
                  )}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${r.isApproved ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {r.isApproved ? 'Approved' : 'Pending'}
                  </span>
                  <button onClick={() => { if (confirm('Delete review?')) apiCall('delete', `/admin/reviews/${r._id}`); }}
                    className="text-[10px] text-red-400 hover:underline">del</button>
                </div>
              </div>
            </div>
          ))}
          {reviews.length === 0 && <p className="text-text-muted text-sm text-center py-6">No reviews</p>}
        </div>
      )}

      {section === 'messages' && (
        <div className="space-y-2">
          {messages.map(m => (
            <div key={m._id} className={`bg-background/50 rounded-xl p-3 border ${m.isRead ? 'border-electric-violet/10' : 'border-neon-cyan/30'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-text-primary text-sm font-medium">{m.name}</p>
                  <p className="text-text-muted text-[10px]">{m.email} {m.phone ? `• ${m.phone}` : ''}</p>
                  {m.subject && <p className="text-text-primary text-xs mt-1 font-medium">{m.subject}</p>}
                  <p className="text-text-muted text-xs mt-1">{m.message}</p>
                  <p className="text-text-muted text-[10px] mt-1">{new Date(m.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  {!m.isRead && (
                    <button onClick={() => apiCall('patch', `/admin/messages/${m._id}/read`)}
                      className="text-[10px] bg-neon-cyan/20 text-neon-cyan px-1.5 py-0.5 rounded">Mark read</button>
                  )}
                  <button onClick={() => { if (confirm('Delete message?')) apiCall('delete', `/admin/messages/${m._id}`); }}
                    className="text-[10px] text-red-400 hover:underline">del</button>
                </div>
              </div>
            </div>
          ))}
          {messages.length === 0 && <p className="text-text-muted text-sm text-center py-6">No messages</p>}
        </div>
      )}

      {section === 'revenue' && revenue && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-background/50 rounded-xl p-4 border border-electric-violet/10">
              <p className="text-text-muted text-xs mb-2">Total Revenue</p>
              <p className="text-2xl font-bold text-green-400">₹{(revenue.totalRevenue || 0).toLocaleString()}</p>
              <p className="text-text-muted text-[10px] mt-1">Total Spent: ₹{(revenue.totalRefunds || 0).toLocaleString()}</p>
            </div>
            <div className="bg-background/50 rounded-xl p-4 border border-electric-violet/10">
              <p className="text-text-muted text-xs mb-2">Revenue by Method</p>
              {revenue.byMethod.map(m => (
                <div key={m._id} className="flex justify-between text-[10px] py-0.5">
                  <span className="text-text-primary">{m._id || 'unknown'}</span>
                  <span className="text-neon-cyan">₹{m.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="bg-background/50 rounded-xl p-4 border border-electric-violet/10">
              <p className="text-text-muted text-xs mb-2">Top Services</p>
              {revenue.topServices.slice(0, 5).map(s => (
                <div key={s._id} className="flex justify-between text-[10px] py-0.5">
                  <span className="text-text-primary truncate mr-2">{s._id}</span>
                  <span className="text-purple-400 shrink-0">₹{s.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-background/50 rounded-xl p-4 border border-electric-violet/10">
            <p className="text-text-muted text-xs mb-2">Monthly Revenue (Last 12 months)</p>
            <div className="space-y-1">
              {revenue.monthly.map(m => (
                <div key={m._id} className="flex items-center gap-2 text-[10px]">
                  <span className="text-text-primary w-16">{m._id}</span>
                  <div className="flex-1 bg-electric-violet/10 rounded-full h-3 overflow-hidden">
                    <div className="bg-brand-gradient h-full rounded-full" style={{ width: `${Math.min(100, (m.total / Math.max(...revenue.monthly.map(x => x.total))) * 100)}%` }} />
                  </div>
                  <span className="text-green-400 w-20 text-right">₹{m.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {section === 'broadcast' && (
        <div className="max-w-md">
          <p className="text-text-muted text-sm mb-4">Send a notification to all users</p>
          <div className="space-y-3">
            <FormInput label="Notification Title" value={broadcast.title} onChange={e => setBroadcast(b => ({ ...b, title: e.target.value }))} placeholder="e.g., New Service Available!" />
            <FormInput label="Message" value={broadcast.message} onChange={e => setBroadcast(b => ({ ...b, message: e.target.value }))} multiline placeholder="Your message to all users..." />
            <button onClick={async () => {
              if (!broadcast.title || !broadcast.message) return alert('Title and message required');
              setSending(true);
              try {
                await api.post('/admin/broadcast', broadcast);
                alert('Notification sent to all users!');
                setBroadcast({ title: '', message: '' });
              } catch (err) {
                alert(err.response?.data?.message || 'Failed');
              } finally { setSending(false); }
            }} disabled={sending}
              className="bg-brand-gradient text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
              {sending ? 'Sending...' : 'Send to All Users'}
            </button>
          </div>
        </div>
      )}

      {section === 'seed' && (
        <div className="max-w-md">
          <p className="text-text-muted text-sm mb-4">Seed/re-seed database with default data. This will replace all existing data.</p>
          <div className="space-y-3">
            <button onClick={async () => {
              if (!confirm('This will DELETE all existing services and replace them. Continue?')) return;
              setSending(true);
              try {
                await api.post('/admin/seed/services');
                alert('Services seeded successfully! Refresh the page to see changes.');
              } catch (err) {
                alert(err.response?.data?.message || 'Failed');
              } finally { setSending(false); }
            }} disabled={sending}
              className="bg-brand-gradient text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {sending ? 'Seeding...' : '🌱 Seed Services'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState(product || {
    name: '', slug: '', description: '', price: '', category: '', fileUrl: '',
    previewImage: '', features: [''], isActive: true,
  });
  const [saving, setSaving] = useState(false);

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const updateFeature = (i, val) => {
    const f = [...form.features];
    f[i] = val;
    update('features', f);
  };
  const addFeature = () => update('features', [...(form.features || []), '']);
  const removeFeature = (i) => update('features', form.features.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { ...form, price: Number(form.price), features: form.features.filter(Boolean), isActive: form.isActive };
      await onSave(data);
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
      <FormInput label="Name" value={form.name} onChange={e => { update('name', e.target.value); if (!product) update('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')); }} />
      <FormInput label="Slug" value={form.slug} onChange={e => update('slug', e.target.value)} />
      <FormInput label="Description" value={form.description} onChange={e => update('description', e.target.value)} multiline />
      <div className="grid grid-cols-2 gap-3">
        <FormInput label="Price (₹)" type="number" value={form.price} onChange={e => update('price', e.target.value)} />
        <FormInput label="Category" value={form.category} onChange={e => update('category', e.target.value)} />
      </div>
      <FormInput label="File URL (download link)" value={form.fileUrl} onChange={e => update('fileUrl', e.target.value)} />
      <FormInput label="Preview Image URL" value={form.previewImage} onChange={e => update('previewImage', e.target.value)} />
      <div>
        <label className="text-xs text-text-muted block mb-1">Features</label>
        {form.features.map((f, i) => (
          <div key={i} className="flex gap-1 mb-1">
            <input type="text" value={f} onChange={e => updateFeature(i, e.target.value)} placeholder="Feature" className="flex-1 bg-background border border-electric-violet/20 rounded-lg px-2 py-1.5 text-xs text-text-primary focus:outline-none focus:border-neon-cyan" />
            <button onClick={() => removeFeature(i)} className="text-red-400 text-xs px-1">✕</button>
          </div>
        ))}
        <button onClick={addFeature} className="text-neon-cyan text-xs hover:underline">+ Add feature</button>
      </div>
      <label className="flex items-center gap-2 text-xs text-text-muted">
        <input type="checkbox" checked={form.isActive} onChange={e => update('isActive', e.target.checked)} className="accent-neon-cyan" />
        Active (visible to users)
      </label>
      <div className="flex gap-2 pt-2">
        <button onClick={handleSave} disabled={saving}
          className="flex-1 bg-brand-gradient text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50">
          {saving ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>
        <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-text-muted hover:text-text-primary">Cancel</button>
      </div>
    </div>
  );
}

function PlanForm({ plan, onSave, onCancel }) {
  const [form, setForm] = useState(plan || {
    name: '', slug: '', description: '', price: '', durationDays: '30',
    features: [''], isActive: true, badge: '',
  });
  const [saving, setSaving] = useState(false);

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const updateFeature = (i, val) => {
    const f = [...form.features];
    f[i] = val;
    update('features', f);
  };
  const addFeature = () => update('features', [...(form.features || []), '']);
  const removeFeature = (i) => update('features', form.features.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { ...form, price: Number(form.price), durationDays: Number(form.durationDays), features: form.features.filter(Boolean) };
      await onSave(data);
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-3">
      <FormInput label="Plan Name" value={form.name} onChange={e => { update('name', e.target.value); if (!plan) update('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')); }} />
      <FormInput label="Slug" value={form.slug} onChange={e => update('slug', e.target.value)} />
      <FormInput label="Description" value={form.description} onChange={e => update('description', e.target.value)} multiline />
      <div className="grid grid-cols-2 gap-3">
        <FormInput label="Price (₹)" type="number" value={form.price} onChange={e => update('price', e.target.value)} />
        <FormInput label="Duration (days)" type="number" value={form.durationDays} onChange={e => update('durationDays', e.target.value)} />
      </div>
      <FormInput label="Badge (e.g., Popular, Best Value)" value={form.badge} onChange={e => update('badge', e.target.value)} />
      <div>
        <label className="text-xs text-text-muted block mb-1">Features</label>
        {form.features.map((f, i) => (
          <div key={i} className="flex gap-1 mb-1">
            <input type="text" value={f} onChange={e => updateFeature(i, e.target.value)} placeholder="Feature" className="flex-1 bg-background border border-electric-violet/20 rounded-lg px-2 py-1.5 text-xs text-text-primary focus:outline-none focus:border-neon-cyan" />
            <button onClick={() => removeFeature(i)} className="text-red-400 text-xs px-1">✕</button>
          </div>
        ))}
        <button onClick={addFeature} className="text-neon-cyan text-xs hover:underline">+ Add feature</button>
      </div>
      <label className="flex items-center gap-2 text-xs text-text-muted">
        <input type="checkbox" checked={form.isActive} onChange={e => update('isActive', e.target.checked)} className="accent-neon-cyan" />
        Active
      </label>
      <div className="flex gap-2 pt-2">
        <button onClick={handleSave} disabled={saving}
          className="flex-1 bg-brand-gradient text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50">
          {saving ? 'Saving...' : plan ? 'Update Plan' : 'Create Plan'}
        </button>
        <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-text-muted hover:text-text-primary">Cancel</button>
      </div>
    </div>
  );
}
