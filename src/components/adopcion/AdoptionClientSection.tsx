"use client";

import { useMemo, useState } from "react";
import { AdoptionFilters } from "@/components/adopcion/AdoptionFilters";
import { AnimalCard } from "@/components/adopcion/AnimalCard";
import { AdoptionRequestForm } from "@/components/adopcion/AdoptionRequestForm";
import type { AdoptionAnimal } from "@/content/adoptionAnimals";

type FilterState = {
  species: string;
  age: string;
  size: string;
  temperament: string;
};

const speciesOrder = ["Perro", "Gato", "Conejo", "Ave"];
const ageOrder = ["Cachorro", "Joven", "Adulto"];
const sizeOrder = ["Pequeño", "Mediano", "Grande"];

const initialFilters: FilterState = {
  species: "",
  age: "",
  size: "",
  temperament: ""
};

function buildOptions(values: string[], order?: string[]) {
  const unique = Array.from(new Set(values.filter(Boolean)));
  if (!order) return unique.sort((a, b) => a.localeCompare(b, "es"));
  return order.filter((item) => unique.includes(item));
}

export function AdoptionClientSection({ animals }: { animals: AdoptionAnimal[] }) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const speciesOptions = useMemo(() => buildOptions(animals.map((animal) => animal.species), speciesOrder), [animals]);
  const ageOptions = useMemo(() => buildOptions(animals.map((animal) => animal.ageGroup), ageOrder), [animals]);
  const sizeOptions = useMemo(() => buildOptions(animals.map((animal) => animal.size), sizeOrder), [animals]);
  const temperamentOptions = useMemo(() => buildOptions(animals.map((animal) => animal.temperament)), [animals]);

  const filteredAnimals = useMemo(() => {
    return animals.filter((animal) => {
      const matchSpecies = !filters.species || animal.species === filters.species;
      const matchAge = !filters.age || animal.ageGroup === filters.age;
      const matchSize = !filters.size || animal.size === filters.size;
      const matchTemperament = !filters.temperament || animal.temperament === filters.temperament;
      return matchSpecies && matchAge && matchSize && matchTemperament;
    });
  }, [animals, filters]);

  const handleChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => setFilters(initialFilters);

  return (
    <>
      <div className="mt-8">
        <AdoptionFilters
          speciesOptions={speciesOptions}
          ageOptions={ageOptions}
          sizeOptions={sizeOptions}
          temperamentOptions={temperamentOptions}
          filters={filters}
          resultCount={filteredAnimals.length}
          onChange={handleChange}
          onReset={handleReset}
        />
      </div>

      {filteredAnimals.length === 0 ? (
        <div className="mt-6 card">
          <h3 className="text-lg font-extrabold">No hay resultados con esos filtros</h3>
          <p className="mt-2 text-sm text-brand-warmGray">
            Prueba con otra combinación o restablece los filtros para ver todos los animales disponibles.
          </p>
          <button type="button" onClick={handleReset} className="btn-secondary btn-sm mt-4">
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}

      <div id="solicitud-adopcion" className="mt-10 scroll-mt-28">
        <AdoptionRequestForm animalOptions={animals.map((animal) => ({ id: animal.id, name: animal.name }))} />
      </div>
    </>
  );
}