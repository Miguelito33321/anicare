const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Anicare",
  description: "Guardería para mascotas, refugio temporal y adopción responsable en Telde.",
  url: "https://www.anicare.es",
  telephone: "+34873645231",
  email: "anicare@gmail.com",
  priceRange: "EUR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Ebanista 13",
    addressLocality: "Salinetas - Telde",
    addressRegion: "Las Palmas",
    addressCountry: "ES"
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      opens: "08:00",
      closes: "20:00"
    }
  ],
  sameAs: ["https://www.tiktok.com/@anicare33"]
};

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessData)
      }}
    />
  );
}