const indicators = [
  {
    title: "Personal cualificado",
    description: "Equipo formado en bienestar animal y manejo respetuoso.",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M4.5 21.25a7.5 7.5 0 0 1 15 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    title: "Instalaciones seguras",
    description: "Zonas separadas por especie, limpias y supervisadas.",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2.75 19.25 6v6.4c0 4.8-3.2 8.2-7.25 9.85C7.95 20.6 4.75 17.2 4.75 12.4V6L12 2.75Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 12.2 11 14l3.8-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    title: "Bienestar prioritario",
    description: "Rutinas de juego, descanso y seguimiento diario.",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 21s-7-4.5-9-10.2C1.6 7.2 3.8 4.5 7 4.5c1.8 0 3.2.9 4 2.1.8-1.2 2.2-2.1 4-2.1 3.2 0 5.4 2.7 4 6.3C19 16.5 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    title: "Adopción responsable",
    description: "Acompañamiento, requisitos claros y orientación para familias.",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 8.5c0-2.1 1.8-3.75 4-3.75 1.5 0 2.8.7 3.5 1.9.4.7 1.5.7 1.9 0 .7-1.2 2-1.9 3.5-1.9 2.2 0 4 1.65 4 3.75 0 4.55-6.95 8.95-8.9 10.1a1 1 0 0 1-.9 0C13.95 17.45 7 13.05 7 8.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M2 12.2h3.2l1.2-2.4 2 6 1.6-3.2H12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
];

export function TrustIndicators() {
  return (
    <section className="container py-10 md:py-14">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <h2 className="section-title">Por qué elegir Anicare</h2>
          <p className="section-lead">
            Un enfoque profesional y cercano para que tu mascota esté segura, tranquila y bien cuidada.
          </p>
        </div>
        <div className="md:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {indicators.map((item) => (
              <article key={item.title} className="card card-hover">
                <div className="flex items-start gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-sand ring-1 ring-brand-border/70">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold">{item.title}</h3>
                    <p className="mt-1 text-sm text-brand-warmGray">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-brand-border/80 bg-white/70 p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-extrabold">Promesa Anicare</p>
          <span className="badge">Cuidado diario y transparente</span>
        </div>
        <p className="mt-2 text-sm text-brand-warmGray">
          Plazas limitadas, rutinas claras y comunicación honesta para que siempre sepas cómo está tu mascota.
        </p>
      </div>
    </section>
  );
}