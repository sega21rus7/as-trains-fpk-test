import type { TTrain, TTrainFilters } from '../types/train';

export const filterTrains = (trains: TTrain[], filters: TTrainFilters): TTrain[] => {
  const normalizedSearch = filters.search.trim().toLocaleLowerCase('ru-RU');

  return trains.filter((train) => {
    const matchesSearch = train.name.toLocaleLowerCase('ru-RU').includes(normalizedSearch);
    const matchesRegion = filters.region === '' || train.region === filters.region;
    const matchesMonth =
      filters.month === '' || train.departures.some((date) => date.startsWith(filters.month));

    return matchesSearch && matchesRegion && matchesMonth;
  });
};
