import Link from "next/link";

const adminLinks = [
  { href: "/admin/reservas", label: "Reservas" },
  { href: "/admin/adopciones", label: "Adopciones" },
  { href: "/admin/animales", label: "Animales" },
  { href: "/admin/blog", label: "Blog" }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-8">
      <header className="mb-6 rounded-2xl border bg-white p-4">
        <h1 className="font-[var(--font-nunito)] text-2xl font-bold">Panel Anicare</h1>
        <nav className="mt-3 flex flex-wrap gap-2">
          {adminLinks.map((item) => (
            <Link key={item.href} href={item.href} className="btn-secondary">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
