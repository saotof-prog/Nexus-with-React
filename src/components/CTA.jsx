export default function CTA() {
  return (
    <section id="cta" className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="glass relative overflow-hidden rounded-2xl border-cyan-400/20 p-10 text-center sm:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(34,211,238,0.15) 0%, transparent 70%)',
            }}
          />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Prêt à franchir le seuil ?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-400">
              Rejoignez 12 000+ innovateurs qui pilotent déjà leurs systèmes
              via NEXUS. Déploiement en moins de 4 minutes.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 rounded border border-white/10 bg-slate-950/60 px-4 py-3 font-mono text-sm text-white placeholder:text-slate-600 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30"
                aria-label="Adresse e-mail"
              />
              <button
                type="submit"
                className="rounded bg-gradient-to-r from-cyan-500 to-cyan-400 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-slate-950 transition hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
              >
                Rejoindre
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
