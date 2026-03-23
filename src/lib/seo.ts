import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anicare.es";

export function buildMetadata(params: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = `${siteUrl}${params.path}`;

  return {
    title: params.title,
    description: params.description,
    alternates: {
      canonical
    },
    openGraph: {
      title: params.title,
      description: params.description,
      url: canonical,
      siteName: "Anicare",
      locale: "es_ES",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description
    }
  };
}
