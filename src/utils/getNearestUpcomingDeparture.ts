import { toLocalIsoDate } from './toLocalIsoDate';

export const getNearestUpcomingDeparture = (
  departures: string[],
  today: Date = new Date(),
): string | null => {
  const todayKey = toLocalIsoDate(today);
  return [...departures].sort().find((departure) => departure >= todayKey) ?? null;
};
