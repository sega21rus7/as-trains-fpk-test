type TTrain = {
  id: string;
  name: string;
  region: string;
  route: string[];
  duration_days: number;
  departures: string[];
  price_from: number;
  tags: string[];
  description: string;
  excursions: string[];
  buy_url: string;
};

type TTrainData = {
  trains: TTrain[];
};

type TTrainFilters = {
  search: string;
  region: string;
  month: string;
};

export type { TTrain, TTrainData, TTrainFilters };
