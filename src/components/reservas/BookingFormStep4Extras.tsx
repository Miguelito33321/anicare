export function BookingFormStep4Extras() {
  return (
    <section className="card">
      <h3 className="font-[var(--font-nunito)] text-lg font-bold">Servicios extra</h3>
      <div className="mt-4 space-y-2 text-sm text-brand-warmGray">
        <label className="flex min-h-12 items-center gap-2 rounded-xl border px-3">
          <input type="checkbox" /> Administracion de medicamentos (3 EUR/dia)
        </label>
        <label className="flex min-h-12 items-center gap-2 rounded-xl border px-3">
          <input type="checkbox" /> Cuidados especiales (5 EUR/dia)
        </label>
      </div>
    </section>
  );
}
