import type { TTrain } from '../types/train';

export const getRegions = (trains: TTrain[]): string[] =>
  [...new Set(trains.map((train) => train.region))].sort((first, second) =>
    first.localeCompare(second, 'ru'),
  );
