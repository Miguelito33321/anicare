import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = newsletterSchema.parse(await request.json());

    await prisma.newsletterSubscriber.upsert({
      where: { email: payload.email },
      update: { consent: payload.consent },
      create: { email: payload.email, consent: payload.consent }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "No se pudo procesar la suscripcion" }, { status: 400 });
  }
}
