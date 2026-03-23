import { ContactForm } from "@/components/forms/ContactForm";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contacto",
  description: "Contacta con Anicare para reservas, adopciones y consultas en Telde.",
  path: "/contacto"
});

export default function ContactPage() {
  return (
    <section className="container py-12 md:py-16">
      <LocalBusinessJsonLd />
      <h1 className="section-title">Estamos aquí para ayudarte</h1>
      <p className="section-lead">Calle Ebanista 13, Salinetas - Telde, Gran Canaria</p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <ContactForm />

        <div className="card">
          <h2 className="font-[var(--font-nunito)] text-lg font-bold">Datos de contacto</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-warmGray">
            <li>Teléfono: 873 64 52 31</li>
            <li>Email: anicare@gmail.com</li>
            <li>Horario: L-D 08:00-20:00</li>
          </ul>

          <div className="mt-4 overflow-hidden rounded-xl border">
            <iframe
              title="Mapa Anicare"
              src="https://www.google.com/maps?q=Calle+Ebanista+13+Salinetas+Telde+Gran+Canaria&output=embed"
              width="100%"
              height="280"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}