export function BookingFormStep5Confirm() {
  return (
    <section className="card">
      <h3 className="font-[var(--font-nunito)] text-lg font-bold">Confirmacion</h3>
      <p className="mt-2 text-sm text-brand-warmGray">
        Revisa los datos y confirma la reserva. Recibiras email con el detalle.
      </p>
      <button className="btn-primary mt-4" type="button">
        Confirmar reserva
      </button>
    </section>
  );
}
