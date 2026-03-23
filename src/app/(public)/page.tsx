import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { AdoptionPreview } from "@/components/sections/AdoptionPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { TrustIndicators } from "@/components/sections/TrustIndicators";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Anicare | Guardería y adopción de mascotas en Telde",
  description: "Guardería para mascotas en Salinetas, Telde. Reserva estancias para perros, gatos, conejos y aves.",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <HowItWorks />
      <ServicesGrid />
      <AdoptionPreview />
      <TrustIndicators />
      <TestimonialsCarousel />

      <section className="container py-10 md:py-14">
        <NewsletterForm />
      </section>

      <FinalCTA />
    </>
  );
}