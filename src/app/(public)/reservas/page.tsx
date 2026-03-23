import { BookingWizard } from "@/components/reservas/BookingWizard";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reservar estancia",
  description: "Reserva online guardería para mascotas en 5 pasos y con precio calculado en tiempo real.",
  path: "/reservas"
});

export default function BookingPage() {
  return (
    <section className="container py-12 md:py-16">
      <h1 className="section-title">Reserva la estancia de tu mascota en minutos</h1>
      <p className="section-lead">Proceso simple en 5 pasos con validación y resumen de precio.</p>
      <div className="mt-8">
        <BookingWizard />
      </div>
    </section>
  );
}