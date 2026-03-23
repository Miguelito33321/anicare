import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { hasAvailability } from "@/lib/availability";
import { sendReservationConfirmationEmail } from "@/lib/email";
import { computeReservationPrice, computeStayDays } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";
import { reservationCreateSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = reservationCreateSchema.parse(await request.json());

    const notes = payload.notes?.trim();
    const startDate = new Date(payload.stay.startDate);
    const endDate = new Date(payload.stay.endDate);

    if (endDate < startDate) {
      return NextResponse.json({ error: "Rango de fechas invalido" }, { status: 400 });
    }

    const availability = await hasAvailability(payload.pet.species, startDate, endDate);
    if (!availability.available) {
      return NextResponse.json({ error: "No hay plazas disponibles" }, { status: 409 });
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

    return NextResponse.json({
      reservationId: reservation.id,
      totalPrice: Number(reservation.totalPrice),
      status: reservation.status
    });
  } catch {
    return NextResponse.json({ error: "No fue posible crear la reserva" }, { status: 400 });
  }
}




