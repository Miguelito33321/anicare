"use client";

type AdoptionFilterState = {
  species: string;
  age: string;
  size: string;
  temperament: string;
};

type AdoptionFiltersProps = {
  speciesOptions: string[];
  ageOptions: string[];
  sizeOptions: string[];
  temperamentOptions: string[];
  filters: AdoptionFilterState;
  resultCount: number;
  onChange: (key: keyof AdoptionFilterState, value: string) => void;
  onReset: () => void;
};

export function AdoptionFilters({
  speciesOptions,
  ageOptions,
  sizeOptions,
  temperamentOptions,
  filters,
  resultCount,
  onChange,
  onReset
}: AdoptionFiltersProps) {
  const hasActive = Object.values(filters).some((value) => value);

  return (
    <section className="card">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold">Filtrar animales</h2>
          <p className="mt-2 text-sm text-brand-warmGray">
            Encuentra compañeros por especie, edad, tamaño y carácter.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge">{resultCount} resultados</span>
          {hasActive ? (
            <button type="button" onClick={onReset} className="btn-ghost btn-sm">
              Restablecer filtros
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-semibold text-brand-ink">
          Especie
          <select className="mt-2" value={filters.species} onChange={(event) => onChange("species", event.target.value)}>
            <option value="">Todas</option>
            {speciesOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold text-brand-ink">
          Edad
          <select className="mt-2" value={filters.age} onChange={(event) => onChange("age", event.target.value)}>
            <option value="">Todas</option>
            {ageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold text-brand-ink">
          Tamaño
          <select className="mt-2" value={filters.size} onChange={(event) => onChange("size", event.target.value)}>
            <option value="">Todos</option>
            {sizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold text-brand-ink">
          Carácter
          <select
            className="mt-2"
            value={filters.temperament}
            onChange={(event) => onChange("temperament", event.target.value)}
          >
            <option value="">Todos</option>
            {temperamentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}