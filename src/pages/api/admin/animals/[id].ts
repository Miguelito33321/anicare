import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";

function buildAnimalData(body: any) {
  const imageUrl = typeof body?.imageUrl === "string" ? body.imageUrl.trim() : "";
  const imageUrls = Array.isArray(body?.imageUrls)
    ? body.imageUrls.map((item: string) => String(item).trim()).filter(Boolean)
    : [];

  const mergedImageUrls = imageUrl ? [imageUrl, ...imageUrls.filter((url) => url !== imageUrl)] : imageUrls;

  return {
    name: body?.name ?? "",
    species: body?.species ?? "DOG",
    ageMonths: Number(body?.ageMonths ?? 0),
    size: body?.size ?? "",
    temperament: body?.temperament ?? "",
    healthStatus: body?.healthStatus ?? "",
    adoptionRequirements: body?.adoptionRequirements ?? "",
    description: body?.description ?? "",
    status: body?.status ?? "AVAILABLE",
    featured: Boolean(body?.featured),
    imageUrl: imageUrl || null,
    imageUrls: mergedImageUrls
  } as any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const role = (session as unknown as { role?: string })?.role;

  if (!session || role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "ID inválido" });
  }

  if (req.method === "GET") {
    const animal = await prisma.animal.findUnique({ where: { id } });
    return res.status(200).json(animal);
  }

  if (req.method === "PUT") {
    const data = buildAnimalData(req.body);
    const updated = await prisma.animal.update({ where: { id }, data });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await prisma.animal.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ error: "Método no permitido" });
}