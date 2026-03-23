export type BlogPostSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  date: string;
  readingTime: string;
  content: BlogPostSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "preparar-casa-adopcion",
    title: "Cómo preparar tu casa para adoptar un animal",
    excerpt:
      "Un hogar preparado reduce el estrés y ayuda a que tu nueva mascota se adapte con tranquilidad.",
    coverImage: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80",
    coverAlt: "Salón luminoso con espacio para mascotas",
    date: "2026-03-01",
    readingTime: "6 min",
    content: [
      {
        heading: "Crea un espacio seguro",
        paragraphs: [
          "Define una zona tranquila con cama, agua y juguetes. Evita ruidos fuertes y deja que explore a su ritmo.",
          "Guarda productos de limpieza, cables y objetos pequeños. La seguridad inicial reduce accidentes y miedos."
        ]
      },
      {
        heading: "Prepara la casa para su rutina",
        paragraphs: [
          "Organiza horarios estables de comida, paseos y descanso. La rutina genera confianza desde el primer día.",
          "Si hay niños en casa, explica normas claras: respeto, calma y tiempo de adaptación."
        ]
      },
      {
        heading: "Visita veterinaria y documentación",
        paragraphs: [
          "Agenda una revisión veterinaria y confirma vacunas, desparasitación y microchip.",
          "Ten a mano transportín, arnés o correa adecuados para sus primeras salidas."
        ]
      },
      {
        heading: "Primeros días con paciencia",
        paragraphs: [
          "Evita visitas masivas. Un entorno tranquilo facilita la conexión y reduce la ansiedad.",
          "Recompensa con refuerzo positivo cuando se sienta seguro y respeta sus tiempos."
        ]
      }
    ]
  },
  {
    slug: "beneficios-adoptar-en-lugar-de-comprar",
    title: "Beneficios de adoptar en lugar de comprar",
    excerpt:
      "Adoptar transforma vidas y fortalece la comunidad. Descubre por qué es una decisión con impacto real.",
    coverImage: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1400&q=80",
    coverAlt: "Persona abrazando a un perro adoptado",
    date: "2026-03-05",
    readingTime: "5 min",
    content: [
      {
        heading: "Salvas una vida",
        paragraphs: [
          "Cada adopción libera un espacio en el refugio y permite ayudar a otro animal que lo necesita.",
          "Muchos animales llegan con historias difíciles y, aun así, están listos para confiar de nuevo."
        ]
      },
      {
        heading: "Acompañamiento y transparencia",
        paragraphs: [
          "En procesos responsables, el refugio te guía con información real sobre salud, temperamento y necesidades.",
          "Recibes orientación para que la adaptación sea más sencilla para toda la familia."
        ]
      },
      {
        heading: "Una decisión ética",
        paragraphs: [
          "Adoptar reduce la demanda de compra y fomenta la tenencia responsable.",
          "Además, contribuyes a una comunidad más consciente y solidaria con los animales."
        ]
      }
    ]
  },
  {
    slug: "cuidados-basicos-mascotas-adoptadas",
    title: "Cuidados básicos para mascotas adoptadas",
    excerpt:
      "Guía práctica para los primeros meses: salud, alimentación, enriquecimiento y vínculo con tu mascota.",
    coverImage: "https://images.unsplash.com/photo-1508675801627-066ac4346a70?auto=format&fit=crop&w=1400&q=80",
    coverAlt: "Perro descansando con su familia",
    date: "2026-03-10",
    readingTime: "7 min",
    content: [
      {
        heading: "Salud y seguimiento",
        paragraphs: [
          "Programa revisiones veterinarias periódicas y mantén al día vacunas y desparasitación.",
          "Observa cambios de apetito, energía o comportamiento y consulta ante cualquier duda."
        ]
      },
      {
        heading: "Alimentación y hábitos",
        paragraphs: [
          "Elige un alimento acorde a su edad y tamaño. Introduce cambios de dieta de forma gradual.",
          "Respeta horarios y evita el exceso de premios para mantener una buena salud digestiva."
        ]
      },
      {
        heading: "Enriquecimiento y juego",
        paragraphs: [
          "Incluye paseos, juegos de olfato o juguetes interactivos para estimular mente y cuerpo.",
          "El ejercicio diario ayuda a reducir ansiedad y fortalece el vínculo."
        ]
      },
      {
        heading: "Educación positiva",
        paragraphs: [
          "Refuerza con premios y caricias las conductas adecuadas. La paciencia es clave.",
          "Evita castigos; la comunicación clara y constante crea confianza a largo plazo."
        ]
      }
    ]
  }
];

export const blogPostMap = Object.fromEntries(blogPosts.map((post) => [post.slug, post]));