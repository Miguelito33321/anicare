import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adoptionRequestSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = adoptionRequestSchema.parse(await request.json());

    const exists = await prisma.animal.findUnique({
      where: { id: payload.animalId },
      select: { id: true, status: true }
    });

    if (!exists || exists.status !== "AVAILABLE") {
      return NextResponse.json({ error: "Animal no disponible" }, { status: 404 });
    }

    const record = await prisma.adoptionApplication.create({
      data: {
        animalId: payload.animalId,
        fullName: payload.fullName,
        phone: payload.phone,
        email: payload.email,
        message: payload.message
      }
    });

    return NextResponse.json({ ok: true, requestId: record.id });
  } catch {
    return NextResponse.json({ error: "Solicitud invalida" }, { status: 400 });
  }
}
