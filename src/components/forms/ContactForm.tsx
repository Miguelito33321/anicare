"use client";

import { FormEvent, useState } from "react";

type ContactReason = "RESERVA" | "ADOPCION" | "CONSULTA";

function Spinner() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4a8 8 0 1 0 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState<ContactReason>("CONSULTA");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, email, reason, message, consent })
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setFeedback(data.error ?? "No se pudo enviar el formulario.");
        return;
      }

      setStatus("success");
      setFeedback("Consulta enviada correctamente. Te responderemos en menos de 24 horas.");
      setFullName("");
      setPhone("");
      setEmail("");
      setReason("CONSULTA");
      setMessage("");
      setConsent(false);
    } catch {
      setStatus("error");
      setFeedback("Error de red enviando el formulario.");
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold">Escríbenos</h2>
          <p className="mt-2 text-sm text-brand-warmGray">Reservas, adopciones o cualquier consulta.</p>
        </div>
        <span className="badge">Respuesta rápida</span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <label className="text-sm font-semibold text-brand-ink">
          Nombre
          <input
            className="mt-2"
            placeholder="Nombre"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
            disabled={status === "loading"}
          />
        </label>

        <label className="text-sm font-semibold text-brand-ink">
          Teléfono
          <input
            className="mt-2"
            placeholder="Teléfono"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
            disabled={status === "loading"}
            inputMode="tel"
          />
        </label>

        <label className="text-sm font-semibold text-brand-ink md:col-span-2">
          Email
          <input
            className="mt-2"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            disabled={status === "loading"}
          />
        </label>

        <label className="text-sm font-semibold text-brand-ink md:col-span-2">
          Motivo
          <select
            className="mt-2"
            value={reason}
            onChange={(event) => setReason(event.target.value as ContactReason)}
            disabled={status === "loading"}
          >
            <option value="RESERVA">Reserva</option>
            <option value="ADOPCION">Adopción</option>
            <option value="CONSULTA">Consulta</option>
          </select>
        </label>

        <label className="text-sm font-semibold text-brand-ink md:col-span-2">
          Mensaje
          <textarea
            className="mt-2"
            placeholder="Cuéntanos en qué podemos ayudarte"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            minLength={10}
            disabled={status === "loading"}
          />
        </label>
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
          <span className="block font-semibold text-brand-ink">Privacidad</span>
          <span className="mt-1 block text-xs">Acepto la política de privacidad y el tratamiento de datos.</span>
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

      <button className="btn-primary mt-5" type="submit" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Spinner />
            Enviando...
          </>
        ) : (
          "Enviar consulta"
        )}
      </button>
    </form>
  );
}