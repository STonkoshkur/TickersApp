import { useQuery } from 'react-query';

// Services
import API from 'src/services/API';

// Utils
import { getISOFormatedDate, addMonth } from 'src/utils/dateTime';
import { percentageDiff } from 'src/utils/persontage';

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
      retry: false, // Polygon.io trial project allows only 5 requests per minute
      staleTime: 60 * 60 * 1000, // 1 hour
      onError: () => {},
    },
  );

  const symbolAggregatesStocksResults = symbolStocksAggregates?.results ?? [];

  const symbolStocksAggregatesForChart = symbolAggregatesStocksResults.map(
    ({ c }) => c,
  );

  // Value is grown when last trade value is greater than first trade value for selected period
  const isValueGrownPerPeriod =
    symbolStocksAggregatesForChart?.length >= 2
      ? symbolStocksAggregatesForChart[
          symbolStocksAggregatesForChart.length - 1
        ] >= symbolStocksAggregatesForChart[0]
      : true;

  // Calculate price changes values
  const lastOpenCloseResult =
    symbolAggregatesStocksResults[symbolAggregatesStocksResults.length - 1] ??
    null;
  const previousOpenCloseResult =
    symbolAggregatesStocksResults[symbolAggregatesStocksResults.length - 2] ??
    null;

  const lastOpenCloseValues = {
    prevClosePrice: previousOpenCloseResult?.c,
    openPrice: lastOpenCloseResult?.o,
    closePrice: lastOpenCloseResult?.c,
    priceChange:
      lastOpenCloseResult && previousOpenCloseResult
        ? lastOpenCloseResult.c - previousOpenCloseResult.c
        : null,
    persontagePriceChange:
      lastOpenCloseResult && previousOpenCloseResult
        ? percentageDiff(previousOpenCloseResult.c, lastOpenCloseResult.c)
        : null,
  };

  return {
    symbolStocksAggregates,
    symbolStocksAggregatesForChart,
    isValueGrownPerPeriod,
    isLoadingSymbolStocksAggregates,
    refetchSymbolStocksAggregates,
    lastOpenCloseValues,
  };
};

export default useSymbolAggregatedStocks;
