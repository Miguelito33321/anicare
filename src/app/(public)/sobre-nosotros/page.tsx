import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sobre nosotros",
  description: "Conoce la historia, el equipo y los valores de Anicare en Telde.",
  path: "/sobre-nosotros"
});

const values = [
  {
    title: "Nuestra misión",
    description:
      "Proteger el bienestar animal y ofrecer un cuidado profesional para que cada mascota se sienta segura y acompañada.",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 21s-7-4.5-9-10.2C1.6 7.2 3.8 4.5 7 4.5c1.8 0 3.2.9 4 2.1.8-1.2 2.2-2.1 4-2.1 3.2 0 5.4 2.7 4 6.3C19 16.5 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    title: "Nuestro compromiso con los animales",
    description:
      "Trabajamos con protocolos de salud, higiene diaria y seguimiento personalizado para cada especie.",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2.75 19.25 6v6.4c0 4.8-3.2 8.2-7.25 9.85C7.95 20.6 4.75 17.2 4.75 12.4V6L12 2.75Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 12.2 11 14l3.8-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    title: "Cómo trabajamos",
    description:
      "Escucha activa, evaluación inicial y acompañamiento constante desde la estancia temporal hasta la adopción responsable.",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 7.5h10M7 12h10M7 16.5h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6.5 3.75h11A2.75 2.75 0 0 1 20.25 6.5v11A2.75 2.75 0 0 1 17.5 20.25h-11A2.75 2.75 0 0 1 3.75 17.5v-11A2.75 2.75 0 0 1 6.5 3.75Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    )
  }
];

const workflow = [
  {
    title: "Evaluación inicial",
    description: "Conocemos a cada animal y definimos necesidades de salud, rutina y socialización."
  },
  {
    title: "Plan de cuidado personalizado",
    description: "Diseñamos horarios de alimentación, descanso y juego según especie y temperamento."
  },
  {
    title: "Seguimiento y adopción",
    description: "Acompañamos el proceso con información clara, entrevistas y apoyo post-adopción."
  }
];

export default function AboutPage() {
  return (
    <section className="container py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <h1 className="section-title">Somos una casa segura para animales y familias</h1>
          <p className="section-lead max-w-3xl">
            Anicare nació en Salinetas como un proyecto familiar con una idea clara: unir cuidado profesional,
            refugio temporal y adopción responsable en Gran Canaria. Empezamos atendiendo a los primeros animales del
            barrio y, con el tiempo, nos convertimos en un espacio de confianza para familias, viajeros y voluntarios.
          </p>
        </div>
        <div className="md:col-span-5">
          <div className="card">
            <h2 className="text-lg font-extrabold">Lo que nos mueve</h2>
            <p className="mt-2 text-sm text-brand-warmGray">
              Cercanía, transparencia y bienestar animal en cada decisión.
            </p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-brand-border/70 bg-white/70 p-3 text-sm">
                45 plazas con espacios separados por especie
              </div>
              <div className="rounded-2xl border border-brand-border/70 bg-white/70 p-3 text-sm">
                Equipo formado en primeros auxilios y manejo respetuoso
              </div>
              <div className="rounded-2xl border border-brand-border/70 bg-white/70 p-3 text-sm">
                Procesos de adopción con seguimiento y asesoramiento
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {values.map((item) => (
          <article key={item.title} className="card card-hover">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-sand ring-1 ring-brand-border/70">
                {item.icon}
              </div>
              <div>
                <h2 className="text-lg font-extrabold">{item.title}</h2>
                <p className="mt-2 text-sm text-brand-warmGray">{item.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <article className="card">
          <h2 className="text-lg font-extrabold">Cómo trabajamos día a día</h2>
          <div className="mt-4 space-y-4">
            {workflow.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-brand-border/70 bg-white/70 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
                  <span className="badge">Paso {index + 1}</span>
                  {step.title}
                </div>
                <p className="mt-2 text-sm text-brand-warmGray">{step.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <h2 className="text-lg font-extrabold">Nuestro compromiso con los animales</h2>
          <p className="mt-2 text-sm text-brand-warmGray">
            Cada animal recibe atención individual, evaluación veterinaria y un plan de bienestar adaptado. Nuestro
            objetivo es que encuentren un hogar definitivo con el acompañamiento adecuado.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-warmGray">
            <li>Seguimiento diario y registro de comportamiento.</li>
            <li>Alimentación y cuidados específicos por especie.</li>
            <li>Comunicación constante con las familias y adoptantes.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}