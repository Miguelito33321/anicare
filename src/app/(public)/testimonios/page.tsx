import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Testimonios",
  description: "Opiniones reales de familias que confían en Anicare.",
  path: "/testimonios"
});

const testimonials = [
  "Mi perro regresó tranquilo y feliz.",
  "Proceso de adopción claro, responsable y cercano.",
  "Atención excelente y seguimiento diario."
];

export default function TestimonialsPage() {
  return (
    <section className="container py-12 md:py-16">
      <h1 className="section-title">Familias que ya confían en Anicare</h1>
      <p className="section-lead">Historias reales de cuidado y adopción responsable.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {testimonials.map((text, idx) => (
          <article key={idx} className="card text-sm text-brand-warmGray">
            “{text}”
          </article>
        ))}
      </div>
    </section>
  );
}