import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { AdminShell } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../api/auth/[...nextauth]";

type ReservationRow = {
  id: string;
  ownerName: string;
  petName: string;
  startDate: string;
  endDate: string;
  status: string;
  notes: string | null;
};

type ReservationsIndexProps = {
  reservations: ReservationRow[];
};

type Toast = {
  id: string;
  type: "success" | "error" | "info";
  message: string;
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
  COMPLETED: "Completada"
};

const statusBadges: Record<string, string> = {
  PENDING: "badge badge-warning",
  CONFIRMED: "badge badge-success",
  CANCELLED: "badge badge-danger",
  COMPLETED: "badge"
};

function PencilIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 20h4l10.8-10.8c.5-.5.5-1.4 0-2l-2-2c-.6-.5-1.5-.5-2 0L4 16v4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M13 6l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 3h6m-8 4h10m-9 0 1 14h6l1-14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function formatRange(startDate: string, endDate: string) {
  if (startDate === endDate) {
    return startDate;
  }
  return startDate + " - " + endDate;
}

function getToastClass(type: Toast["type"]) {
  if (type === "success") {
    return "bg-green-600 text-white";
  }
  if (type === "error") {
    return "bg-red-600 text-white";
  }
  return "bg-brand-ink text-white";
}

export default function ReservationsIndex({ reservations }: ReservationsIndexProps) {
  const router = useRouter();
  const [rows, setRows] = useState<ReservationRow[]>(reservations);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    setRows(reservations);
  }, [reservations]);

  const addToast = (message: string, type: Toast["type"] = "success") => {
    const id = Date.now().toString() + "-" + Math.random().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.created === "1") {
      addToast("Reserva creada correctamente.");
      router.replace("/admin/reservations", undefined, { shallow: true });
      return;
    }

    if (router.query.updated === "1") {
      addToast("Reserva actualizada correctamente.");
      router.replace("/admin/reservations", undefined, { shallow: true });
      return;
    }

    if (router.query.deleted === "1") {
      addToast("Reserva eliminada correctamente.");
      router.replace("/admin/reservations", undefined, { shallow: true });
    }
  }, [router]);

  const statusOptions = useMemo(() => {
    const unique = Array.from(new Set(rows.map((row) => row.status)));
    return ["ALL", ...unique];
  }, [rows]);

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchStatus = filterStatus === "ALL" || row.status === filterStatus;
      const matchFrom = !filterFrom || row.endDate >= filterFrom;
      const matchTo = !filterTo || row.startDate <= filterTo;
      return matchStatus && matchFrom && matchTo;
    });
  }, [rows, filterStatus, filterFrom, filterTo]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("¿Eliminar esta reserva? Esta acción no se puede deshacer.");
    if (!confirmed) return;

    const response = await fetch("/api/admin/reservations/" + id, { method: "DELETE" });
    if (!response.ok) {
      addToast("No se pudo eliminar la reserva.", "error");
      return;
    }

    setRows((prev) => prev.filter((row) => row.id !== id));
    addToast("Reserva eliminada correctamente.");
  };

  return (
    <AdminShell
      title="Reservas"
      description="Listado y gestión de estancias."
      actions={
        <Link href="/admin/reservations/create" className="btn-primary btn-sm">
          Crear reserva
        </Link>
      }
    >
      <div className="card mb-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-brand-warmGray">Filtros</p>
            <p className="mt-1 text-sm text-brand-warmGray">
              Mostrando <span className="font-semibold text-brand-ink">{filtered.length}</span> de{" "}
              <span className="font-semibold text-brand-ink">{rows.length}</span>
            </p>
          </div>

          <div className="grid w-full gap-3 md:w-auto md:grid-cols-3">
            <label className="text-sm font-semibold text-brand-ink">
              Estado
              <select className="mt-2" value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)}>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "ALL" ? "Todos" : statusLabels[option] ?? option}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-brand-ink">
              Desde
              <input
                type="date"
                className="mt-2"
                value={filterFrom}
                onChange={(event) => setFilterFrom(event.target.value)}
              />
            </label>

            <label className="text-sm font-semibold text-brand-ink">
              Hasta
              <input
                type="date"
                className="mt-2"
                value={filterTo}
                onChange={(event) => setFilterTo(event.target.value)}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="table">
          <thead className="bg-white/60">
            <tr>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Mascota</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Notas</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-sm text-brand-warmGray" colSpan={6}>
                  No hay reservas con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              filtered.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="border-t border-brand-border/70 transition odd:bg-white even:bg-brand-sand/45 hover:bg-brand-beige/50"
                >
                  <td className="px-4 py-3 font-semibold">{reservation.ownerName}</td>
                  <td className="px-4 py-3">
                    <span className="badge">{reservation.petName}</span>
                  </td>
                  <td className="px-4 py-3">{formatRange(reservation.startDate, reservation.endDate)}</td>
                  <td className="px-4 py-3">
                    <span className={statusBadges[reservation.status] ?? "badge"}>
                      {statusLabels[reservation.status] ?? reservation.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block max-w-xs truncate text-brand-warmGray" title={reservation.notes ?? ""}>
                      {reservation.notes ? reservation.notes : "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link href={"/admin/reservations/" + reservation.id} className="btn-secondary btn-sm">
                        <PencilIcon />
                        Editar
                      </Link>
                      <button
                        className="btn-danger btn-sm"
                        type="button"
                        onClick={() => handleDelete(reservation.id)}
                      >
                        <TrashIcon />
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="fixed right-6 top-6 z-50 space-y-2" aria-live="polite">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={"rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg " + getToastClass(toast.type)}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

export const getServerSideProps: GetServerSideProps<ReservationsIndexProps> = async (context) => {
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

  const reservations = await prisma.reservation.findMany({
    include: { owner: true, pet: true },
    orderBy: { createdAt: "desc" }
  });

  return {
    props: {
      reservations: reservations.map((reservation) => ({
        id: reservation.id,
        ownerName: reservation.owner.fullName,
        petName: reservation.pet.name,
        startDate: reservation.startDate.toISOString().slice(0, 10),
        endDate: reservation.endDate.toISOString().slice(0, 10),
        status: reservation.status,
        notes: reservation.notes ?? null
      }))
    }
  };
};