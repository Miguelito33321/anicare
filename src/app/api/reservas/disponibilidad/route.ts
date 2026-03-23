import { NextResponse } from "next/server";
import { hasAvailability } from "@/lib/availability";
import { reservationAvailabilitySchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = reservationAvailabilitySchema.parse(await request.json());

    const startDate = new Date(payload.startDate);
    const endDate = new Date(payload.endDate);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return NextResponse.json({ error: "Fechas invalidas" }, { status: 400 });
    }

    if (endDate < startDate) {
      return NextResponse.json({ error: "La fecha final no puede ser menor que la inicial" }, { status: 400 });
    }

    const result = await hasAvailability(payload.species, startDate, endDate);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Solicitud invalida" }, { status: 400 });
  }
}
