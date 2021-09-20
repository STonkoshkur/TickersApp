import { useQuery } from 'react-query';

// Services
import API from 'src/services/API';

export const SYMBOL_COMPANY_DETAILS_CACHE_KEY = 'company';

export const useSymbolCompanyDetails = (tickerSymbol: string) => {
  const {
    data: symbolCompany,
    isError: isCompanyLoadingFailed,
    ...queryData
  } = useQuery(
    [SYMBOL_COMPANY_DETAILS_CACHE_KEY, tickerSymbol],
    () => API.tickers.getTickerDetails(tickerSymbol),
    {
      retry: false, // Polygon.io trial project allows only 5 requests per minute
      staleTime: 5 * 60 * 1000, // 5 min
    },
  );

  return {
    ...queryData,
    symbolCompany,
    isCompanyLoadingFailed,
  };
};

export default useSymbolCompanyDetails;
