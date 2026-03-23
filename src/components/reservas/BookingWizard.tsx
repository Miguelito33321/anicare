"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Species = "DOG" | "CAT" | "RABBIT" | "BIRD";
type Extra = "MEDICATION" | "SPECIAL_CARE";

type AvailabilityState = {
  available: boolean;
  remainingSlots: number;
};

const STEPS = [
  { id: 1, label: "Tipo" },
  { id: 2, label: "Fechas" },
  { id: 3, label: "Tutor" },
  { id: 4, label: "Extras" },
  { id: 5, label: "Confirmar" }
];

const SPECIES_LABEL: Record<Species, string> = {
  DOG: "Perro",
  CAT: "Gato",
  RABBIT: "Conejo",
  BIRD: "Ave"
};

const SPECIES_BLURB: Record<Species, string> = {
  DOG: "Juego supervisado, descanso seguro y paseos adaptados.",
  CAT: "Rutinas suaves, ambiente tranquilo y enriquecimiento.",
  RABBIT: "Zona calmada, alimentación controlada y supervisión.",
  BIRD: "Espacio protegido, vigilancia diaria y cuidado cercano."
};

const BASE_PRICE: Record<Species, number> = {
  DOG: 12,
  CAT: 10,
  RABBIT: 6,
  BIRD: 4
};

const EXTRA_PRICE: Record<Extra, number> = {
  MEDICATION: 3,
  SPECIAL_CARE: 5
};

const EXTRA_LABEL: Record<Extra, string> = {
  MEDICATION: "Administración de medicamentos",
  SPECIAL_CARE: "Cuidados especiales"
};

type BookingFormState = {
  species: Species | null;
  startDate: string;
  endDate: string;
  ownerFullName: string;
  ownerPhone: string;
  ownerEmail: string;
  petName: string;
  vaccinated: boolean;
  petNotes: string;
  extras: Extra[];
};

const initialFormState: BookingFormState = {
  species: null,
  startDate: "",
  endDate: "",
  ownerFullName: "",
  ownerPhone: "",
  ownerEmail: "",
  petName: "",
  vaccinated: false,
  petNotes: "",
  extras: []
};

function computeDays(startDate: string, endDate: string) {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return 0;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const startUtc = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const endUtc = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

  return Math.floor((endUtc - startUtc) / msPerDay) + 1;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function CheckIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 7 10 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 3v3M17 3v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.5 9.2h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M6.5 6h11c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2h-11c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DogIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.5 12.5c-.9-1.6-1-3.7.1-5.3l1.2-1.7c.4-.6 1.1-1 1.8-1h2.2c.6 0 1.2.2 1.7.6l1.8 1.3c.5.4 1.1.6 1.7.6h.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 12.8v2.4c0 2 1.6 3.5 3.6 3.5h2.8c2 0 3.6-1.5 3.6-3.5v-2.8c0-1.3-.7-2.6-1.8-3.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M9.5 11.5h.01M14.5 11.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function CatIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.5 9.5 5.2 6.2c-.2-.5.3-1 .8-.8l3.1 1.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17.5 9.5l1.3-3.3c.2-.5-.3-1-.8-.8l-3.1 1.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7.2 10.8A5.8 5.8 0 0 1 12 8.5c1.8 0 3.4.8 4.5 2.1 1 1.2 1.5 2.6 1.5 4.1 0 2.7-2.2 4.8-5 4.8h-2c-2.8 0-5-2.1-5-4.8 0-1.5.5-2.9 1.2-3.9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M10 13.2h.01M14 13.2h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function RabbitIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.2 6.2c-.9-1.5-1.3-2.9-.9-3.6.6-1 2.4.1 3.8 1.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14.8 6.2c.9-1.5 1.3-2.9.9-3.6-.6-1-2.4.1-3.8 1.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7.5 13.2c0-3 2.1-5.4 4.7-5.4s4.7 2.4 4.7 5.4c0 3-2.1 5.4-4.7 5.4s-4.7-2.4-4.7-5.4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M10.4 12.8h.01M14 12.8h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BirdIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 13.2c0-3.6 2.6-6.5 5.9-6.5 2.5 0 4.6 1.7 5.4 4.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 13.2c0 3 2.5 5.4 5.6 5.4 2.9 0 5.3-2.1 5.6-4.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18.2 10.8c-1.5.2-2.9.9-3.9 1.9 1.2 0 2.5.4 3.6 1.2.7.5 1.7.1 1.8-.7.1-.7.1-1.6-.2-2.4-.2-.7-.7-1.1-1.3-1Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path d="M11.2 12.1h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SpeciesIcon({ species }: { species: Species }) {
  if (species === "DOG") return <DogIcon />;
  if (species === "CAT") return <CatIcon />;
  if (species === "RABBIT") return <RabbitIcon />;
  return <BirdIcon />;
}

