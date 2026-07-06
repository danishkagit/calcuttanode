import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

export default function AdminDashboard() {
  const [section, setSection] = useState('overview');
  const [overview, setOverview] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [revenue, setRevenue] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ov, u, o, t, s, r] = await Promise.all([
          api.get('/admin/overview'),
          api.get('/admin/users'),
          api.get('/admin/orders'),
          api.get('/admin/transactions'),
          api.get('/admin/subscriptions'),
          api.get('/admin/revenue'),
        ]);
        setOverview(ov.data);
        setUsers(u.data);
        setOrders(o.data);
        setTransactions(t.data);
        setSubscriptions(s.data);
        setRevenue(r.data);
      } catch {}
    };
    fetchData();
  }, [refresh]);

  const updateStatus = async (orderId, status) => {
    try {
      await api.patch(`/admin/orders/${orderId}/status`, { status });
      setRefresh(r => r + 1);
    } catch { alert('Failed to update order'); }
  };

  const approveTransfer = async (txId, status) => {
    try {
      await api.patch(`/admin/transactions/${txId}/approve`, { status });
      setRefresh(r => r + 1);
    } catch { alert('Failed to update transaction'); }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'Users' },
    { id: 'orders', label: 'Orders' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'subscriptions', label: 'Subscriptions' },
    { id: 'revenue', label: 'Revenue Report' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-1">Admin Dashboard</h2>
      <p className="text-text-muted mb-6">Manage your platform</p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setSection(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${section === t.id ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30' : 'bg-electric-violet/10 text-text-muted hover:text-text-primary border border-transparent'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {section === 'overview' && overview && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: overview.totalUsers, color: 'text-neon-cyan' },
            { label: 'Total Orders', value: overview.totalOrders, color: 'text-blue-400' },
            { label: 'Total Revenue', value: `₹${overview.totalRevenue.toLocaleString()}`, color: 'text-green-400' },
            { label: 'Pending Orders', value: overview.pendingOrders, color: 'text-yellow-400' },
            { label: 'Pending Transfers', value: overview.pendingTransfers, color: 'text-red-400' },
            { label: 'Active Products', value: overview.totalProducts, color: 'text-purple-400' },
            { label: 'Active Subs', value: overview.activeSubs, color: 'text-pink-400' },
            { label: 'Pending Reviews', value: overview.pendingReviews, color: 'text-orange-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-background/50 rounded-xl p-5 border border-electric-violet/10">
              <p className="text-text-muted text-sm mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {section === 'users' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-text-muted border-b border-electric-violet/20">
                <th className="text-left py-3 px-2">Name</th>
                <th className="text-left py-3 px-2">Email</th>
                <th className="text-left py-3 px-2">Role</th>
                <th className="text-right py-3 px-2">Wallet</th>
                <th className="text-right py-3 px-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b border-electric-violet/10 hover:bg-electric-violet/5">
                  <td className="py-3 px-2 text-text-primary">{u.name}</td>
                  <td className="py-3 px-2 text-text-muted">{u.email}</td>
                  <td className="py-3 px-2"><span className={`text-xs px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>{u.role}</span></td>
                  <td className="py-3 px-2 text-right text-neon-cyan">₹{u.walletBalance}</td>
                  <td className="py-3 px-2 text-right text-text-muted text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section === 'orders' && (
        <div className="space-y-3">
          {orders.length === 0 ? <p className="text-text-muted">No orders</p> : (
            orders.map(o => (
              <div key={o._id} className="bg-background/50 rounded-xl p-4 border border-electric-violet/10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-text-primary font-medium">{o.serviceName}</p>
                    <p className="text-text-muted text-xs">{o.userId?.name || 'Unknown'} &bull; {o.userId?.email || ''}</p>
                    <p className="text-text-muted text-xs">₹{o.finalPrice || o.priceAtBooking} &bull; {new Date(o.createdAt).toLocaleDateString()}</p>
                    {o.couponCode && <p className="text-green-400 text-xs">Coupon: {o.couponCode}</p>}
                  </div>
                  <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)}
                    className="text-xs bg-background border border-electric-violet/20 rounded-lg px-2 py-1 text-text-primary focus:outline-none focus:border-neon-cyan">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                {o.remoteAccessNotes && <p className="text-text-muted text-xs bg-background rounded p-2">Notes: {o.remoteAccessNotes}</p>}
              </div>
            ))
          )}
        </div>
      )}

      {section === 'transactions' && (
        <div className="space-y-3">
          {transactions.length === 0 ? <p className="text-text-muted">No transactions</p> : (
            transactions.map(tx => (
              <div key={tx._id} className="bg-background/50 rounded-xl p-4 border border-electric-violet/10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-text-primary text-sm">{tx.description || tx.method}</p>
                    <p className="text-text-muted text-xs">{tx.userId?.name || 'Unknown'} &bull; {tx.method} &bull; {tx.utrNumber && `UTR: ${tx.utrNumber}`}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                    </p>
                    {tx.method === 'bank_transfer' && tx.status === 'pending' && (
                      <div className="flex gap-1 mt-2">
                        <button onClick={() => approveTransfer(tx._id, 'success')} className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded hover:bg-green-500/30">Approve</button>
                        <button onClick={() => approveTransfer(tx._id, 'failed')} className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded hover:bg-red-500/30">Reject</button>
                      </div>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
                      tx.status === 'success' ? 'bg-green-500/20 text-green-400' :
                      tx.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>{tx.status}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {section === 'subscriptions' && (
        <div className="space-y-3">
          {subscriptions.length === 0 ? <p className="text-text-muted">No subscriptions</p> : (
            subscriptions.map(s => (
              <div key={s._id} className="bg-background/50 rounded-xl p-4 border border-electric-violet/10 flex justify-between items-center">
                <div>
                  <p className="text-text-primary font-medium">{s.planName}</p>
                  <p className="text-text-muted text-xs">{s.userId?.name || 'Unknown'} &bull; {s.userId?.email || ''}</p>
                  <p className="text-text-muted text-xs">{new Date(s.startDate).toLocaleDateString()} - {new Date(s.endDate).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  s.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  s.status === 'expired' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>{s.status}</span>
              </div>
            ))
          )}
        </div>
      )}

      {section === 'revenue' && revenue && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10">
              <p className="text-text-muted text-sm mb-2">Revenue by Method</p>
              {revenue.byMethod.map(m => (
                <div key={m._id} className="flex justify-between text-sm py-1">
                  <span className="text-text-primary">{m._id || 'unknown'}</span>
                  <span className="text-neon-cyan font-medium">₹{m.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10">
              <p className="text-text-muted text-sm mb-2">Monthly Revenue</p>
              {revenue.monthly.slice(-6).map(m => (
                <div key={m._id} className="flex justify-between text-sm py-1">
                  <span className="text-text-primary">{m._id}</span>
                  <span className="text-green-400 font-medium">₹{m.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="bg-background/50 rounded-xl p-5 border border-electric-violet/10">
              <p className="text-text-muted text-sm mb-2">Top Services</p>
              {revenue.topServices.slice(0, 5).map(s => (
                <div key={s._id} className="flex justify-between text-sm py-1">
                  <span className="text-text-primary truncate mr-2">{s._id}</span>
                  <span className="text-purple-400 font-medium shrink-0">₹{s.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
