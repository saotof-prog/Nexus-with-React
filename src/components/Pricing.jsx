const plans = [
  {
    name: 'Initiate',
    price: '0',
    description: 'Pour explorer le réseau et prototyper.',
    features: ['5 000 requêtes/mois', '1 projet', 'Support communautaire'],
    highlighted: false,
  },
  {
    name: 'Ascend',
    price: '89',
    description: 'Pour les équipes qui passent à l\'échelle.',
    features: [
      'Requêtes illimitées',
      '10 projets',
      'Neural Sync inclus',
      'SLA 99.9%',
    ],
    highlighted: true,
  },
  {
    name: 'Apex',
    price: 'Sur mesure',
    description: 'Infrastructure dédiée et conformité enterprise.',
    features: [
      'Déploiement on-premise',
      'Ingénieur dédié',
      'Audit sécurité',
      'Contrat personnalisé',
    ],
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
            // Accès
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Choisissez votre trajectoire
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-lg p-8 ${
                plan.highlighted
                  ? 'border-glow border-cyan-400/30 bg-gradient-to-b from-cyan-500/10 to-slate-900/50'
                  : 'glass'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-slate-950">
                  Recommandé
                </span>
              )}
              <h3 className="font-display text-xl font-semibold text-white">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
              <p className="mt-6 font-display text-4xl font-bold text-white">
                {plan.price === 'Sur mesure' ? (
                  plan.price
                ) : (
                  <>
                    {plan.price}
                    <span className="text-lg font-normal text-slate-500">€/mois</span>
                  </>
                )}
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <span className="text-cyan-400">▸</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-8 block rounded py-3 text-center font-mono text-xs uppercase tracking-widest transition ${
                  plan.highlighted
                    ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
                    : 'border border-white/10 text-slate-300 hover:border-cyan-400/30 hover:text-cyan-200'
                }`}
              >
                {plan.price === 'Sur mesure' ? 'Nous contacter' : 'Commencer'}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
