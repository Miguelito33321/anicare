import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

function DashboardIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 13.5c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5v6c0 .8-.7 1.5-1.5 1.5h-3C4.7 21 4 20.3 4 19.5v-6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M14 4.5c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5v15c0 .8-.7 1.5-1.5 1.5h-3c-.8 0-1.5-.7-1.5-1.5v-15Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 4.5C4 3.7 4.7 3 5.5 3h3C9.3 3 10 3.7 10 4.5v3C10 8.3 9.3 9 8.5 9h-3C4.7 9 4 8.3 4 7.5v-3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M14 13.5c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5v6c0 .8-.7 1.5-1.5 1.5h-3c-.8 0-1.5-.7-1.5-1.5v-6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function PawIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.3 10.2c-.9 0-1.8-.8-1.8-2 0-1.1.8-2.2 2-2.2 1 0 1.8.9 1.8 2.1 0 1.1-.8 2.1-2 2.1Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M15.7 10.2c.9 0 1.8-.8 1.8-2 0-1.1-.8-2.2-2-2.2-1 0-1.8.9-1.8 2.1 0 1.1.8 2.1 2 2.1Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M6.6 14c-1 0-1.8-.9-1.8-2.1 0-1.1.8-2 1.9-2 1 0 1.8.9 1.8 2 0 1.2-.8 2.1-1.9 2.1Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M17.4 14c1 0 1.8-.9 1.8-2.1 0-1.1-.8-2-1.9-2-1 0-1.8.9-1.8 2 0 1.2.8 2.1 1.9 2.1Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M12 20.7c-2.1 0-3.8-1.2-5.1-2.7-.9-1-1-2.4-.2-3.4 1-1.3 2.7-2.1 5.3-2.1 2.6 0 4.3.8 5.3 2.1.8 1 .7 2.4-.2 3.4-1.3 1.5-3 2.7-5.1 2.7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 3v3M17 3v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.5 9.2h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M6.5 6h11c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2h-11c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 12.5h3M13 12.5h3M8 16h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { href: "/admin/animals", label: "Animales", icon: <PawIcon /> },
  { href: "/admin/reservations", label: "Reservas", icon: <CalendarIcon /> }
];

type AdminShellProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AdminShell({ title, description, actions, children }: AdminShellProps) {
  const router = useRouter();
  const activePath = router.asPath;

  return (
    <div className="min-h-screen bg-[radial-gradient(1100px_520px_at_10%_10%,rgba(244,182,194,0.22),transparent_60%),radial-gradient(900px_520px_at_90%_25%,rgba(245,237,226,0.55),transparent_55%),linear-gradient(180deg,rgba(255,253,251,1)_0%,rgba(255,249,251,1)_100%)]">
      <div className="container py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/75 ring-1 ring-brand-border/70 shadow-soft">
              <span className="h-3 w-3 rounded-full bg-brand-pinkDeep" aria-hidden />
            </span>
            <span>Admin Anicare</span>
          </Link>
          <Link href="/" className="btn-ghost btn-sm">
            Volver a la web
          </Link>
        </div>

        <header className="card mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-warmGray">Panel de administracion</p>
            <h1 className="text-2xl font-extrabold md:text-3xl">{title}</h1>
            {description ? <p className="mt-2 text-sm text-brand-warmGray">{description}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </header>

        <nav className="mb-6 flex flex-wrap gap-2">
          {navItems.map((item) => {
            const active =
              activePath === item.href ||
              activePath.startsWith(item.href + "?") ||
              activePath.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${active ? "btn-secondary" : "btn-ghost"} btn-sm`}
                aria-current={active ? "page" : undefined}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {children}
      </div>
    </div>
  );
}