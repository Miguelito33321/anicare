import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { AdminShell } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../api/auth/[...nextauth]";

type AnimalEditProps = {
  animal: {
    id: string;
    name: string;
    species: string;
    ageMonths: number;
    size: string;
    temperament: string;
    healthStatus: string;
    adoptionRequirements: string;
    description: string;
    status: string;
    featured: boolean;
    imageUrl?: string | null;
    imageUrls: string[];
    createdAt?: string | null;
    updatedAt?: string | null;
  };
};

export default function AnimalEdit({ animal }: AnimalEditProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: animal.name,
    species: animal.species,
    ageMonths: animal.ageMonths,
    size: animal.size,
    temperament: animal.temperament,
    healthStatus: animal.healthStatus,
    adoptionRequirements: animal.adoptionRequirements,
    description: animal.description,
    status: animal.status,
    featured: animal.featured,
    imageUrl: animal.imageUrl ?? "",
    imageUrls: animal.imageUrls.join(", ")
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const imageUrl = String(form.imageUrl ?? "").trim();
    const extraImages = String(form.imageUrls)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const imageUrls = imageUrl ? [imageUrl, ...extraImages.filter((url) => url !== imageUrl)] : extraImages;

    const payload = {
      ...form,
      ageMonths: Number(form.ageMonths),
      imageUrl: imageUrl || null,
      imageUrls
    };

    const response = await fetch(`/api/admin/animals/${animal.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setSaving(false);

    if (!response.ok) {
      setError("No se pudo actualizar el animal.");
      return;
    }

    router.push("/admin/animals?updated=1");
  };

  return (
    <AdminShell
      title={`Editar ${animal.name}`}
      description="Actualiza la ficha del animal."
      actions={
        <Link href="/admin/animals" className="btn-secondary">
          Volver al listado
        </Link>
      }
    >
      <form className="card space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            Nombre
            <input
              name="name"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="text-sm">
            Especie
            <select
              name="species"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.species}
              onChange={handleChange}
            >
              <option value="DOG">Perro</option>
              <option value="CAT">Gato</option>
              <option value="RABBIT">Conejo</option>
              <option value="BIRD">Ave</option>
            </select>
          </label>
          <label className="text-sm">
            Edad en meses
            <input
              name="ageMonths"
              type="number"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.ageMonths}
              onChange={handleChange}
              required
            />
          </label>
          <label className="text-sm">
            Tamaño
            <input
              name="size"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.size}
              onChange={handleChange}
            />
          </label>
          <label className="text-sm">
            Temperamento
            <input
              name="temperament"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.temperament}
              onChange={handleChange}
            />
          </label>
          <label className="text-sm">
            Estado de salud
            <input
              name="healthStatus"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.healthStatus}
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="text-sm">
          Requisitos de adopción
          <textarea
            name="adoptionRequirements"
            className="mt-1 min-h-24 w-full rounded-xl border px-3 py-3"
            value={form.adoptionRequirements}
            onChange={handleChange}
          />
        </label>

        <label className="text-sm">
          Descripción
          <textarea
            name="description"
            className="mt-1 min-h-24 w-full rounded-xl border px-3 py-3"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            Estado
            <select
              name="status"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.status}
              onChange={handleChange}
            >
              <option value="AVAILABLE">Disponible</option>
              <option value="IN_PROCESS">En proceso</option>
              <option value="ADOPTED">Adoptado</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
            Destacado
          </label>
        </div>

        <label className="text-sm">
          URL principal de imagen
          <input
            name="imageUrl"
            className="mt-1 min-h-11 w-full rounded-xl border px-3"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>

        <label className="text-sm">
          URLs adicionales (separadas por coma)
          <input
            name="imageUrls"
            className="mt-1 min-h-11 w-full rounded-xl border px-3"
            value={String(form.imageUrls)}
            onChange={handleChange}
          />
        </label>

        {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

        <button className="btn-primary" type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </AdminShell>
  );
}

export const getServerSideProps: GetServerSideProps<AnimalEditProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const role = (session as unknown as { role?: string })?.role;

  if (!session || role !== "admin") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false
      }
    };
  }

  const id = context.params?.id;
  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  const animal = await prisma.animal.findUnique({ where: { id } });

  if (!animal) {
    return { notFound: true };
  }

  const imageUrl = (animal as unknown as { imageUrl?: string | null }).imageUrl ?? null;

  return {
    props: {
      animal: {
        id: animal.id,
        name: animal.name,
        species: animal.species,
        ageMonths: animal.ageMonths,
        size: animal.size ?? "",
        temperament: animal.temperament ?? "",
        healthStatus: animal.healthStatus ?? "",
        adoptionRequirements: animal.adoptionRequirements ?? "",
        description: animal.description ?? "",
        status: animal.status,
        featured: animal.featured,
        imageUrl,
        imageUrls: animal.imageUrls ?? [],
        createdAt: animal.createdAt?.toISOString() ?? null,
        updatedAt: animal.updatedAt ? animal.updatedAt.toISOString() : null
      }
    }
  };
};