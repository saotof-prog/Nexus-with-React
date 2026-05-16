const links = [
  { href: '#features', label: 'Capacités' },
  { href: '#stats', label: 'Métriques' },
  { href: '#pricing', label: 'Accès' },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-void/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="group flex items-center gap-2">
          <span className="relative flex h-8 w-8 items-center justify-center rounded border border-cyan-400/40 bg-cyan-400/10 font-mono text-xs text-cyan-300">
            NX
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
          </span>
          <span className="font-display text-lg font-bold tracking-[0.2em] text-white">
            NEXUS
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-cyan-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#cta"
          className="border-glow rounded bg-cyan-400/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-400/20"
        >
          Démarrer
        </a>
      </nav>
    </header>
  )
}
