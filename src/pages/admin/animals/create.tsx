import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { AdminShell } from "@/components/admin/AdminShell";
import { authOptions } from "../../api/auth/[...nextauth]";

export default function CreateAnimal() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    species: "DOG",
    ageMonths: 0,
    size: "",
    temperament: "",
    healthStatus: "",
    adoptionRequirements: "",
    description: "",
    status: "AVAILABLE",
    featured: false,
    imageUrl: "",
    imageUrls: ""
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

    const imageUrl = form.imageUrl.trim();
    const extraImages = form.imageUrls
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

    const response = await fetch("/api/admin/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setSaving(false);

    if (!response.ok) {
      setError("No se pudo crear el animal. Revisa los datos.");
      return;
    }

    router.push("/admin/animals?created=1");
  };

  return (
    <AdminShell
      title="Crear animal"
      description="Completa la ficha para publicar un nuevo animal."
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
            value={form.imageUrls}
            onChange={handleChange}
          />
        </label>

        {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

        <button className="btn-primary" type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Crear animal"}
        </button>
      </form>
    </AdminShell>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  return { props: {} };
};