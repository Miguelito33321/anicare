const steps = [
  {
    title: "Elige el tipo de mascota",
    description: "Selecciona la especie y conoce el precio diario al instante.",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 7.5h10M7 12h10M7 16.5h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6.5 3.75h11A2.75 2.75 0 0 1 20.25 6.5v11A2.75 2.75 0 0 1 17.5 20.25h-11A2.75 2.75 0 0 1 3.75 17.5v-11A2.75 2.75 0 0 1 6.5 3.75Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    )
  },
  {
    title: "Marca fechas y extras",
    description: "Elige inicio/fin y añade medicación o cuidados especiales si lo necesitas.",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 3.75v3M17 3.75v3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4.75 8.5h14.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6.5 5.75h11A2.75 2.75 0 0 1 20.25 8.5v9A2.75 2.75 0 0 1 17.5 20.25h-11A2.75 2.75 0 0 1 3.75 17.5v-9A2.75 2.75 0 0 1 6.5 5.75Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M9.2 13.2l1.7 1.7 3.9-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    title: "Confirma y recibe seguimiento",
    description: "Te enviamos confirmación por email y cuidamos de tu mascota con rutina diaria.",
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
  }
];

export function HowItWorks() {
  return (
    <section className="container py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">Cómo funciona</h2>
          <p className="section-lead">Reserva en minutos, con plazas validadas y precio transparente.</p>
        </div>
        <span className="badge">Proceso en 5 pasos</span>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.title} className="card card-hover">
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-pinkSoft text-brand-ink ring-1 ring-brand-border/70">
                {step.icon}
              </div>
              <span className="badge">Paso {index + 1}</span>
            </div>
            <h3 className="mt-5 text-lg font-extrabold">{step.title}</h3>
            <p className="mt-2 text-sm text-brand-warmGray">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}