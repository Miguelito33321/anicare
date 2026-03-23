export function BookingFormStep2Dates() {
  return (
    <section className="card">
      <h3 className="font-[var(--font-nunito)] text-lg font-bold">Selecciona fechas</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          Fecha de inicio
          <input type="date" className="mt-1 min-h-12 w-full rounded-xl border px-3" />
        </label>
        <label className="text-sm">
          Fecha de fin
          <input type="date" className="mt-1 min-h-12 w-full rounded-xl border px-3" />
        </label>
      </div>
    </section>
  );
}
