"use client";

import { FormEvent, useState } from "react";

function Spinner() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4a8 8 0 1 0 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent })
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setFeedback(data.error ?? "No se pudo completar la suscripción.");
        return;
      }

      setStatus("success");
      setFeedback("Suscripción confirmada. Gracias por unirte al boletín.");
      setEmail("");
    } catch {
      setStatus("error");
      setFeedback("Error de red al suscribirte.");
    }
  };

  return (
    <form className="card relative overflow-hidden" onSubmit={onSubmit}>
      <div className="absolute inset-0 bg-[radial-gradient(600px_240px_at_15%_20%,rgba(244,182,194,0.35),transparent_60%),radial-gradient(520px_220px_at_85%_35%,rgba(245,237,226,0.75),transparent_55%)]" />
      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold">Boletín Anicare</h2>
            <p className="mt-2 text-sm text-brand-warmGray">Consejos, novedades y animales en adopción.</p>
          </div>
          <span className="badge">1 email/mes</span>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="w-full text-sm font-semibold text-brand-ink">
            Email
            <input
              type="email"
              className="mt-2"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={status === "loading"}
            />
          </label>
          <button className="btn-primary sm:mt-0" type="submit" disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Spinner />
                Enviando...
              </>
            ) : (
              "Suscribirme"
            )}
          </button>
        </div>

        <label className="mt-4 flex items-start gap-3 rounded-3xl border border-brand-border bg-white/70 p-4 text-sm text-brand-warmGray">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            required
            disabled={status === "loading"}
            className="mt-1"
          />
          <span>
            <span className="block font-semibold text-brand-ink">Consentimiento</span>
            <span className="mt-1 block text-xs">Acepto recibir comunicaciones de Anicare.</span>
          </span>
        </label>

        {feedback ? (
          <p
            className={`mt-4 rounded-3xl border p-4 text-sm ${
              status === "success"
                ? "border-green-200 bg-green-50 text-green-900"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}