function Spinner() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4a8 8 0 1 0 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
export function BookingWizard() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<BookingFormState>(initialFormState);
  const [availability, setAvailability] = useState<AvailabilityState | null>(null);
  const [error, setError] = useState<string>("");
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationResult, setReservationResult] = useState<{ reservationId: string; totalPrice: number } | null>(
    null
  );

  const days = useMemo(() => computeDays(form.startDate, form.endDate), [form.startDate, form.endDate]);

  const progress = useMemo(() => {
    const denom = STEPS.length - 1;
    if (denom <= 0) return 0;
    return Math.round(((step - 1) / denom) * 100);
  }, [step]);

  const price = useMemo(() => {
    if (!form.species || days <= 0) {
      return { baseDaily: 0, extrasDaily: 0, total: 0 };
    }

    const extrasDaily = form.extras.reduce((sum, extra) => sum + EXTRA_PRICE[extra], 0);
    const baseDaily = BASE_PRICE[form.species];

    return {
      baseDaily,
      extrasDaily,
      total: days * (baseDaily + extrasDaily)
    };
  }, [days, form.extras, form.species]);

  const canGoPrev = step > 1;
  const canGoNext = step < 5;

  const updateForm = <K extends keyof BookingFormState>(key: K, value: BookingFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleExtra = (extra: Extra) => {
    setForm((current) => {
      const exists = current.extras.includes(extra);
      return {
        ...current,
        extras: exists ? current.extras.filter((item) => item !== extra) : [...current.extras, extra]
      };
    });
  };

  useEffect(() => {
    setAvailability(null);
    setReservationResult(null);
  }, [form.species, form.startDate, form.endDate]);
  const validateCurrentStep = () => {
    switch (step) {
      case 1:
        if (!form.species) {
          setError("Selecciona la especie de la mascota para continuar.");
          return false;
        }
        return true;
      case 2:
        if (!form.startDate || !form.endDate) {
          setError("Selecciona fecha de inicio y fecha de fin.");
          return false;
        }
        if (days <= 0) {
          setError("El rango de fechas no es válido.");
          return false;
        }
        return true;
      case 3:
        if (!form.ownerFullName.trim() || !form.ownerPhone.trim() || !form.ownerEmail.trim() || !form.petName.trim()) {
          setError("Completa todos los campos obligatorios del tutor y la mascota.");
          return false;
        }
        if (!isValidEmail(form.ownerEmail)) {
          setError("Introduce un email válido.");
          return false;
        }
        if (!form.vaccinated) {
          setError("Debes confirmar el estado de vacunación para continuar.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const checkAvailability = async () => {
    if (!form.species) return false;

    setIsCheckingAvailability(true);
    setError("");

    try {
      const response = await fetch("/api/reservas/disponibilidad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          species: form.species,
          startDate: new Date(form.startDate).toISOString(),
          endDate: new Date(form.endDate).toISOString()
        })
      });

      const data = (await response.json()) as AvailabilityState & { error?: string };

      if (!response.ok) {
        setError(data.error ?? "No fue posible validar disponibilidad.");
        return false;
      }

      setAvailability({ available: data.available, remainingSlots: data.remainingSlots });

      if (!data.available) {
        setError("No quedan plazas para las fechas seleccionadas.");
        return false;
      }

      return true;
    } catch {
      setError("Error de red validando disponibilidad.");
      return false;
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleNext = async () => {
    setError("");
    if (!validateCurrentStep()) return;

    if (step === 2) {
      const ok = await checkAvailability();
      if (!ok) return;
    }

    setStep((current) => Math.min(current + 1, 5));
  };

  const handlePrev = () => {
    setError("");
    setStep((current) => Math.max(current - 1, 1));
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.species) {
      setError("Falta especie de mascota.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner: {
            fullName: form.ownerFullName,
            phone: form.ownerPhone,
            email: form.ownerEmail
          },
          pet: {
            name: form.petName,
            species: form.species,
            vaccinated: form.vaccinated,
            notes: form.petNotes || undefined
          },
          stay: {
            startDate: new Date(form.startDate).toISOString(),
            endDate: new Date(form.endDate).toISOString()
          },
          extras: form.extras
        })
      });

      const data = (await response.json()) as {
        reservationId?: string;
        totalPrice?: number;
        error?: string;
      };

      if (!response.ok || !data.reservationId) {
        setError(data.error ?? "No se pudo completar la reserva.");
        return;
      }

      setReservationResult({
        reservationId: data.reservationId,
        totalPrice: data.totalPrice ?? price.total
      });
    } catch {
      setError("Error de red al crear la reserva.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitle = STEPS.find((s) => s.id === step)?.label ?? "";
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-warmGray">Proceso de reserva</p>
            <p className="mt-1 text-sm text-brand-warmGray">
              Paso <span className="font-semibold text-brand-ink">{step}</span> de{" "}
              <span className="font-semibold text-brand-ink">{STEPS.length}</span> ({stepTitle})
            </p>
          </div>
          <span className="badge">{progress}%</span>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-brand-border/60">
          <div
            className="h-2 rounded-full bg-brand-pinkDeep transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ol className="mt-4 hidden grid-cols-5 gap-2 md:grid">
          {STEPS.map((item) => {
            const active = item.id === step;
            const done = item.id < step;

            return (
              <li
                key={item.id}
                className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-semibold transition ${
                  active
                    ? "border-brand-pinkDeep bg-brand-pinkSoft text-brand-ink"
                    : done
                      ? "border-brand-border bg-white/60 text-brand-ink"
                      : "border-brand-border bg-white/30 text-brand-warmGray"
                }`}
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full text-xs ${
                    active
                      ? "bg-brand-pinkDeep text-white"
                      : done
                        ? "bg-brand-ink text-white"
                        : "bg-white text-brand-warmGray ring-1 ring-brand-border"
                  }`}
                  aria-hidden
                >
                  {done ? <CheckIcon /> : item.id}
                </span>
                <span className="truncate">{item.label}</span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <section className="card">          {step === 1 && (
            <div>
              <h2 className="text-lg font-extrabold">Selecciona la especie</h2>
              <p className="mt-2 text-sm text-brand-warmGray">
                Plazas limitadas y cuidado personalizado. La tarifa base se calcula por día.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {(Object.keys(SPECIES_LABEL) as Species[]).map((species) => {
                  const selected = form.species === species;

                  return (
                    <label
                      key={species}
                      className={`relative cursor-pointer rounded-3xl border p-4 shadow-sm transition ${
                        selected
                          ? "border-brand-pinkDeep bg-brand-pinkSoft shadow-soft"
                          : "border-brand-border bg-white/70 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
                      }`}
                    >
                      <input
                        type="radio"
                        name="species"
                        className="sr-only"
                        checked={selected}
                        onChange={() => updateForm("species", species)}
                      />

                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70 ring-1 ring-brand-border/70">
                            <SpeciesIcon species={species} />
                          </span>
                          <div>
                            <p className="text-sm font-extrabold text-brand-ink">{SPECIES_LABEL[species]}</p>
                            <p className="mt-1 text-xs font-semibold text-brand-warmGray">{BASE_PRICE[species]} EUR/día</p>
                          </div>
                        </div>

                        <span
                          className={`grid h-7 w-7 place-items-center rounded-full border ${
                            selected ? "border-brand-pinkDeep bg-brand-pinkDeep text-white" : "border-brand-border bg-white"
                          }`}
                          aria-hidden
                        >
                          {selected ? <CheckIcon /> : null}
                        </span>
                      </div>

                      <p className="mt-3 text-xs text-brand-warmGray">{SPECIES_BLURB[species]}</p>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-extrabold">Selecciona fechas</h2>
              <p className="mt-2 text-sm text-brand-warmGray">Comprobamos disponibilidad antes de continuar.</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <label className="text-sm font-semibold text-brand-ink">
                  Fecha de inicio
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-warmGray">
                      <CalendarIcon />
                    </span>
                    <input
                      type="date"
                      className="pl-10"
                      value={form.startDate}
                      onChange={(event) => updateForm("startDate", event.target.value)}
                    />
                  </div>
                </label>

                <label className="text-sm font-semibold text-brand-ink">
                  Fecha de fin
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-warmGray">
                      <CalendarIcon />
                    </span>
                    <input
                      type="date"
                      className="pl-10"
                      value={form.endDate}
                      onChange={(event) => updateForm("endDate", event.target.value)}
                    />
                  </div>
                </label>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="badge">Días: {days || "-"}</span>
                <span className="badge">Total estimado: {price.total} EUR</span>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-extrabold">Datos del tutor y mascota</h2>
              <p className="mt-2 text-sm text-brand-warmGray">Usaremos estos datos para confirmar la estancia.</p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <label className="text-sm font-semibold text-brand-ink">
                  Nombre y apellidos
                  <input
                    className="mt-2"
                    placeholder="Nombre del tutor"
                    value={form.ownerFullName}
                    onChange={(event) => updateForm("ownerFullName", event.target.value)}
                  />
                </label>

                <label className="text-sm font-semibold text-brand-ink">
                  Teléfono
                  <input
                    className="mt-2"
                    placeholder="Teléfono"
                    value={form.ownerPhone}
                    onChange={(event) => updateForm("ownerPhone", event.target.value)}
                    inputMode="tel"
                  />
                </label>

                <label className="text-sm font-semibold text-brand-ink md:col-span-2">
                  Email
                  <input
                    className="mt-2"
                    placeholder="Email"
                    type="email"
                    value={form.ownerEmail}
                    onChange={(event) => updateForm("ownerEmail", event.target.value)}
                  />
                </label>

                <label className="text-sm font-semibold text-brand-ink">
                  Nombre de la mascota
                  <input
                    className="mt-2"
                    placeholder="Nombre de la mascota"
                    value={form.petName}
                    onChange={(event) => updateForm("petName", event.target.value)}
                  />
                </label>

                <label className="text-sm font-semibold text-brand-ink md:col-span-2">
                  Notas (opcional)
                  <textarea
                    className="mt-2"
                    placeholder="Alergias, rutinas, medicación, etc."
                    value={form.petNotes}
                    onChange={(event) => updateForm("petNotes", event.target.value)}
                  />
                </label>
              </div>

              <label
                className={`mt-4 flex items-start gap-3 rounded-3xl border p-4 text-sm transition ${
                  form.vaccinated ? "border-brand-border bg-white/70" : "border-amber-200 bg-amber-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.vaccinated}
                  onChange={(event) => updateForm("vaccinated", event.target.checked)}
                  className="mt-1"
                />
                <span>
                  <span className="block font-semibold text-brand-ink">Vacunación al día</span>
                  <span className="mt-1 block text-xs text-brand-warmGray">
                    Para la seguridad de todos los animales, confirmamos estado de vacunación.
                  </span>
                </span>
              </label>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-lg font-extrabold">Servicios extra</h2>
              <p className="mt-2 text-sm text-brand-warmGray">Activa solo lo que necesitas. Se calcula por día.</p>

              <div className="mt-6 space-y-3">
                {(Object.keys(EXTRA_LABEL) as Extra[]).map((extra) => {
                  const checked = form.extras.includes(extra);

                  return (
                    <label
                      key={extra}
                      className={`flex items-center justify-between gap-4 rounded-3xl border p-4 shadow-sm transition ${
                        checked
                          ? "border-brand-pinkDeep bg-brand-pinkSoft"
                          : "border-brand-border bg-white/70 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-brand-ink">{EXTRA_LABEL[extra]}</p>
                        <p className="mt-1 text-xs text-brand-warmGray">+{EXTRA_PRICE[extra]} EUR/día</p>
                      </div>

                      <span className="relative inline-flex h-7 w-12 items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={checked}
                          onChange={() => toggleExtra(extra)}
                        />
                        <span className="h-7 w-12 rounded-full bg-brand-border transition peer-checked:bg-brand-pinkDeep" />
                        <span className="absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-extrabold">Confirmación de reserva</h2>
                <p className="mt-2 text-sm text-brand-warmGray">
                  Revisa el resumen y confirma. Te enviaremos el detalle por email.
                </p>
              </div>

              {reservationResult ? (
                <div className="rounded-3xl border border-green-200 bg-green-50 p-5 text-sm text-green-900">
                  <p className="font-semibold">Reserva confirmada</p>
                  <p className="mt-2">
                    Código: <strong>{reservationResult.reservationId}</strong>
                  </p>
                  <p className="mt-1">
                    Total: <strong>{reservationResult.totalPrice} EUR</strong>
                  </p>
                </div>
              ) : (
                <div className="rounded-3xl border border-brand-border bg-white/70 p-5">
                  <dl className="grid gap-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-brand-warmGray">Especie</dt>
                      <dd className="font-semibold text-brand-ink">{form.species ? SPECIES_LABEL[form.species] : "-"}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-brand-warmGray">Fechas</dt>
                      <dd className="font-semibold text-brand-ink">
                        {form.startDate && form.endDate ? `${form.startDate} a ${form.endDate}` : "-"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-brand-warmGray">Tutor</dt>
                      <dd className="font-semibold text-brand-ink">{form.ownerFullName || "-"}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-brand-warmGray">Mascota</dt>
                      <dd className="font-semibold text-brand-ink">{form.petName || "-"}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-brand-warmGray">Extras</dt>
                      <dd className="font-semibold text-brand-ink">
                        {form.extras.length > 0 ? form.extras.map((extra) => EXTRA_LABEL[extra]).join(", ") : "-"}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          )}

          {error ? (
            <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <p className="font-semibold">Revisa este punto</p>
              <p className="mt-1">{error}</p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canGoPrev || isCheckingAvailability || isSubmitting}
              className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>

            {canGoNext ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isCheckingAvailability || isSubmitting}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCheckingAvailability ? (
                  <>
                    <Spinner />
                    Validando plazas...
                  </>
                ) : (
                  "Siguiente"
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || Boolean(reservationResult)}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Procesando...
                  </>
                ) : reservationResult ? (
                  "Reserva enviada"
                ) : (
                  "Confirmar reserva"
                )}
              </button>
            )}
          </div>
        </section>
        <aside className="card h-fit lg:sticky lg:top-24">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-extrabold">Resumen</h3>
              <p className="mt-1 text-xs text-brand-warmGray">Precio estimado en tiempo real.</p>
            </div>
            {form.species ? <span className="badge">{SPECIES_LABEL[form.species]}</span> : <span className="badge">-</span>}
          </div>

          <dl className="mt-5 space-y-2 text-sm text-brand-warmGray">
            <div className="flex justify-between">
              <dt>Tarifa base/día</dt>
              <dd className="font-semibold text-brand-ink">{price.baseDaily} EUR</dd>
            </div>
            <div className="flex justify-between">
              <dt>Extras/día</dt>
              <dd className="font-semibold text-brand-ink">{price.extrasDaily} EUR</dd>
            </div>
            <div className="flex justify-between">
              <dt>Días</dt>
              <dd className="font-semibold text-brand-ink">{days || "-"}</dd>
            </div>
            <div className="flex justify-between border-t border-brand-border/70 pt-3 text-base">
              <dt className="font-extrabold text-brand-ink">Total</dt>
              <dd className="font-extrabold text-brand-ink">{price.total} EUR</dd>
            </div>
          </dl>

          <div className="mt-5 rounded-3xl border border-brand-border bg-white/70 p-4">
            {isCheckingAvailability ? (
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-warmGray">
                <Spinner />
                Validando disponibilidad...
              </p>
            ) : availability ? (
              <p className={`text-sm font-semibold ${availability.available ? "text-green-800" : "text-red-700"}`}>
                {availability.available
                  ? `Plazas disponibles: ${availability.remainingSlots}`
                  : "Sin plazas disponibles en las fechas seleccionadas"}
              </p>
            ) : (
              <p className="text-sm text-brand-warmGray">Selecciona fechas para ver disponibilidad.</p>
            )}
          </div>

          <div className="mt-5">
            <p className="text-xs text-brand-warmGray">
              ¿Necesitas ayuda?{" "}
              <Link href="/contacto" className="font-semibold text-brand-ink hover:underline">
                Contactar
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}