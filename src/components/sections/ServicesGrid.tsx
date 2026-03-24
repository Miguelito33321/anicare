import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type ServiceCard = {
  speciesLabel: string;
  priceLabel: string;
  description: string;
  badge: string;
  icon: ReactNode;
};

function DogIcon() {
  return (
    <Image
      src="https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-dog-face-line-icon-vector-png-image_1874330.jpg"
      alt="Icono de perro"
      width={36}
      height={36}
      className="h-9 w-9 object-contain"
    />
  );
}

function CatIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-9 w-9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.5 9.5 5.2 6.2c-.2-.5.3-1 .8-.8l3.1 1.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17.5 9.5l1.3-3.3c.2-.5-.3-1-.8-.8l-3.1 1.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7.2 10.8A5.8 5.8 0 0 1 12 8.5c1.8 0 3.4.8 4.5 2.1 1 1.2 1.5 2.6 1.5 4.1 0 2.7-2.2 4.8-5 4.8h-2c-2.8 0-5-2.1-5-4.8 0-1.5.5-2.9 1.2-3.9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M10 13.2h.01M14 13.2h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function RabbitIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-9 w-9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.2 6.2c-.9-1.5-1.3-2.9-.9-3.6.6-1 2.4.1 3.8 1.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14.8 6.2c.9-1.5 1.3-2.9.9-3.6-.6-1-2.4.1-3.8 1.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7.5 13.2c0-3 2.1-5.4 4.7-5.4s4.7 2.4 4.7 5.4c0 3-2.1 5.4-4.7 5.4s-4.7-2.4-4.7-5.4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M10.4 12.8h.01M14 12.8h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BirdIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-9 w-9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 13.2c0-3.6 2.6-6.5 5.9-6.5 2.5 0 4.6 1.7 5.4 4.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 13.2c0 3 2.5 5.4 5.6 5.4 2.9 0 5.3-2.1 5.6-4.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18.2 10.8c-1.5.2-2.9.9-3.9 1.9 1.2 0 2.5.4 3.6 1.2.7.5 1.7.1 1.8-.7.1-.7.1-1.6-.2-2.4-.2-.7-.7-1.1-1.3-1Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path d="M11.2 12.1h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const serviceCards: ServiceCard[] = [
  {
    speciesLabel: "Perros",
    priceLabel: "12 € / día",
    description: "Juego supervisado, descanso seguro y atención diaria.",
    badge: "Más solicitado",
    icon: <DogIcon />
  },
  {
    speciesLabel: "Gatos",
    priceLabel: "10 € / día",
    description: "Ambiente tranquilo, rutinas suaves y enriquecimiento.",
    badge: "Ambiente zen",
    icon: <CatIcon />
  },
  {
    speciesLabel: "Conejos",
    priceLabel: "6 € / día",
    description: "Zona calmada y alimentación controlada con supervisión.",
    badge: "Atención delicada",
    icon: <RabbitIcon />
  },
  {
    speciesLabel: "Aves",
    priceLabel: "4 € / día",
    description: "Espacio protegido, vigilancia diaria y cuidado cercano.",
    badge: "Cuidado seguro",
    icon: <BirdIcon />
  }
];

export function ServicesGrid() {
  return (
    <section className="container py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">Cuidado diario por especie</h2>
          <p className="section-lead">Tarifas claras, plazas limitadas y atención personalizada.</p>
        </div>
        <Link href="/servicios" className="btn-secondary btn-sm">
          Ver precios
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCards.map((card) => (
          <article
            key={card.speciesLabel}
            className="card card-hover relative overflow-hidden bg-gradient-to-br from-white/95 via-white/90 to-brand-sand/80 p-5"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-brand-pinkSoft/70 blur-2xl"
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 place-items-center rounded-3xl bg-white/90 text-brand-ink shadow-soft ring-1 ring-brand-border/70">
                    {card.icon}
                  </span>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-brand-pinkSoft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-ink">
                      {card.badge}
                    </span>
                    <h3 className="mt-2 text-xl font-extrabold">{card.speciesLabel}</h3>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/85 px-3 py-2 text-right shadow-sm ring-1 ring-brand-border/70">
                  <p className="text-[11px] uppercase tracking-wide text-brand-warmGray">Desde</p>
                  <p className="text-2xl font-extrabold text-brand-ink">{card.priceLabel}</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-brand-warmGray">{card.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/reservas" className="btn-primary btn-sm">
                  Reservar
                </Link>
                <Link href="/contacto" className="btn-ghost btn-sm">
                  Consultar
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="badge">Medicación +3</span>
                <span className="badge">Cuidados especiales +5</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}