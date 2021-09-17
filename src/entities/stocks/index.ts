export type TraddeResult = {
  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
};

export type AggregatesBars = {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  results: TraddeResult[];
};
