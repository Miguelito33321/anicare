export type AnalyticsEventName =
  | "reserva_iniciada"
  | "reserva_realizada"
  | "solicitud_adopcion_enviada"
  | "formulario_contacto_enviado"
  | "clic_telefono"
  | "suscripcion_boletin"
  | "visita_adopcion";

export function trackEvent(name: AnalyticsEventName, params: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") {
    return;
  }

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (gtag) {
    gtag("event", name, params);
  }
}
