import type { TTrain, TTrainData, TTrainFilters } from '../types/train';

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MONTH_PATTERN = /^\d{4}-\d{2}$/;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isValidIsoDate = (value: string): boolean => {
  if (!ISO_DATE_PATTERN.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const isTrain = (value: unknown): value is TTrain => {
  if (!isRecord(value)) {
    return false;
  }

  const train = value;
  return (
    typeof train.id === 'string' &&
    typeof train.name === 'string' &&
    typeof train.region === 'string' &&
    isStringArray(train.route) &&
    train.route.length >= 2 &&
    typeof train.duration_days === 'number' &&
    Number.isInteger(train.duration_days) &&
    train.duration_days > 0 &&
    isStringArray(train.departures) &&
    train.departures.every(isValidIsoDate) &&
    typeof train.price_from === 'number' &&
    Number.isFinite(train.price_from) &&
    train.price_from >= 0 &&
    isStringArray(train.tags) &&
    typeof train.description === 'string' &&
    isStringArray(train.excursions) &&
    typeof train.buy_url === 'string' &&
    URL.canParse(train.buy_url)
  );
};

const parseTrainData = (value: unknown): TTrainData | null => {
  if (!isRecord(value) || !('trains' in value)) {
    return null;
  }

  const trains = value.trains;
  return Array.isArray(trains) && trains.every(isTrain) ? { trains } : null;
};

const formatDate = (date: string): string =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));

const formatMonth = (month: string): string => {
  if (!MONTH_PATTERN.test(month)) {
    return month;
  }

  const [year, monthNumber] = month.split('-').map(Number);
  return new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, monthNumber - 1, 1)));
};

const formatPrice = (price: number): string => `${new Intl.NumberFormat('ru-RU').format(price)} ₽`;

const pluralizeDays = (days: number): string => {
  const lastTwoDigits = days % 100;
  const lastDigit = days % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${days} дней`;
  }

  if (lastDigit === 1) {
    return `${days} день`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${days} дня`;
  }

  return `${days} дней`;
};

const toLocalIsoDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getNearestUpcomingDeparture = (
  departures: string[],
  today: Date = new Date(),
): string | null => {
  const todayKey = toLocalIsoDate(today);
  return [...departures].sort().find((departure) => departure >= todayKey) ?? null;
};

const getRouteEndpoints = (route: string[]): string => `${route[0]} → ${route[route.length - 1]}`;

const getRegions = (trains: TTrain[]): string[] =>
  [...new Set(trains.map((train) => train.region))].sort((first, second) =>
    first.localeCompare(second, 'ru'),
  );

const getMonths = (trains: TTrain[]): string[] =>
  [...new Set(trains.flatMap((train) => train.departures.map((date) => date.slice(0, 7))))].sort();

const filterTrains = (trains: TTrain[], filters: TTrainFilters): TTrain[] => {
  const normalizedSearch = filters.search.trim().toLocaleLowerCase('ru-RU');

  return trains.filter((train) => {
    const matchesSearch = train.name.toLocaleLowerCase('ru-RU').includes(normalizedSearch);
    const matchesRegion = filters.region === '' || train.region === filters.region;
    const matchesMonth =
      filters.month === '' || train.departures.some((date) => date.startsWith(filters.month));

    return matchesSearch && matchesRegion && matchesMonth;
  });
};

const getPreviewDeparture = (
  train: TTrain,
  selectedMonth: string,
  today: Date = new Date(),
): string | null => {
  if (selectedMonth !== '') {
    return [...train.departures].sort().find((date) => date.startsWith(selectedMonth)) ?? null;
  }

  return getNearestUpcomingDeparture(train.departures, today);
};

export {
  filterTrains,
  formatDate,
  formatMonth,
  formatPrice,
  getMonths,
  getNearestUpcomingDeparture,
  getPreviewDeparture,
  getRegions,
  getRouteEndpoints,
  parseTrainData,
  pluralizeDays,
};
