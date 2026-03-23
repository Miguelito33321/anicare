import { AdoptionClientSection } from "@/components/adopcion/AdoptionClientSection";
import { adoptionAnimals } from "@/content/adoptionAnimals";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Adopción responsable en Gran Canaria",
  description: "Encuentra animales en adopción en Telde con filtros por especie, edad, tamaño y carácter.",
  path: "/adopcion"
});

export default function AdoptionPage() {
  return (
    <section className="container py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="section-title">Adopta con responsabilidad, cambia una vida</h1>
          <p className="section-lead max-w-2xl">
            Conoce animales listos para formar parte de tu familia. Te acompañamos en cada paso.
          </p>
        </div>
        <span className="badge badge-success">Adopción segura</span>
      </div>

      <AdoptionClientSection animals={adoptionAnimals} />
    </section>
  );
}