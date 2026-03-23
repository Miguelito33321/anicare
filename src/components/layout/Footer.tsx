import Link from "next/link";

function TikTokIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 4c.5 1.7 2 3 3.7 3.2V9c-1.4-.1-2.8-.6-3.7-1.5v6.8a4 4 0 1 1-2-3.5V5.2c.6.4 1.3.7 2 .8V4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-brand-border/70 bg-white/70 backdrop-blur">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-xl font-extrabold">Anicare</h2>
            <p className="mt-3 max-w-md text-sm text-brand-warmGray">
              Guardería para mascotas, refugio temporal y adopción responsable en Salinetas (Telde), Gran Canaria.
            </p>

            <div className="mt-5 grid gap-2 text-sm text-brand-warmGray">
              <p>
                <span className="font-semibold text-brand-ink">Dirección:</span> Calle Ebanista 13, Salinetas - Telde
              </p>
              <p>
                <span className="font-semibold text-brand-ink">Horario:</span> L-D 08:00-20:00
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <a
                href="https://www.tiktok.com/@anicare33"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary btn-sm"
              >
                <TikTokIcon />
                TikTok
              </a>
              <a href="tel:+34873645231" className="btn-ghost btn-sm">
                +34 873 64 52 31
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-extrabold text-brand-ink">Servicios</h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-warmGray">
              <li>
                <Link className="transition hover:text-brand-ink" href="/reservas">
                  Reservas
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-brand-ink" href="/servicios">
                  Precios
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-brand-ink" href="/contacto">
                  Consultas
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-extrabold text-brand-ink">Adopción</h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-warmGray">
              <li>
                <Link className="transition hover:text-brand-ink" href="/adopcion">
                  Ver animales
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-brand-ink" href="/sobre-nosotros">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-brand-ink" href="/blog">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-extrabold text-brand-ink">Contacto</h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-warmGray">
              <li>
                <Link className="transition hover:text-brand-ink" href="/contacto">
                  Formulario
                </Link>
              </li>
              <li>
                <a className="transition hover:text-brand-ink" href="mailto:anicare@gmail.com">
                  anicare@gmail.com
                </a>
              </li>
              <li>
                <a className="transition hover:text-brand-ink" href="tel:+34873645231">
                  +34 873 64 52 31
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-brand-border/70 pt-6 text-xs text-brand-warmGray">
          <p>(c) {year} Anicare. Todos los derechos reservados.</p>
          <p>Gran Canaria, España.</p>
        </div>
      </div>
    </footer>
  );
}