import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="container py-12 md:py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-brand-border/80 bg-white/70 p-8 shadow-float md:p-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_15%_20%,rgba(244,182,194,0.45),transparent_60%),radial-gradient(700px_360px_at_85%_30%,rgba(245,237,226,0.85),transparent_55%)]"
          aria-hidden
        />

        <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <h2 className="text-3xl font-extrabold md:text-4xl">Tu mascota merece un lugar seguro y cariñoso</h2>
            <p className="mt-3 max-w-2xl text-sm text-brand-warmGray md:text-base">
              Reserva hoy o escríbenos para resolver dudas sobre estancias, adopciones o cuidados especiales.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="badge">Respuesta rápida</span>
              <span className="badge">Precios transparentes</span>
              <span className="badge">Cuidado profesional</span>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="grid gap-3">
              <Link href="/reservas" className="btn-primary w-full">
                Reservar cuidado
              </Link>
              <Link href="/adopcion" className="btn-secondary w-full">
                Ver animales
              </Link>
              <Link href="/contacto" className="btn-ghost w-full">
                Contactar
              </Link>
            </div>

            <p className="mt-4 text-xs text-brand-warmGray">
              Calle Ebanista 13, Salinetas - Telde. Horario: L-D 08:00-20:00.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}