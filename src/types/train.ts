export type TTrain = {
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

export type TTrainData = {
  trains: TTrain[];
};

export type TTrainFilters = {
  search: string;
  region: string;
  month: string;
};
