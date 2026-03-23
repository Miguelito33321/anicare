import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { hasAvailability } from "@/lib/availability";
import { sendReservationConfirmationEmail } from "@/lib/email";
import { computeReservationPrice, computeStayDays } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";
import { reservationCreateSchema } from "@/lib/validators";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const role = (session as unknown as { role?: string })?.role;

  if (!session || role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    const reservations = await prisma.reservation.findMany({
      include: { pet: true, owner: true, extras: true },
      orderBy: { createdAt: "desc" }
    });

    return res.status(200).json(reservations);
  }

  if (req.method === "POST") {
    try {
      const rawBody = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const payload = reservationCreateSchema.parse(rawBody);
      const notes = payload.notes?.trim();

      const startDate = new Date(payload.stay.startDate);
      const endDate = new Date(payload.stay.endDate);

      if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return res.status(400).json({ error: "Fechas invalidas" });
      }

      if (endDate < startDate) {
        return res.status(400).json({ error: "Rango de fechas invalido" });
      }

      const availability = await hasAvailability(payload.pet.species, startDate, endDate);
      if (!availability.available) {
        return res.status(409).json({ error: "No hay plazas disponibles" });
      }

      const days = computeStayDays(startDate, endDate);
      const pricing = computeReservationPrice({
        species: payload.pet.species,
        days,
        extras: payload.extras
      });

      const owner = await prisma.owner.upsert({
        where: { email: payload.owner.email },
        update: {
          fullName: payload.owner.fullName,
          phone: payload.owner.phone
        },
        create: {
          fullName: payload.owner.fullName,
          phone: payload.owner.phone,
          email: payload.owner.email
        }
      });

      const pet = await prisma.pet.create({
        data: {
          ownerId: owner.id,
          name: payload.pet.name,
          species: payload.pet.species,
          vaccinated: payload.pet.vaccinated,
          notes: payload.pet.notes
        }
      });

      const reservation = await prisma.reservation.create({
        data: {
          ownerId: owner.id,
          petId: pet.id,
          startDate,
          endDate,
          days,
          baseDailyPrice: new Prisma.Decimal(pricing.baseDailyPrice),
          extrasDaily: new Prisma.Decimal(pricing.extrasDailyPrice),
          totalPrice: new Prisma.Decimal(pricing.totalPrice),
          notes: notes || undefined,
          extras: {
            create: payload.extras.map((extra) => ({
              type: extra,
              dailyPrice: new Prisma.Decimal(extra === "MEDICATION" ? 3 : 5)
            }))
          }
        }
      });

      await sendReservationConfirmationEmail({
        to: owner.email,
        reservationId: reservation.id,
        totalPrice: pricing.totalPrice
      });

      return res.status(201).json({
        reservationId: reservation.id,
        totalPrice: Number(reservation.totalPrice),
        status: reservation.status
      });
    } catch {
      return res.status(400).json({ error: "No fue posible crear la reserva" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Metodo no permitido" });
}
