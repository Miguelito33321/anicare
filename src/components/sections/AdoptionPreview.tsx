import Link from "next/link";
import { adoptionAnimals } from "@/content/adoptionAnimals";
import { AnimalCard } from "@/components/adopcion/AnimalCard";

export function AdoptionPreview() {
  const featured = adoptionAnimals.slice(0, 3);

  return (
    <section className="container py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">Animales esperando un hogar</h2>
          <p className="section-lead">Conoce compañeros listos para una adopción responsable.</p>
        </div>
        <Link href="/adopcion" className="btn-secondary btn-sm">
          Ver todos
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {featured.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </section>
  );
}