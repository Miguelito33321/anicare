import Link from "next/link";

function ArrowRightIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 px-4 md:hidden">
      <Link
        href="/reservas"
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white shadow-float transition hover:-translate-y-0.5"
      >
        Reservar cuidado
        <ArrowRightIcon />
      </Link>
    </div>
  );
}