const features = [
  {
    id: '01',
    title: 'Neural Sync',
    description:
      'Synchronisation cognitive en temps réel entre vos équipes et les modèles prédictifs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Data Horizon',
    description:
      'Visualisation multidimensionnelle de flux massifs avec rendu GPU accéléré.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 17l6-6 4 4 8-10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 5h4v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Shield Matrix',
    description:
      'Couche de sécurité adaptative avec détection d\'anomalies par apprentissage fédéré.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Quantum API',
    description:
      'Endpoints ultra-réactifs avec orchestration automatique et scaling prédictif.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: '05',
    title: 'Holo Interface',
    description:
      'Composants UI adaptatifs qui réagissent au contexte utilisateur et à l\'environnement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 6h16M4 12h10M4 18h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: '06',
    title: 'Void Analytics',
    description:
      'Tableaux de bord immersifs avec projections AR et alertes prédictives.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v9l6 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
            // Capacités
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Infrastructure du futur
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Six modules interconnectés pour transformer vos données en avantage
            stratégique.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="glass group relative overflow-hidden rounded-lg p-6 transition duration-300 hover:border-cyan-400/25 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
            >
              <div className="absolute -right-4 -top-4 font-display text-6xl font-bold text-white/[0.03]">
                {feature.id}
              </div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 transition group-hover:border-cyan-400/40 group-hover:text-cyan-200">
                {feature.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
