import { useMemo } from 'react';

export default function RevenueGoal({ revenue, overview }) {
  const monthlyData = revenue?.monthly || [];
  const byMethodData = revenue?.byMethod || [];
  const topServicesData = revenue?.topServices || [];
  const totalRevenue = revenue?.totalRevenue || 0;
  const userCount = overview?.totalUsers || 0;

  if (!monthlyData.length && !totalRevenue) {
    return (
      <div className="revenue-card bg-background/50 rounded-xl p-6 border mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📊</span>
          <h3 className="text-lg font-bold text-text-primary">Revenue Overview</h3>
        </div>
        <p className="text-text-muted text-sm">Revenue data will appear here once transactions are recorded.</p>
      </div>
    );
  }

  const lastMonthTotal = monthlyData.length > 0 ? monthlyData[monthlyData.length - 1]?.total || 0 : 0;
  const revenueGrowth = monthlyData.length >= 2
    ? ((monthlyData[monthlyData.length - 1].total - monthlyData[monthlyData.length - 2].total) / monthlyData[monthlyData.length - 2].total * 100).toFixed(1)
    : 0;

  return (
    <div className="revenue-card bg-background/50 rounded-xl p-6 border mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📊</span>
          <h3 className="text-lg font-bold text-text-primary">Revenue Overview</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-surface/30 rounded-lg p-3 text-center border border-neon-cyan/10">
          <p className="text-lg font-bold revenue-value">₹{(totalRevenue || 0).toLocaleString()}</p>
          <p className="text-[10px] text-text-muted">Total Revenue (₹)</p>
        </div>
        <div className="bg-surface/30 rounded-lg p-3 text-center border border-neon-cyan/10">
          <p className="text-lg font-bold revenue-value">₹{(lastMonthTotal || 0).toLocaleString()}</p>
          <p className="text-[10px] text-text-muted">Last Month (₹)</p>
        </div>
        <div className="bg-surface/30 rounded-lg p-3 text-center border border-neon-cyan/10">
          <p className={`text-lg font-bold ${revenueGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {revenueGrowth ? `${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth}%` : '—'}
          </p>
          <p className="text-[10px] text-text-muted">vs Last Month</p>
        </div>
        <div className="bg-surface/30 rounded-lg p-3 text-center border border-neon-cyan/10">
          <p className="text-lg font-bold text-neon-cyan">{userCount}</p>
          <p className="text-[10px] text-text-muted">Customers</p>
        </div>
      </div>

      {byMethodData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-surface/20 rounded-lg p-3 border border-neon-cyan/10">
            <p className="text-xs font-medium text-text-primary mb-3">Revenue by Payment Method</p>
            <div className="space-y-2">
              {byMethodData.map(m => {
                const pct = (m.total / (totalRevenue || 1)) * 100;
                return (
                  <div key={m._id}>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="capitalize">{m._id?.replace(/_/g, ' ') || 'Unknown'}</span>
                      <span className="revenue-value">₹{m.total.toLocaleString()}</span>
                    </div>
                    <div className="revenue-bar-bg rounded-full h-2 overflow-hidden">
                      <div className="revenue-bar h-full rounded-full chart-bar" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {topServicesData.length > 0 && (
            <div className="bg-surface/20 rounded-lg p-3 border border-neon-cyan/10">
              <p className="text-xs font-medium text-text-primary mb-3">Top Performing Services</p>
              <div className="space-y-2">
                {topServicesData.slice(0, 5).map(s => {
                  const pct = (s.revenue / (totalRevenue || 1)) * 100;
                  return (
                    <div key={s._id}>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="text-text-primary truncate mr-2">{s._id}</span>
                        <span className="revenue-value shrink-0">₹{s.revenue.toLocaleString()}</span>
                      </div>
                      <div className="revenue-bar-bg rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-electric-violet to-neon-cyan h-full rounded-full chart-bar" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {monthlyData.length > 0 && (
        <div className="bg-surface/20 rounded-lg p-3 border border-neon-cyan/10">
          <p className="text-xs font-medium text-text-primary mb-3">Revenue Trend</p>
          <RevenueChart data={monthlyData} />
        </div>
      )}
    </div>
  );
}

function RevenueChart({ data }) {
  const maxVal = Math.max(...data.map(d => d.total), 1);
  return (
    <div className="space-y-1.5">
      {data.map(d => (
        <div key={d._id} className="flex items-center gap-2">
          <span className="text-text-muted text-[10px] w-12 shrink-0">{d._id}</span>
          <div className="flex-1 revenue-bar-bg rounded-full h-5 overflow-hidden relative">
            <div className="revenue-bar h-full rounded-full chart-bar transition-all duration-1000" style={{ width: `${(d.total / maxVal) * 100}%` }}>
              <span className="absolute inset-0 flex items-center justify-end pr-2 text-[9px] text-white font-bold opacity-0 md:opacity-100" style={{ opacity: d.total / maxVal > 0.3 ? 1 : 0 }}>
                ₹{(d.total / 1000).toFixed(1)}K
              </span>
            </div>
          </div>
          <span className="revenue-value text-[10px] w-16 text-right font-semibold">₹{d.total.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
