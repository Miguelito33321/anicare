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

  if (req.method === "GET") {
    const animals = await prisma.animal.findMany();
    return res.status(200).json(animals);
  }

  if (req.method === "POST") {
    const data = buildAnimalData(req.body);
    const newAnimal = await prisma.animal.create({ data });
    return res.status(201).json(newAnimal);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Método no permitido" });
}