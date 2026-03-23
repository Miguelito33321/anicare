const reviews = [
  {
    quote: "Atención cercana y profesional. Mi perro estuvo tranquilo toda la semana.",
    author: "Marta R.",
    context: "Estancia de 7 días"
  },
  {
    quote: "Nos guiaron en la adopción paso a paso. Todo muy claro y humano.",
    author: "Carlos y Ana",
    context: "Adopción responsable"
  },
  {
    quote: "Servicio impecable, instalaciones limpias y equipo muy amable.",
    author: "Paula G.",
    context: "Guardería diaria"
  }
];

function Stars() {
  return (
    <div className="flex items-center gap-1 text-amber-500" aria-label="5 estrellas">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          aria-hidden
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.3 6.8 20l1-5.9L3.5 9.9l6-0.9L12 3.6l2.5 5.4 6 0.9-4.3 4.2 1 5.9L12 17.3Z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  return (
    <section className="container py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">Familias que ya confían en Anicare</h2>
          <p className="section-lead">Opiniones de clientes de guardería y adopción.</p>
        </div>
        <span className="badge">Reseñas destacadas</span>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.author} className="card card-hover relative overflow-hidden">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-brand-pinkSoft blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <Stars />
              <p className="mt-4 text-sm text-brand-ink">“{review.quote}”</p>
              <div className="mt-6">
                <p className="text-sm font-extrabold">{review.author}</p>
                <p className="mt-1 text-xs text-brand-warmGray">{review.context}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}