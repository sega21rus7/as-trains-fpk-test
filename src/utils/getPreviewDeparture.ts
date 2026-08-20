import type { TTrain } from '../types/train';

import { getNearestUpcomingDeparture } from './getNearestUpcomingDeparture';

export const getPreviewDeparture = (
  train: TTrain,
  selectedMonth: string,
  today: Date = new Date(),
): string | null => {
  if (selectedMonth !== '') {
    return [...train.departures].sort().find((date) => date.startsWith(selectedMonth)) ?? null;
  }

  return getNearestUpcomingDeparture(train.departures, today);
};
