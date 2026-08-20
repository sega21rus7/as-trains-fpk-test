import type { TTrain } from '../types/train';

import { isRecord } from './isRecord';
import { isStringArray } from './isStringArray';
import { isValidIsoDate } from './isValidIsoDate';

export const isTrain = (value: unknown): value is TTrain => {
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
