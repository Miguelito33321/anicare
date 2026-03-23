import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anicare.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/sobre-nosotros",
    "/servicios",
    "/adopcion",
    "/reservas",
    "/testimonios",
    "/blog",
    "/preguntas-frecuentes",
    "/contacto"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7
  }));
}
