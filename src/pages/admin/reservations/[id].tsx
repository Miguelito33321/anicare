import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { AdminShell } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../api/auth/[...nextauth]";

type ReservationEditProps = {
  reservation: {
    id: string;
    startDate: string;
    endDate: string;
    status: string;
    notes: string | null;
    owner: {
      id: string;
      fullName: string;
      phone: string;
      email: string;
    };
    pet: {
      id: string;
      name: string;
      species: string;
      vaccinated: boolean;
    };
    extras: string[];
  };
};

const toIsoDate = (value: string) => new Date(value + "T00:00:00.000Z").toISOString();

export default function ReservationEdit({ reservation }: ReservationEditProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    ownerName: reservation.owner.fullName,
    ownerPhone: reservation.owner.phone,
    ownerEmail: reservation.owner.email,
    petName: reservation.pet.name,
    species: reservation.pet.species,
    vaccinated: reservation.pet.vaccinated,
    startDate: reservation.startDate,
    endDate: reservation.endDate,
    status: reservation.status,
    extras: reservation.extras,
    notes: reservation.notes ?? ""
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

    const response = await fetch("/api/admin/reservations/" + reservation.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner: {
          id: reservation.owner.id,
          fullName: form.ownerName.trim(),
          phone: form.ownerPhone.trim(),
          email: form.ownerEmail.trim()
        },
        pet: {
          id: reservation.pet.id,
          name: form.petName.trim(),
          species: form.species,
          vaccinated: form.vaccinated
        },
        reservation: {
          startDate: toIsoDate(form.startDate),
          endDate: toIsoDate(form.endDate),
          status: form.status,
          notes: form.notes.trim() || null
        },
        extras: form.extras
      })
    });

    setSaving(false);

    if (!response.ok) {
      setError("No se pudo actualizar la reserva.");
      return;
    }

    router.push("/admin/reservations?updated=1");
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Eliminar esta reserva? Esta accion no se puede deshacer.");
    if (!confirmed) return;

    setDeleting(true);
    const response = await fetch("/api/admin/reservations/" + reservation.id, { method: "DELETE" });
    setDeleting(false);

    if (!response.ok) {
      setError("No se pudo eliminar la reserva.");
      return;
    }

    router.push("/admin/reservations?deleted=1");
  };

  return (
    <AdminShell
      title="Editar reserva"
      description="Actualiza los datos de la estancia."
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
          <label className="text-sm">
            Estado
            <select
              name="status"
              className="mt-1 min-h-11 w-full rounded-xl border px-3"
              value={form.status}
              onChange={handleChange}
            >
              <option value="PENDING">Pendiente</option>
              <option value="CONFIRMED">Confirmada</option>
              <option value="CANCELLED">Cancelada</option>
              <option value="COMPLETED">Completada</option>
            </select>
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

        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
          <button className="btn-secondary" type="button" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </form>
    </AdminShell>
  );
}

export const getServerSideProps: GetServerSideProps<ReservationEditProps> = async (context) => {
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

  const reservation = await prisma.reservation.findUnique({
    where: { id },
    include: { owner: true, pet: true, extras: true }
  });

  if (!reservation) {
    return { notFound: true };
  }

  return {
    props: {
      reservation: {
        id: reservation.id,
        startDate: reservation.startDate.toISOString().slice(0, 10),
        endDate: reservation.endDate.toISOString().slice(0, 10),
        status: reservation.status,
        notes: reservation.notes ?? null,
        owner: {
          id: reservation.owner.id,
          fullName: reservation.owner.fullName,
          phone: reservation.owner.phone,
          email: reservation.owner.email
        },
        pet: {
          id: reservation.pet.id,
          name: reservation.pet.name,
          species: reservation.pet.species,
          vaccinated: reservation.pet.vaccinated
        },
        extras: reservation.extras.map((extra) => extra.type)
      }
    }
  };
};
