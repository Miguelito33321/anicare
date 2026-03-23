import { PrismaClient, Species } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSetting.upsert({
    where: { key: "contact_phone" },
    update: { value: "+34 600 000 000" },
    create: { key: "contact_phone", value: "+34 600 000 000" }
  });

  await prisma.siteSetting.upsert({
    where: { key: "contact_email" },
    update: { value: "hola@anicare.es" },
    create: { key: "contact_email", value: "hola@anicare.es" }
  });

  const animals = [
    {
      id: "luna-seed",
      name: "Luna",
      species: Species.DOG,
      ageMonths: 24,
      size: "MEDIANO",
      temperament: "Sociable y carinosa",
      healthStatus: "Vacunas al dia y esterilizada",
      adoptionRequirements: "Entrevista previa y seguimiento",
      description: "Perra mestiza, activa y muy familiar.",
      imageUrls: ["https://images.unsplash.com/photo-1517849845537-4d257902454a"]
    },
    {
      id: "milo-seed",
      name: "Milo",
      species: Species.CAT,
      ageMonths: 14,
      size: "PEQUENO",
      temperament: "Tranquilo y observador",
      healthStatus: "Vacunas al dia",
      adoptionRequirements: "Adaptacion progresiva en hogar",
      description: "Gato joven, ideal para familias que buscan compania calmada.",
      imageUrls: ["https://images.unsplash.com/photo-1519052537078-e6302a4968d4"]
    },
    {
      id: "nube-seed",
      name: "Nube",
      species: Species.RABBIT,
      ageMonths: 8,
      size: "PEQUENO",
      temperament: "Curiosa y activa",
      healthStatus: "Revision veterinaria reciente",
      adoptionRequirements: "Zona segura y compromiso de cuidados",
      description: "Coneja enana sociable, ideal para hogar tranquilo.",
      imageUrls: ["https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308"]
    }
  ];

  for (const animal of animals) {
    await prisma.animal.upsert({
      where: { id: animal.id },
      update: {
        name: animal.name,
        species: animal.species,
        ageMonths: animal.ageMonths,
        size: animal.size,
        temperament: animal.temperament,
        healthStatus: animal.healthStatus,
        adoptionRequirements: animal.adoptionRequirements,
        description: animal.description,
        imageUrls: animal.imageUrls,
        featured: true
      },
      create: {
        id: animal.id,
        name: animal.name,
        species: animal.species,
        ageMonths: animal.ageMonths,
        size: animal.size,
        temperament: animal.temperament,
        healthStatus: animal.healthStatus,
        adoptionRequirements: animal.adoptionRequirements,
        description: animal.description,
        imageUrls: animal.imageUrls,
        featured: true
      }
    });
  }

  await prisma.testimonial.createMany({
    data: [
      {
        fullName: "Marta R.",
        quote: "Servicio cercano y profesional. Volveremos.",
        rating: 5,
        featured: true
      },
      {
        fullName: "Carlos y Ana",
        quote: "Adopcion responsable y acompanamiento excelente.",
        rating: 5,
        featured: true
      }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
