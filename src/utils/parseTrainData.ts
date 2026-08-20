import type { TTrainData } from '../types/train';

import { isRecord } from './isRecord';
import { isTrain } from './isTrain';

export const parseTrainData = (value: unknown): TTrainData | null => {
  if (!isRecord(value) || !('trains' in value)) {
    return null;
  }

  const trains = value.trains;
  return Array.isArray(trains) && trains.every(isTrain) ? { trains } : null;
};
