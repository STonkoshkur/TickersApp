import { useQuery } from 'react-query';

// Services
import API from 'src/services/API';

// Utils
import { getISOFormatedDate, addMonth } from 'src/utils/dateTime';

export const GET_SYMBOL_AGGREGATED_STOCKS_CACHE_KEY = 'symbolStocksAggregated';

export const useSymbolAggregatedStocks = (stocksTicker: string) => {
  const toDate = getISOFormatedDate(new Date());
  const fromDate = getISOFormatedDate(addMonth(new Date(), -1));

  const {
    data: symbolStocksAggregates,
    isLoading: isLoadingSymbolStocksAggregates,
    refetch: refetchSymbolStocksAggregates,
  } = useQuery(
    [GET_SYMBOL_AGGREGATED_STOCKS_CACHE_KEY, stocksTicker],
    () =>
      API.stocks.geAggregateBarsForPeriod({
        stocksTicker,
        from: fromDate,
        to: toDate,
      }),
    {
      staleTime: 60 * 60 * 1000, // 1 hour
      onError: () => {},
    },
  );

  const symbolStocksAggregatesForChart =
    symbolStocksAggregates?.results?.map(({ c }) => c) ?? [];

  // Value is grown when last stock value is greater than first stock value for selected period
  const isValueGrownPerPeriod =
    symbolStocksAggregatesForChart?.length >= 2
      ? symbolStocksAggregatesForChart[
          symbolStocksAggregatesForChart.length - 1
        ] >= symbolStocksAggregatesForChart[0]
      : true;

  return {
    symbolStocksAggregates,
    symbolStocksAggregatesForChart,
    isValueGrownPerPeriod,
    isLoadingSymbolStocksAggregates,
    refetchSymbolStocksAggregates,
  };
};

export default useSymbolAggregatedStocks;
