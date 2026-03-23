import { NextResponse } from "next/server";
import { Species } from "@prisma/client";
import { prisma } from "@/lib/prisma";

function ageFilterToMonths(age: string | null) {
  switch (age) {
    case "CACHORRO":
      return { lte: 12 };
    case "JOVEN":
      return { gt: 12, lte: 36 };
    case "ADULTO":
      return { gt: 36 };
    default:
      return undefined;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const speciesParam = searchParams.get("species");
  const ageParam = searchParams.get("age");
  const sizeParam = searchParams.get("size");
  const temperamentParam = searchParams.get("temperament");

  const species =
    speciesParam && ["DOG", "CAT", "RABBIT", "BIRD"].includes(speciesParam)
      ? (speciesParam as Species)
      : undefined;

  const ageMonthsFilter = ageFilterToMonths(ageParam);

  const animals = await prisma.animal.findMany({
    where: {
      status: "AVAILABLE",
      ...(species ? { species } : {}),
      ...(ageMonthsFilter ? { ageMonths: ageMonthsFilter } : {}),
      ...(sizeParam ? { size: { equals: sizeParam, mode: "insensitive" } } : {}),
      ...(temperamentParam
        ? { temperament: { contains: temperamentParam, mode: "insensitive" } }
        : {})
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ items: animals });
}
