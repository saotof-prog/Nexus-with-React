export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-cyan-400/30 bg-cyan-400/10 font-mono text-[10px] text-cyan-300">
            NX
          </span>
          <span className="font-display text-sm font-bold tracking-widest text-slate-400">
            NEXUS © 2026
          </span>
        </div>
        <p className="font-mono text-xs text-slate-600">
          Construit pour l&apos;ère post-numérique
        </p>
        <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-slate-500">
          <a href="#" className="transition hover:text-cyan-300">
            Docs
          </a>
          <a href="#" className="transition hover:text-cyan-300">
            Status
          </a>
          <a href="#" className="transition hover:text-cyan-300">
            Legal
          </a>
        </div>
      </div>
    </footer>
  )
}
