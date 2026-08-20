import type { TTrain } from '../types/train';

export const getMonths = (trains: TTrain[]): string[] =>
  [...new Set(trains.flatMap((train) => train.departures.map((date) => date.slice(0, 7))))].sort();
