export function BookingFormStep3OwnerPet() {
  return (
    <section className="card">
      <h3 className="font-[var(--font-nunito)] text-lg font-bold">Datos del tutor y mascota</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input className="min-h-12 rounded-xl border px-3" placeholder="Nombre del tutor" />
        <input className="min-h-12 rounded-xl border px-3" placeholder="Teléfono" />
        <input className="min-h-12 rounded-xl border px-3" placeholder="Email" />
        <input className="min-h-12 rounded-xl border px-3" placeholder="Nombre de la mascota" />
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm text-brand-warmGray">
        <input type="checkbox" /> Vacunación al día
      </label>
    </section>
  );
}
