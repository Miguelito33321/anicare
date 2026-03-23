import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Servicios y precios",
  description: "Tarifas diarias por especie y servicios extra de guardería en Anicare.",
  path: "/servicios"
});

const prices = [
  { species: "Perros", price: "12 EUR/día" },
  { species: "Gatos", price: "10 EUR/día" },
  { species: "Conejos", price: "6 EUR/día" },
  { species: "Aves", price: "4 EUR/día" }
];

export default function ServicesPage() {
  return (
    <section className="container py-12 md:py-16">
      <h1 className="section-title">Guardería y cuidados diarios para mascotas</h1>
      <p className="section-lead">Tarifas transparentes y atención personalizada por especie.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {prices.map((row) => (
          <article key={row.species} className="card">
            <h2 className="font-[var(--font-nunito)] text-lg font-bold">{row.species}</h2>
            <p className="mt-2 text-2xl font-extrabold">{row.price}</p>
          </article>
        ))}
      </div>

      <article className="card mt-6">
        <h2 className="font-[var(--font-nunito)] text-lg font-bold">Servicios extra</h2>
        <ul className="mt-3 space-y-2 text-sm text-brand-warmGray">
          <li>Administración de medicamentos: 3 EUR/día</li>
          <li>Cuidados especiales: 5 EUR/día</li>
        </ul>
      </article>

      <article className="card mt-6">
        <h2 className="font-[var(--font-nunito)] text-lg font-bold">Capacidad máxima</h2>
        <p className="mt-2 text-sm text-brand-warmGray">
          10 perros, 10 gatos, 10 conejos y 15 aves (total 45 animales).
        </p>
      </article>

      <div className="mt-8">
        <Link href="/reservas" className="btn-primary">
          Reservar estancia
        </Link>
      </div>
    </section>
  );
}