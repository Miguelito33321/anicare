import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = contactSchema.parse(await request.json());

    const message = await prisma.contactMessage.create({
      data: {
        fullName: payload.fullName,
        phone: payload.phone,
        email: payload.email,
        reason: payload.reason,
        message: payload.message,
        consent: payload.consent
      }
    });

    return NextResponse.json({ ok: true, id: message.id });
  } catch {
    return NextResponse.json({ error: "No se pudo enviar el formulario" }, { status: 400 });
  }
}
