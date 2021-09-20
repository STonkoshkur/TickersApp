import { useQuery } from 'react-query';

// Services
import API from 'src/services/API';

export const SEARCH_TICKERS_CACHE_KEY = 'search/tickers';

export const useTickersSearch = (searchString: string) => {
  const {
    data: tickers,
    isLoading: isTickersLoading,
    isError: isTickersFailed,
  } = useQuery(
    [SEARCH_TICKERS_CACHE_KEY, searchString],
    () => API.tickers.getUsStockTickers(searchString ?? ''),
    {
      select: (paginatedTickers) => paginatedTickers?.results ?? [],
      retry: false, // Polygon.io trial project allows only 5 requests per minute
      keepPreviousData: true, // Enabled to prevent improving blinking on search value change
      enabled: !!searchString, // make request only if search value isn't empty
      staleTime: 1000 * 60 * 60 * 1, // 1 hour
    },
  );

  return {
    tickers,
    isTickersLoading,
    isTickersFailed,
  };
};

export default useTickersSearch;
