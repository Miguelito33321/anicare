import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/adopcion", label: "Adopción" },
  { href: "/reservas", label: "Reservas" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" }
];

function PawMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5 text-brand-ink"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.2 11.2c.9 0 1.7-1 1.7-2.1S9.1 7 8.2 7s-1.7 1-1.7 2.1 0 2.1 1.7 2.1ZM15.8 11.2c.9 0 1.7-1 1.7-2.1S16.7 7 15.8 7s-1.7 1-1.7 2.1 0 2.1 1.7 2.1ZM5.9 14.5c.8 0 1.5-.8 1.5-1.9S6.7 10.7 5.9 10.7s-1.5.8-1.5 1.9.7 1.9 1.5 1.9ZM18.1 14.5c.8 0 1.5-.8 1.5-1.9s-.7-1.9-1.5-1.9-1.5.8-1.5 1.9.7 1.9 1.5 1.9Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 20.2c2.2 0 4-1.4 4-3.2 0-1.6-1.7-3.3-4-3.3s-4 1.7-4 3.3c0 1.8 1.8 3.2 4 3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-border/70 bg-white/70 backdrop-blur">
      <div className="container flex min-h-16 items-center justify-between gap-3 py-3">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-pinkSoft shadow-sm ring-1 ring-brand-border/70 transition group-hover:-translate-y-0.5 group-hover:shadow-soft">
            <PawMark />
          </span>
          <span className="font-display text-lg font-extrabold leading-none">Anicare</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-brand-warmGray transition hover:text-brand-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/adopcion" className="btn-ghost btn-sm">
            Ver animales
          </Link>
          <Link href="/reservas" className="btn-primary btn-sm">
            Reservar cuidado
          </Link>
        </div>

        <details className="relative md:hidden">
          <summary className="btn-secondary btn-sm cursor-pointer select-none list-none [&_::-webkit-details-marker]:hidden">
            <MenuIcon />
            Menú
          </summary>
          <div className="absolute right-0 mt-3 w-[min(92vw,360px)] rounded-3xl border border-brand-border/80 bg-white/95 p-3 shadow-float">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-sand"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 grid gap-2">
              <Link href="/reservas" className="btn-primary w-full">
                Reservar cuidado
              </Link>
              <Link href="/adopcion" className="btn-secondary w-full">
                Ver animales
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}