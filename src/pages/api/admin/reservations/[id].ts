import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { computeReservationPrice, computeStayDays } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";

type UpdatePayload = {
  owner?: {
    id?: string;
    fullName?: string;
    phone?: string;
    email?: string;
  };
  pet?: {
    id?: string;
    name?: string;
    species?: string;
    vaccinated?: boolean;
  };
  reservation?: {
    startDate?: string;
    endDate?: string;
    status?: string;
    notes?: string | null;
  };
  extras?: string[];
};

const validExtras = ["MEDICATION", "SPECIAL_CARE"];
const validSpecies = ["DOG", "CAT", "RABBIT", "BIRD"];
const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const role = (session as unknown as { role?: string })?.role;

  if (!session || role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "ID invalido" });
  }

  if (req.method === "GET") {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: { pet: true, owner: true, extras: true }
    });

    if (!reservation) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    return res.status(200).json(reservation);
  }

  if (req.method === "PUT") {
    const rawBody = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const payload = (rawBody ?? {}) as UpdatePayload;

    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: { pet: true, owner: true, extras: true }
    });

    if (!reservation) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    const startDate = payload.reservation?.startDate
      ? new Date(payload.reservation.startDate)
      : reservation.startDate;
    const endDate = payload.reservation?.endDate ? new Date(payload.reservation.endDate) : reservation.endDate;

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return res.status(400).json({ error: "Fechas invalidas" });
    }

    if (endDate < startDate) {
      return res.status(400).json({ error: "Rango de fechas invalido" });
    }

    const nextSpecies = validSpecies.includes(payload.pet?.species ?? "")
      ? (payload.pet?.species as string)
      : reservation.pet.species;

    const nextExtras = Array.isArray(payload.extras)
      ? payload.extras.filter((extra) => validExtras.includes(extra))
      : reservation.extras.map((extra) => extra.type);

    const days = computeStayDays(startDate, endDate);
    const pricing = computeReservationPrice({
      species: nextSpecies as "DOG" | "CAT" | "RABBIT" | "BIRD",
      days,
      extras: nextExtras as ("MEDICATION" | "SPECIAL_CARE")[]
    });

    let nextNotes = reservation.notes ?? null;
    if (typeof payload.reservation?.notes === "string") {
      const trimmed = payload.reservation.notes.trim();
      nextNotes = trimmed ? trimmed : null;
    } else if (payload.reservation?.notes === null) {
      nextNotes = null;
    }

    const nextStatus = validStatuses.includes(payload.reservation?.status ?? "")
      ? payload.reservation?.status
      : reservation.status;

    const updatedReservation = await prisma.$transaction(async (tx) => {
      if (payload.owner?.id) {
        await tx.owner.update({
          where: { id: payload.owner.id },
          data: {
            fullName: payload.owner.fullName ?? reservation.owner.fullName,
            phone: payload.owner.phone ?? reservation.owner.phone,
            email: payload.owner.email ?? reservation.owner.email
          }
        });
      }

      if (payload.pet?.id) {
        await tx.pet.update({
          where: { id: payload.pet.id },
          data: {
            name: payload.pet.name ?? reservation.pet.name,
            species: (payload.pet.species as string) ?? reservation.pet.species,
            vaccinated: payload.pet.vaccinated ?? reservation.pet.vaccinated
          }
        });
      }

      if (Array.isArray(payload.extras)) {
        await tx.reservationExtra.deleteMany({ where: { reservationId: id } });
        if (nextExtras.length) {
          await tx.reservationExtra.createMany({
            data: nextExtras.map((extra) => ({
              reservationId: id,
              type: extra,
              dailyPrice: new Prisma.Decimal(extra === "MEDICATION" ? 3 : 5)
            }))
          });
        }
      }

      return tx.reservation.update({
        where: { id },
        data: {
          startDate,
          endDate,
          days,
          baseDailyPrice: new Prisma.Decimal(pricing.baseDailyPrice),
          extrasDaily: new Prisma.Decimal(pricing.extrasDailyPrice),
          totalPrice: new Prisma.Decimal(pricing.totalPrice),
          status: nextStatus,
          notes: nextNotes
        },
        include: { owner: true, pet: true, extras: true }
      });
    });

    return res.status(200).json(updatedReservation);
  }

  if (req.method === "DELETE") {
    await prisma.reservation.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ error: "Metodo no permitido" });
}



