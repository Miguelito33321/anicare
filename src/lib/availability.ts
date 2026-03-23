import { ReservationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Species } from "@/lib/pricing";

export const SPECIES_CAPACITY: Record<Species, number> = {
  DOG: 10,
  CAT: 10,
  RABBIT: 10,
  BIRD: 15
};

function getDateRange(startDate: Date, endDate: Date): Date[] {
  const days: Date[] = [];
  const current = new Date(startDate);
  current.setHours(0, 0, 0, 0);

  const limit = new Date(endDate);
  limit.setHours(0, 0, 0, 0);

  while (current <= limit) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}

export async function getRemainingSlots(species: Species, startDate: Date, endDate: Date) {
  const capacity = SPECIES_CAPACITY[species];
  const activeStatuses: ReservationStatus[] = ["PENDING", "CONFIRMED"];

  const reservations = await prisma.reservation.findMany({
    where: {
      status: { in: activeStatuses },
      pet: { species },
      startDate: { lte: endDate },
      endDate: { gte: startDate }
    },
    select: {
      startDate: true,
      endDate: true
    }
  });

  if (!reservations.length) {
    return capacity;
  }

  const requestedDays = getDateRange(startDate, endDate);
  let maxOccupied = 0;

  for (const day of requestedDays) {
    const occupied = reservations.filter((res) => {
      const start = new Date(res.startDate);
      const end = new Date(res.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return start <= day && end >= day;
    }).length;

    if (occupied > maxOccupied) {
      maxOccupied = occupied;
    }
  }

  return Math.max(capacity - maxOccupied, 0);
}

export async function hasAvailability(species: Species, startDate: Date, endDate: Date) {
  const remainingSlots = await getRemainingSlots(species, startDate, endDate);
  return {
    available: remainingSlots > 0,
    remainingSlots
  };
}
