export function PriceSummary() {
  return (
    <aside className="card h-fit">
      <h3 className="font-[var(--font-nunito)] text-lg font-bold">Resumen de precio</h3>
      <dl className="mt-4 space-y-2 text-sm text-brand-warmGray">
        <div className="flex justify-between">
          <dt>Tarifa base/dia</dt>
          <dd>12 EUR</dd>
        </div>
        <div className="flex justify-between">
          <dt>Extras/dia</dt>
          <dd>0 EUR</dd>
        </div>
        <div className="flex justify-between">
          <dt>Dias</dt>
          <dd>1</dd>
        </div>
        <div className="flex justify-between border-t pt-2 font-bold text-brand-ink">
          <dt>Total</dt>
          <dd>12 EUR</dd>
        </div>
      </dl>
    </aside>
  );
}
