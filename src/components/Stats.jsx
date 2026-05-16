const stats = [
  { value: '2.4M', label: 'Requêtes / sec', suffix: '+' },
  { value: '180', label: 'Pays connectés', suffix: '' },
  { value: '0.003', label: 'Taux d\'erreur', suffix: '%' },
  { value: '47', label: 'Datacenters', suffix: '' },
]

export default function Stats() {
  return (
    <section id="stats" className="relative border-y border-white/5 py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl font-bold text-glow text-cyan-300 sm:text-5xl">
                {stat.value}
                <span className="text-amber-400">{stat.suffix}</span>
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
