import type { Species } from "@/lib/pricing";

const speciesOptions: { value: Species; label: string }[] = [
  { value: "DOG", label: "Perro" },
  { value: "CAT", label: "Gato" },
  { value: "RABBIT", label: "Conejo" },
  { value: "BIRD", label: "Ave" }
];

export function BookingFormStep1Species() {
  return (
    <section className="card">
      <h3 className="font-[var(--font-nunito)] text-lg font-bold">Selecciona la especie</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {speciesOptions.map((item) => (
          <label key={item.value} className="flex min-h-12 cursor-pointer items-center rounded-xl border p-3">
            <input type="radio" name="species" value={item.value} className="mr-2" />
            {item.label}
          </label>
        ))}
      </div>
    </section>
  );
}
