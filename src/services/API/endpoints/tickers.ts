import axios from '../axios';

// Entities
import { Ticker } from 'src/entities/ticker';
import { Company } from 'src/entities/company';
import { Pagination } from 'src/entities/pagination';

export type GetTickersListParams = {
  market?: string;
  locale?: string;
  limit?: number;
};

export default {
  getUsStockTickers: (
    search: string,
    params: GetTickersListParams = {},
  ): Promise<Pagination<Ticker>> =>
    axios.get('v3/reference/tickers', {
      params: {
        market: 'stocks',
        locale: 'us',
        limit: 20,
        ...params,
        search,
      },
    }),
  getTickerDetails: (stocksTicker: string): Promise<Company> =>
    axios.get(`v1/meta/symbols/${stocksTicker}/company`),
};
