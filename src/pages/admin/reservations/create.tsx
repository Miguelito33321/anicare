import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { AdminShell } from "@/components/admin/AdminShell";
import { authOptions } from "../../api/auth/[...nextauth]";

const toIsoDate = (value: string) => new Date(value + "T00:00:00.000Z").toISOString();

export default function CreateReservation() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    petName: "",
    species: "DOG",
    vaccinated: true,
    startDate: "",
    endDate: "",
    extras: [] as string[],
    notes: ""
  });

  const toggleExtra = (value: string) => {
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(value) ? prev.extras.filter((item) => item !== value) : [...prev.extras, value]
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validateForm = () => {
    if (!form.ownerName.trim() || !form.ownerPhone.trim() || !form.ownerEmail.trim()) {
      return "Completa los datos del tutor.";
    }
    if (!form.petName.trim()) {
      return "Completa el nombre de la mascota.";
    }
    if (!form.startDate || !form.endDate) {
      return "Selecciona las fechas de la estancia.";
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      return "La fecha fin no puede ser anterior a la fecha inicio.";
    }
    return "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const validation = validateForm();
    if (validation) {
      setSaving(false);
      setError(validation);
      return;
    }

    const response = await fetch("/api/admin/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner: {
          fullName: form.ownerName.trim(),
          phone: form.ownerPhone.trim(),
          email: form.ownerEmail.trim()
        },
        pet: {
          name: form.petName.trim(),
          species: form.species,
          vaccinated: form.vaccinated
        },
        stay: {
          startDate: toIsoDate(form.startDate),
          endDate: toIsoDate(form.endDate)
        },
        extras: form.extras,
        notes: form.notes.trim() || undefined
      })
    });

    setSaving(false);

    if (!response.ok) {
      setError("No se pudo crear la reserva. Revisa los datos.");
      return;
    }

    router.push("/admin/reservations?created=1");
  };

  return (
    <AdminShell
      title="Crear reserva"
      description="Registra una nueva estancia desde el panel."
      actions={
        <Link href="/admin/reservations" className="btn-secondary">
          Volver al listado
        </Link>
      }
    >
      <form className="card space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            Nombre del tutor
            <input
              name="ownerName"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.ownerName}
              onChange={handleChange}
              required
            />
          </label>
          <label className="text-sm">
            Teléfono
            <input
              name="ownerPhone"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.ownerPhone}
              onChange={handleChange}
              required
            />
          </label>
          <label className="text-sm">
            Email
            <input
              type="email"
              name="ownerEmail"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.ownerEmail}
              onChange={handleChange}
              required
            />
          </label>
          <label className="text-sm">
            Nombre de la mascota
            <input
              name="petName"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.petName}
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
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="vaccinated" checked={form.vaccinated} onChange={handleChange} />
            Vacunacion al dia
          </label>
          <label className="text-sm">
            Fecha de inicio
            <input
              type="date"
              name="startDate"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.startDate}
              onChange={handleChange}
              required
            />
          </label>
          <label className="text-sm">
            Fecha de fin
            <input
              type="date"
              name="endDate"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.endDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="space-y-2 text-sm text-brand-warmGray">
          <label className="flex min-h-11 items-center gap-2 rounded-xl border px-3">
            <input
              type="checkbox"
              checked={form.extras.includes("MEDICATION")}
              onChange={() => toggleExtra("MEDICATION")}
            />
            Administracion de medicamentos (3 EUR/dia)
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-xl border px-3">
            <input
              type="checkbox"
              checked={form.extras.includes("SPECIAL_CARE")}
              onChange={() => toggleExtra("SPECIAL_CARE")}
            />
            Cuidados especiales (5 EUR/dia)
          </label>
        </div>

        <label className="text-sm">
          Notas de la reserva
          <textarea
            name="notes"
            className="mt-1 min-h-24 w-full rounded-xl border px-3 py-3"
            value={form.notes}
            onChange={handleChange}
          />
        </label>

        {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

        <button className="btn-primary" type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Crear reserva"}
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
