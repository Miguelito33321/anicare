export type Species = "DOG" | "CAT" | "RABBIT" | "BIRD";
export type ExtraType = "MEDICATION" | "SPECIAL_CARE";

export const BASE_PRICE: Record<Species, number> = {
  DOG: 12,
  CAT: 10,
  RABBIT: 6,
  BIRD: 4
};

export const EXTRA_PRICE: Record<ExtraType, number> = {
  MEDICATION: 3,
  SPECIAL_CARE: 5
};

export function computeStayDays(startDate: Date, endDate: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const start = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
  const end = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate());
  const diff = Math.floor((end - start) / msPerDay) + 1;
  return Math.max(diff, 1);
}

export function computeReservationPrice(params: {
  species: Species;
  days: number;
  extras: ExtraType[];
}) {
  const baseDailyPrice = BASE_PRICE[params.species] ?? 0;
  const extrasDailyPrice = params.extras.reduce((sum, extra) => sum + (EXTRA_PRICE[extra] ?? 0), 0);
  const totalPrice = (baseDailyPrice + extrasDailyPrice) * params.days;

  return {
    baseDailyPrice,
    extrasDailyPrice,
    totalPrice
  };
}
