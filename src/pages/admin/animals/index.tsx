import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { AdminShell } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../api/auth/[...nextauth]";

type AnimalRow = {
  id: string;
  name: string;
  species: string;
  ageMonths: number;
  status: string;
  featured: boolean;
  createdAt: string;
};

type AnimalsIndexProps = {
  animals: AnimalRow[];
};

type Toast = {
  id: string;
  type: "success" | "error" | "info";
  message: string;
};

const statusLabels: Record<string, string> = {
  AVAILABLE: "Disponible",
  IN_PROCESS: "En proceso",
  ADOPTED: "Adoptado"
};

const statusBadges: Record<string, string> = {
  AVAILABLE: "badge badge-success",
  IN_PROCESS: "badge badge-warning",
  ADOPTED: "badge"
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

function formatAge(ageMonths: number) {
  if (ageMonths < 12) {
    return `${ageMonths} meses`;
  }
  const years = Math.floor(ageMonths / 12);
  const months = ageMonths % 12;
  return months > 0 ? `${years} años ${months} m` : `${years} años`;
}

export default function AnimalsIndex({ animals }: AnimalsIndexProps) {
  const router = useRouter();
  const [rows, setRows] = useState<AnimalRow[]>(animals);
  const [filterSpecies, setFilterSpecies] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    setRows(animals);
  }, [animals]);

  const addToast = (message: string, type: Toast["type"] = "success") => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.created === "1") {
      addToast("Animal creado correctamente.");
      router.replace("/admin/animals", undefined, { shallow: true });
      return;
    }

    if (router.query.updated === "1") {
      addToast("Animal actualizado correctamente.");
      router.replace("/admin/animals", undefined, { shallow: true });
    }
  }, [router]);

  const speciesOptions = useMemo(() => {
    const unique = Array.from(new Set(rows.map((row) => row.species)));
    return ["ALL", ...unique];
  }, [rows]);

  const statusOptions = useMemo(() => {
    const unique = Array.from(new Set(rows.map((row) => row.status)));
    return ["ALL", ...unique];
  }, [rows]);

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchSpecies = filterSpecies === "ALL" || row.species === filterSpecies;
      const matchStatus = filterStatus === "ALL" || row.status === filterStatus;
      return matchSpecies && matchStatus;
    });
  }, [rows, filterSpecies, filterStatus]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("¿Eliminar este animal? Esta acción no se puede deshacer.");
    if (!confirmed) return;

    const response = await fetch(`/api/admin/animals/${id}`, { method: "DELETE" });
    if (!response.ok) {
      addToast("No se pudo eliminar el animal.", "error");
      return;
    }

    setRows((prev) => prev.filter((row) => row.id !== id));
    addToast("Animal eliminado correctamente.");
  };

  return (
    <AdminShell
      title="Animales"
      description="Listado completo de animales registrados."
      actions={
        <Link href="/admin/animals/create" className="btn-primary btn-sm">
          Crear animal
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
          <div className="grid w-full gap-3 md:w-auto md:grid-cols-2">
            <label className="text-sm font-semibold text-brand-ink">
              Especie
              <select className="mt-2" value={filterSpecies} onChange={(event) => setFilterSpecies(event.target.value)}>
                {speciesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "ALL" ? "Todas" : option}
                  </option>
                ))}
              </select>
            </label>
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
          </div>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="table">
          <thead className="bg-white/60">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Especie</th>
              <th className="px-4 py-3">Edad</th>
              <th className="px-4 py-3">Estado adopción</th>
              <th className="px-4 py-3">Creado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-sm text-brand-warmGray" colSpan={6}>
                  No hay animales con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              filtered.map((animal) => (
                <tr
                  key={animal.id}
                  className="border-t border-brand-border/70 transition odd:bg-white even:bg-brand-sand/45 hover:bg-brand-beige/50"
                >
                  <td className="px-4 py-3 font-semibold">{animal.name}</td>
                  <td className="px-4 py-3">
                    <span className="badge">{animal.species}</span>
                  </td>
                  <td className="px-4 py-3">{formatAge(animal.ageMonths)}</td>
                  <td className="px-4 py-3">
                    <span className={statusBadges[animal.status] ?? "badge"}>
                      {statusLabels[animal.status] ?? animal.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{animal.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/admin/animals/${animal.id}`} className="btn-secondary btn-sm">
                        <PencilIcon />
                        Editar
                      </Link>
                      <button className="btn-danger btn-sm" type="button" onClick={() => handleDelete(animal.id)}>
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
            className={`rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : toast.type === "error"
                  ? "bg-red-600 text-white"
                  : "bg-brand-ink text-white"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

export const getServerSideProps: GetServerSideProps<AnimalsIndexProps> = async (context) => {
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

  const animals = await prisma.animal.findMany({
    select: {
      id: true,
      name: true,
      species: true,
      ageMonths: true,
      status: true,
      featured: true,
      createdAt: true
    },
    orderBy: { createdAt: "desc" }
  });

  return {
    props: {
      animals: animals.map((animal) => ({
        ...animal,
        createdAt: animal.createdAt.toISOString().slice(0, 10)
      }))
    }
  };
};