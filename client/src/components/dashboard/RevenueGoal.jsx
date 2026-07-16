export default function RevenueGoal({ revenue, overview }) {
  const targetMRR = 1000;
  const usdRate = 83;
  const currentMRR = ((revenue?.totalRevenue || 0) / usdRate).toFixed(0);
  const progress = Math.min(100, ((parseFloat(currentMRR) / targetMRR) * 100));
  const monthlyData = revenue?.monthly || [];
  const lastMonthTotal = monthlyData.length > 0 ? monthlyData[monthlyData.length - 1]?.total || 0 : 0;

  const getProgressColor = (pct) => {
    if (pct >= 100) return 'bg-green-500';
    if (pct >= 50) return 'bg-neon-cyan';
    if (pct >= 25) return 'bg-yellow-500';
    return 'bg-electric-violet';
  };

  return (
    <div className="bg-background/50 rounded-xl p-6 border border-neon-cyan/20 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          <h3 className="text-lg font-bold text-text-primary">$1,000 MRR Challenge</h3>
        </div>
        <span className="text-xs bg-neon-cyan/10 text-neon-cyan px-3 py-1 rounded-full font-medium border border-neon-cyan/20">
          {parseFloat(currentMRR) >= targetMRR ? '🎉 TARGET ACHIEVED!' : `${progress.toFixed(0)}% Complete`}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-text-muted mb-1.5">
          <span>Current MRR: ${parseInt(currentMRR).toLocaleString()}</span>
          <span>Target: ${targetMRR.toLocaleString()}</span>
        </div>
        <div className="w-full bg-electric-violet/10 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          >
            {progress >= 15 && (
              <span className="text-[10px] text-white font-bold flex items-center justify-center h-full">
                ${parseInt(currentMRR).toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <p className="text-[10px] text-text-muted mt-1 text-right">
          ₹1 = ${(1 / usdRate).toFixed(4)} &middot; Conversion rate
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-surface/30 rounded-lg p-3 text-center border border-electric-violet/5">
          <p className="text-lg font-bold text-neon-cyan">${parseInt(currentMRR)}</p>
          <p className="text-[10px] text-text-muted">Current MRR</p>
        </div>
        <div className="bg-surface/30 rounded-lg p-3 text-center border border-electric-violet/5">
          <p className="text-lg font-bold text-yellow-400">₹{(lastMonthTotal || 0).toLocaleString()}</p>
          <p className="text-[10px] text-text-muted">Last Month (₹)</p>
        </div>
        <div className="bg-surface/30 rounded-lg p-3 text-center border border-electric-violet/5">
          <p className="text-lg font-bold text-green-400">${targetMRR - parseInt(currentMRR)}</p>
          <p className="text-[10px] text-text-muted">Remaining to Goal</p>
        </div>
        <div className="bg-surface/30 rounded-lg p-3 text-center border border-electric-violet/5">
          <p className="text-lg font-bold text-purple-400">{overview?.totalUsers || 0}</p>
          <p className="text-[10px] text-text-muted">Total Customers</p>
        </div>
      </div>

      {/* Case Study Traffic (simulated) */}
      <div className="bg-electric-violet/5 rounded-lg p-3 border border-electric-violet/10">
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

      {/* Monthly Revenue Trend */}
      {monthlyData.length > 0 && (
        <div className="mt-4 bg-surface/20 rounded-lg p-3 border border-electric-violet/5">
          <p className="text-xs font-medium text-text-primary mb-2">📈 Monthly Revenue Trend (₹)</p>
          <div className="space-y-1">
            {monthlyData.slice(-6).map(m => {
              const maxVal = Math.max(...monthlyData.slice(-6).map(x => x.total), 1);
              return (
                <div key={m._id} className="flex items-center gap-2 text-[10px]">
                  <span className="text-text-muted w-12 shrink-0">{m._id}</span>
                  <div className="flex-1 bg-electric-violet/10 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-brand-gradient h-full rounded-full" style={{ width: `${(m.total / maxVal) * 100}%` }} />
                  </div>
                  <span className="text-green-400 w-16 text-right">₹{m.total.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
