import Link from "next/link";

export type AnimalCardData = {
  id: string;
  name: string;
  species: string;
  ageLabel: string;
  ageGroup: string;
  size: string;
  temperament: string;
  description: string;
  status: "AVAILABLE" | "IN_PROCESS" | "ADOPTED";
  imageUrl?: string | null;
};

const placeholderImage = "/placeholder-pet.svg";

const statusLabels: Record<AnimalCardData["status"], string> = {
  AVAILABLE: "Disponible",
  IN_PROCESS: "En proceso",
  ADOPTED: "Adoptado"
};

const statusBadges: Record<AnimalCardData["status"], string> = {
  AVAILABLE: "badge badge-success",
  IN_PROCESS: "badge badge-warning",
  ADOPTED: "badge"
};

function AnimalPhoto({ name, imageUrl }: { name: string; imageUrl?: string | null }) {
  const imageSrc = imageUrl?.trim() ? imageUrl : placeholderImage;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-border/80 bg-brand-sand shadow-soft">
      <div className="absolute inset-0 bg-[radial-gradient(650px_260px_at_20%_15%,rgba(244,182,194,0.35),transparent_60%),radial-gradient(520px_240px_at_85%_35%,rgba(245,237,226,0.85),transparent_55%)]" />
      <div className="relative aspect-[4/3]">
        <img
          src={imageSrc}
          alt={`Foto de ${name}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export function AnimalCard({ animal }: { animal: AnimalCardData }) {
  return (
    <article className="card card-hover">
      <AnimalPhoto name={animal.name} imageUrl={animal.imageUrl} />

      <div className="mt-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-extrabold">{animal.name}</h3>
        <span className={statusBadges[animal.status]}>{statusLabels[animal.status]}</span>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <span className="badge">{animal.species}</span>
        <span className="badge">{animal.ageLabel}</span>
        <span className="badge">{animal.size}</span>
        <span className="badge">{animal.temperament}</span>
      </div>

      <p className="mt-3 text-sm text-brand-warmGray">{animal.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link href="/adopcion#solicitud-adopcion" className="btn-primary btn-sm">
          Solicitar adopción
        </Link>
      </div>
    </article>
  );
}