import Link from "next/link";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { AdminShell } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]";

type DashboardProps = {
  stats: {
    animals: number;
    reservations: number;
  };
};

export default function AdminDashboard({ stats }: DashboardProps) {
  return (
    <AdminShell
      title="Dashboard"
      description="Vista general de la operativa diaria del centro."
      actions={
        <Link href="/admin/animals/create" className="btn-primary">
          Nuevo animal
        </Link>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <p className="text-sm text-brand-warmGray">Animales en base de datos</p>
          <p className="mt-2 text-3xl font-extrabold text-brand-ink">{stats.animals}</p>
        </div>
        <div className="card">
          <p className="text-sm text-brand-warmGray">Reservas registradas</p>
          <p className="mt-2 text-3xl font-extrabold text-brand-ink">{stats.reservations}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Link href="/admin/animals" className="card">
          <h3 className="font-[var(--font-nunito)] text-lg font-bold">Gestion de animales</h3>
          <p className="mt-2 text-sm text-brand-warmGray">
            Alta, edición y control de estado de adopción.
          </p>
        </Link>
        <Link href="/admin/reservations" className="card">
          <h3 className="font-[var(--font-nunito)] text-lg font-bold">Gestion de reservas</h3>
          <p className="mt-2 text-sm text-brand-warmGray">
            Consulta y seguimiento de estancias activas.
          </p>
        </Link>
      </div>
    </AdminShell>
  );
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (context) => {
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

  const [animals, reservations] = await Promise.all([
    prisma.animal.count(),
    prisma.reservation.count()
  ]);

  return {
    props: {
      stats: { animals, reservations }
    }
  };
};
