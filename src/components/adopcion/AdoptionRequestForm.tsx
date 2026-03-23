"use client";

import { FormEvent, useState } from "react";

type AnimalOption = {
  id: string;
  name: string;
};

function Spinner() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4a8 8 0 1 0 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function AdoptionRequestForm({ animalOptions }: { animalOptions: AnimalOption[] }) {
  const [animalId, setAnimalId] = useState<string>(animalOptions[0]?.id ?? "");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/adopcion/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          animalId,
          fullName,
          phone,
          email,
          message
        })
      });

      const data = (await response.json()) as { ok?: boolean; requestId?: string; error?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setFeedback(data.error ?? "No se pudo enviar la solicitud.");
        return;
      }

      setStatus("success");
      setFeedback(`Solicitud enviada. Código: ${data.requestId}`);
      setFullName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setFeedback("Error de red al enviar la solicitud.");
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold">Solicitar adopción</h3>
          <p className="mt-2 text-sm text-brand-warmGray">Cuanto más detalle, mejor podremos ayudarte.</p>
        </div>
        <span className="badge">Respuesta en 24-48 h</span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <label className="text-sm font-semibold text-brand-ink md:col-span-2">
          Animal
          <select
            className="mt-2"
            value={animalId}
            onChange={(event) => setAnimalId(event.target.value)}
            required
            disabled={status === "loading"}
          >
            {animalOptions.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold text-brand-ink">
          Nombre y apellidos
          <input
            className="mt-2"
            placeholder="Nombre y apellidos"
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
          Mensaje (opcional)
          <textarea
            className="mt-2"
            placeholder="Cuántas personas vivirán con el animal, rutinas, experiencia, etc."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            disabled={status === "loading"}
          />
        </label>
      </div>

      <div className="mt-6 rounded-3xl border border-brand-border bg-white/70 p-4">
        <p className="text-sm font-semibold text-brand-ink">Requisitos habituales</p>
        <ul className="mt-2 space-y-1 text-xs text-brand-warmGray">
          <li>Compromiso de cuidado, tiempo y estabilidad.</li>
          <li>Seguimiento inicial y asesoramiento post-adopción.</li>
          <li>Documento de identidad y contrato de adopción.</li>
        </ul>
      </div>

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
          "Enviar solicitud"
        )}
      </button>
    </form>
  );
}