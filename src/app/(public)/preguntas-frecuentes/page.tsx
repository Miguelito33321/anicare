import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Preguntas frecuentes",
  description: "Resolvemos dudas sobre reservas, estancias y adopción en Anicare.",
  path: "/preguntas-frecuentes"
});

const faq = [
  {
    q: "¿Qué necesito para dejar a mi mascota en guardería?",
    a: "Datos del tutor, datos de la mascota y estado de vacunación actualizado."
  },
  {
    q: "¿Administran medicamentos?",
    a: "Sí, con el servicio extra de administración de medicamentos."
  },
  {
    q: "¿Cómo funciona la adopción?",
    a: "Formulario, entrevista breve y acompañamiento para una adopción responsable."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a
    }
  }))
};

export default function FAQPage() {
  return (
    <section className="container py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="section-title">Resolvemos tus dudas</h1>
      <div className="mt-8 space-y-3">
        {faq.map((item) => (
          <details key={item.q} className="card group">
            <summary className="cursor-pointer list-none font-semibold">{item.q}</summary>
            <p className="mt-2 text-sm text-brand-warmGray">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}