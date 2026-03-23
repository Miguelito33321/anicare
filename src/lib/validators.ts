import { z } from "zod";

const validDateString = z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
  message: "Fecha invalida"
});

export const reservationAvailabilitySchema = z.object({
  species: z.enum(["DOG", "CAT", "RABBIT", "BIRD"]),
  startDate: validDateString,
  endDate: validDateString
});

export const reservationCreateSchema = z.object({
  owner: z.object({
    fullName: z.string().min(2),
    phone: z.string().min(7),
    email: z.string().email()
  }),
  pet: z.object({
    name: z.string().min(1),
    species: z.enum(["DOG", "CAT", "RABBIT", "BIRD"]),
    vaccinated: z.boolean(),
    notes: z.string().max(500).optional()
  }),
  stay: z.object({
    startDate: validDateString,
    endDate: validDateString
  }),
  notes: z.string().max(500).optional(),
  extras: z.array(z.enum(["MEDICATION", "SPECIAL_CARE"]))
});

export const adoptionRequestSchema = z.object({
  animalId: z.string().min(1),
  fullName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  message: z.string().max(1500).optional()
});

export const contactSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  reason: z.enum(["RESERVA", "ADOPCION", "CONSULTA"]),
  message: z.string().min(10).max(2000),
  consent: z.literal(true)
});

export const newsletterSchema = z.object({
  email: z.string().email(),
  consent: z.literal(true)
});

