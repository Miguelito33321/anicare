export type AdoptionAnimal = {
  id: string;
  name: string;
  species: string;
  ageLabel: string;
  ageGroup: string;
  size: string;
  temperament: string;
  description: string;
  status: "AVAILABLE" | "IN_PROCESS" | "ADOPTED";
  imageUrl?: string | null;
};

export const adoptionAnimals: AdoptionAnimal[] = [
  {
    id: "luna",
    name: "Luna",
    species: "Perro",
    ageLabel: "2 años",
    ageGroup: "Joven",
    size: "Mediano",
    temperament: "Sociable",
    description: "Cariñosa y muy sociable; se emociona con los paseos y te recibe moviendo la cola.",
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "milo",
    name: "Milo",
    species: "Gato",
    ageLabel: "1 año",
    ageGroup: "Joven",
    size: "Pequeño",
    temperament: "Tranquilo",
    description: "Un gatito dulce y curioso; cuando confía se acurruca y busca caricias suaves.",
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "nube",
    name: "Nube",
    species: "Conejo",
    ageLabel: "8 meses",
    ageGroup: "Cachorro",
    size: "Pequeño",
    temperament: "Curioso",
    description: "Tierno y sensible; se acerca con calma y agradece un hogar paciente y tranquilo.",
    status: "IN_PROCESS",
    imageUrl: "https://tse3.mm.bing.net/th/id/OIP.bGgSyWDpAuF6cS8MLCPQKAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "sol",
    name: "Sol",
    species: "Perro",
    ageLabel: "4 años",
    ageGroup: "Adulto",
    size: "Grande",
    temperament: "Activo",
    description: "Energía positiva y ganas de aprender; ideal para una familia activa que disfrute del aire libre.",
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "kira",
    name: "Kira",
    species: "Gato",
    ageLabel: "3 años",
    ageGroup: "Adulto",
    size: "Mediano",
    temperament: "Cariñosa",
    description: "Reservada al principio, pero muy cariñosa cuando se siente segura; le gustan las rutinas.",
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pico",
    name: "Pico",
    species: "Ave",
    ageLabel: "1 año",
    ageGroup: "Joven",
    size: "Pequeño",
    temperament: "Curioso",
    description: "Sociable y alegre; canta cuando está contento y disfruta de compañía tranquila.",
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=900&q=80"
  }
];
