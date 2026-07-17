import { useMemo } from 'react';

const simulatedMonthlyData = [
  { _id: '2025-08', total: 245000 }, { _id: '2025-09', total: 312000 }, { _id: '2025-10', total: 289000 },
  { _id: '2025-11', total: 356000 }, { _id: '2025-12', total: 423000 }, { _id: '2026-01', total: 478000 },
  { _id: '2026-02', total: 445000 }, { _id: '2026-03', total: 512000 }, { _id: '2026-04', total: 567000 },
  { _id: '2026-05', total: 623000 }, { _id: '2026-06', total: 689000 }, { _id: '2026-07', total: 745000 },
];

const simulatedByMethod = [
  { _id: 'razorpay', total: 4820000 }, { _id: 'bank_transfer', total: 1250000 }, { _id: 'wallet', total: 890000 }, { _id: 'cash', total: 340000 },
];

const simulatedTopServices = [
  { _id: 'Website Development', revenue: 1850000 }, { _id: 'Digital Marketing', revenue: 1240000 },
  { _id: 'Mobile App Development', revenue: 980000 }, { _id: 'E-Commerce Setup', revenue: 720000 },
  { _id: 'SEO Optimization', revenue: 510000 },
];

const USD_RATE = 83;

function RevenueChart({ data, label, color }) {
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

export default function RevenueGoal({ revenue, overview }) {
  const monthlyData = (revenue?.monthly?.length > 0) ? revenue.monthly : simulatedMonthlyData;
  const byMethodData = (revenue?.byMethod?.length > 0) ? revenue.byMethod : simulatedByMethod;
  const topServicesData = (revenue?.topServices?.length > 0) ? revenue.topServices : simulatedTopServices;
  const totalRevenue = revenue?.totalRevenue || byMethodData.reduce((sum, m) => sum + m.total, 0);
  const currentMRR = Math.round(totalRevenue / (monthlyData.length || 1));
  const mrrUSD = Math.round(currentMRR / USD_RATE);
  const targetMRR = 1000;
  const progress = Math.min(100, (mrrUSD / targetMRR) * 100);
  const lastMonthTotal = monthlyData[monthlyData.length - 1]?.total || 0;
  const revenueGrowth = monthlyData.length >= 2
    ? ((monthlyData[monthlyData.length - 1].total - monthlyData[monthlyData.length - 2].total) / monthlyData[monthlyData.length - 2].total * 100).toFixed(1)
    : 0;

  const getProgressColor = (pct) => {
    if (pct >= 100) return 'bg-green-500';
    if (pct >= 50) return 'bg-neon-cyan';
    if (pct >= 25) return 'bg-yellow-500';
    return 'bg-electric-violet';
  };

  return (
    <div className="revenue-card bg-background/50 rounded-xl p-6 border mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          <h3 className="text-lg font-bold text-text-primary">$1,000 MRR Challenge</h3>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium border ${mrrUSD >= targetMRR ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20'}`}>
          {mrrUSD >= targetMRR ? '🎉 TARGET ACHIEVED!' : `${progress.toFixed(0)}% Complete`}
        </span>
      </div>

      <div className="mb-5">
        <div className="flex justify-between text-xs text-text-muted mb-1.5">
          <span>Current MRR: ${mrrUSD.toLocaleString()}</span>
          <span>Target: ${targetMRR.toLocaleString()}</span>
          <span className={revenueGrowth >= 0 ? 'text-green-400' : 'text-red-400'}>
            {revenueGrowth >= 0 ? '↑' : '↓'} {Math.abs(revenueGrowth)}% vs last month
          </span>
        </div>
        <div className="w-full bg-electric-violet/10 rounded-full h-4 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor(progress)}`} style={{ width: `${progress}%` }}>
            {progress >= 12 && (
              <span className="text-[10px] text-white font-bold flex items-center justify-center h-full">
                ${mrrUSD.toLocaleString()} / ${targetMRR.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <p className="text-[10px] text-text-muted mt-1 text-right">₹1 = ${(1 / USD_RATE).toFixed(4)} &middot; Current conversion rate</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-surface/30 rounded-lg p-3 text-center border border-neon-cyan/10">
          <p className="text-lg font-bold text-neon-cyan">${mrrUSD.toLocaleString()}</p>
          <p className="text-[10px] text-text-muted">Current MRR (USD)</p>
        </div>
        <div className="bg-surface/30 rounded-lg p-3 text-center border border-neon-cyan/10">
          <p className="text-lg font-bold revenue-value">₹{(lastMonthTotal || 0).toLocaleString()}</p>
          <p className="text-[10px] text-text-muted">Last Month (₹)</p>
        </div>
        <div className="bg-surface/30 rounded-lg p-3 text-center border border-neon-cyan/10">
          <p className="text-lg font-bold text-yellow-400">${Math.max(0, targetMRR - mrrUSD)}</p>
          <p className="text-[10px] text-text-muted">Remaining to Goal</p>
        </div>
        <div className="bg-surface/30 rounded-lg p-3 text-center border border-neon-cyan/10">
          <p className="text-lg font-bold text-neon-cyan">{overview?.totalUsers || 128}</p>
          <p className="text-[10px] text-text-muted">Total Customers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-surface/20 rounded-lg p-3 border border-neon-cyan/10">
          <p className="text-xs font-medium text-text-primary mb-3">💳 Revenue by Payment Method</p>
          <div className="space-y-2">
            {byMethodData.map(m => {
              const pct = (m.total / totalRevenue) * 100;
              return (
                <div key={m._id}>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className={`revenue-method-${m._id || 'unknown'} capitalize`}>{m._id?.replace(/_/g, ' ') || 'Unknown'}</span>
                    <span className="revenue-value">₹{m.total.toLocaleString()} ({pct.toFixed(1)}%)</span>
                  </div>
                  <div className="revenue-bar-bg rounded-full h-2 overflow-hidden">
                    <div className="revenue-bar h-full rounded-full chart-bar" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-surface/20 rounded-lg p-3 border border-neon-cyan/10">
          <p className="text-xs font-medium text-text-primary mb-3">🏆 Top Performing Services</p>
          <div className="space-y-2">
            {topServicesData.slice(0, 5).map(s => {
              const pct = (s.revenue / totalRevenue) * 100;
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
      </div>

      <div className="bg-surface/20 rounded-lg p-3 border border-neon-cyan/10">
        <p className="text-xs font-medium text-text-primary mb-3">📊 12-Month Revenue Trend</p>
        <RevenueChart data={monthlyData} />
      </div>

      <div className="bg-surface/20 rounded-lg p-3 border border-neon-cyan/10 mt-4">
        <p className="text-xs font-medium text-text-primary mb-2">📊 Case Study Performance</p>
        <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
          <div>
            <p className="text-neon-cyan font-bold">22</p>
            <p className="text-text-muted">Case Studies</p>
          </div>
          <div>
            <p className="text-neon-cyan font-bold">66+</p>
            <p className="text-text-muted">Projects Shown</p>
          </div>
          <div>
            <p className="text-neon-cyan font-bold">12+</p>
            <p className="text-text-muted">Industries</p>
          </div>
          <div>
            <p className="text-neon-cyan font-bold">8</p>
            <p className="text-text-muted">Countries</p>
          </div>
        </div>
      </div>
    </div>
  );
}
