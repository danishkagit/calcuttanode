export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20" role="status" aria-label="Loading">
      <div className="relative w-11 h-11">
        <div className="absolute inset-0 rounded-full border-[3px] border-border" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-neon-cyan border-r-electric-violet animate-spin" />
        <span className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-neon-cyan animate-pulse-glow" />
      </div>
      <span className="text-xs font-mono text-text-faint tracking-widest">CONNECTING NODE…</span>
    </div>
  );
}
