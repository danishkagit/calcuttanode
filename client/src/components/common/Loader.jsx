/* ============================================================
   LOADER — full-screen or inline spinner
   Props: fullScreen (boolean) — centers on entire viewport
   ============================================================ */

export default function Loader({ fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-brand-bg flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-surface-light border-t-brand-cyan rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brand-muted text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-10 h-10 border-4 border-brand-surface-light border-t-brand-cyan rounded-full animate-spin" />
    </div>
  )
}
