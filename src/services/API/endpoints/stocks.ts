import axios from '../axios';

// Entities
import { AggregatesBars } from 'src/entities/stocks';

export type GetAggregateBarsParams = {
  stocksTicker: string;
  from: string;
  to: string;
  multiplier?: number;
  timespan?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
};

export default {
  geAggregateBarsForPeriod: ({
    to,
    from,
    stocksTicker,
    multiplier = 1,
    timespan = 'day',
  }: GetAggregateBarsParams): Promise<AggregatesBars> =>
    axios.get(
      `v2/aggs/ticker/${stocksTicker}/range/${multiplier}/${timespan}/${from}/${to}`,
    ),
};
