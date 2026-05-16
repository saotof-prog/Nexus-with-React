export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-amber-400/5 blur-[80px]"
        aria-hidden
      />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2" aria-hidden>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee] animate-orbit" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center animate-orbit [animation-duration:28s] [animation-direction:reverse]">
          <div className="h-1.5 w-1.5 rounded-full bg-amber-400/80 shadow-[0_0_12px_#fbbf24]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/90">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-cyan-400" />
          Système v3.7 — En ligne
        </p>

        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          <span className="block">L&apos;avenir</span>
          <span className="mt-1 block bg-gradient-to-r from-cyan-300 via-white to-amber-200 bg-clip-text text-transparent animate-shimmer">
            s&apos;écrit en temps réel
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
          NEXUS fusionne données, cognition et interface pour propulser vos
          décisions au-delà du possible. Une plateforme conçue pour ceux qui
          construisent demain.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#cta"
            className="group relative overflow-hidden rounded bg-gradient-to-r from-cyan-500 to-cyan-400 px-8 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.35)] transition hover:shadow-[0_0_60px_rgba(34,211,238,0.5)]"
          >
            Accéder au réseau
          </a>
          <a
            href="#features"
            className="glass rounded px-8 py-3.5 font-mono text-sm uppercase tracking-widest text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-200"
          >
            Explorer →
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 font-mono text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">01</span> Latence &lt; 12ms
          </span>
          <span className="hidden h-4 w-px bg-white/10 sm:block" />
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">02</span> 99.99% uptime
          </span>
          <span className="hidden h-4 w-px bg-white/10 sm:block" />
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">03</span> Chiffrement quantique
          </span>
        </div>
      </div>
    </section>
  )
}
