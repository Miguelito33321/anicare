const STEPS = [
  "1. Tipo de animal",
  "2. Fechas",
  "3. Datos del tutor y mascota",
  "4. Extras",
  "5. Confirmacion"
];

export function BookingStepper({ currentStep = 1 }: { currentStep?: number }) {
  return (
    <ol className="grid gap-2 rounded-2xl border border-brand-warmGray/20 bg-white p-4 md:grid-cols-5">
      {STEPS.map((step, index) => {
        const active = index + 1 === currentStep;
        return (
          <li
            key={step}
            className={`rounded-xl px-3 py-2 text-xs font-semibold md:text-sm ${
              active ? "bg-brand-pink text-brand-ink" : "bg-brand-beige text-brand-warmGray"
            }`}
          >
            {step}
          </li>
        );
      })}
    </ol>
  );
}
