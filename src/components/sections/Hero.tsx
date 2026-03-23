import Link from "next/link";

const capacities = [
  { label: "Perros", value: "10 plazas" },
  { label: "Gatos", value: "10 plazas" },
  { label: "Conejos", value: "10 plazas" },
  { label: "Aves", value: "15 plazas" }
];

function SparkIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2l1.3 6.2L20 10l-6.7 1.8L12 18l-1.3-6.2L4 10l6.7-1.8L12 2Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  );
}

function HeartIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21s-7-4.5-9-10.2C1.6 7.2 3.8 4.5 7 4.5c1.8 0 3.2.9 4 2.1.8-1.2 2.2-2.1 4-2.1 3.2 0 5.4 2.7 4 6.3C19 16.5 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" aria-hidden />
      <div className="container relative py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <span className="badge">
              <SparkIcon /> Guardería + Refugio + Adopción
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] md:text-6xl">
              Cuidado premium para tu mascota en Gran Canaria
            </h1>
            <p className="mt-4 max-w-xl text-base text-brand-warmGray md:text-lg">
              Guardería diaria en Salinetas (Telde) con equipo cualificado, espacios seguros y seguimiento cercano.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reservas" className="btn-primary">
                Reservar cuidado
              </Link>
              <Link href="/adopcion" className="btn-secondary">
                Ver animales
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-brand-border/80 bg-white/65 p-4 shadow-soft">
                <div className="flex items-center gap-2 text-sm font-extrabold">
                  <ShieldIcon />
                  Seguridad
                </div>
                <p className="mt-2 text-xs text-brand-warmGray">Protocolos y zonas separadas por especie.</p>
              </div>
              <div className="rounded-3xl border border-brand-border/80 bg-white/65 p-4 shadow-soft">
                <div className="flex items-center gap-2 text-sm font-extrabold">
                  <HeartIcon />
                  Bienestar
                </div>
                <p className="mt-2 text-xs text-brand-warmGray">Rutinas de juego, descanso y observación diaria.</p>
              </div>
              <div className="rounded-3xl border border-brand-border/80 bg-white/65 p-4 shadow-soft">
                <div className="text-sm font-extrabold">Respuesta rápida</div>
                <p className="mt-2 text-xs text-brand-warmGray">Confirmación por email y soporte en contacto.</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="card relative overflow-hidden">
              <div
                className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-brand-pink/35 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-beige/80 blur-3xl"
                aria-hidden
              />

              <div className="relative">
                <h2 className="text-lg font-extrabold">Capacidad y horarios</h2>
                <p className="mt-2 text-sm text-brand-warmGray">Plazas limitadas para mantener un cuidado cercano.</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {capacities.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-brand-border/80 bg-white/75 p-4 shadow-soft"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-warmGray">{item.label}</p>
                      <p className="mt-2 text-lg font-extrabold text-brand-ink">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl border border-brand-border/80 bg-white/75 p-5 shadow-soft">
                  <p className="text-sm font-extrabold">Abierto L-D</p>
                  <p className="mt-1 text-sm text-brand-warmGray">08:00-20:00</p>
                  <p className="mt-3 text-xs text-brand-warmGray">Calle Ebanista 13, Salinetas - Telde</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}