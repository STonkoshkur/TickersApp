import React, { FC, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  TouchableHighlight,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import SearchBar from 'src/components/SearchBar';
import Typography from 'src/components/Typography';
import AppHeader from 'src/components/Navigation/AppHeader';
import ResultsNotFound from './components/ResultsNotFound';

// Navigation
import { StackScreenProps } from '@react-navigation/stack';
import { StockCompaniesStackParamList } from 'src/navigation/stacks/StockCompanies';
import Routes from 'src/navigation/routes';

// Hooks
import useDebounce from 'src/hooks/useDebounce';
import { useQuery } from 'react-query';

// Services
import API from 'src/services/API';

// Entities
import { Ticker } from 'src/entities/ticker';

// Layout
import { GeneralStyles, Measurements, Colors } from 'src/layout';

export type StockCompaniesSearchListProps = StackScreenProps<
  StockCompaniesStackParamList,
  Routes.StockCompaniesSearchList
>;

const StockCompaniesSearchList: FC<StockCompaniesSearchListProps> = ({
  navigation,
}) => {
  // Search input values
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const { data: paginatedTickers } = useQuery(
    ['search/tickers', debouncedSearch],
    () => API.tickers.getUsStockTickers(debouncedSearch ?? ''),
    {
      staleTime: 1000 * 60 * 60 * 1, // 1 hour
      enabled: !!debouncedSearch,
    },
  );

  const tickersList = paginatedTickers?.results ?? [];

  const renderSearchedItem = ({ item }: ListRenderItemInfo<Ticker>) => {
    const { ticker: tickerSymbol, name } = item;

    return (
      <TouchableHighlight
        style={styles.searchRowWrapper}
        underlayColor={Colors.BlumineTransparent}
        activeOpacity={0.9}
        onPress={() => {
          navigation.push(Routes.StockCompanyDetails, {
            companySymbol: tickerSymbol,
          });
        }}>
        {/* TouchableHighlight must includes only one child */}
        <>
          {/* Ticker Symbol column */}
          <View style={styles.tickerSymbol}>
            <Typography variant="title3" weight="medium">
              {tickerSymbol}
            </Typography>
          </View>

          {/* Ticker Company name column */}
          <View style={styles.tickerCompanyName}>
            <Typography variant="title3" numberOfLines={1}>
              {name}
            </Typography>
          </View>
        </>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={GeneralStyles.pageContainer}>
      <AppHeader withoutTopOffcet>
        <SearchBar
          autoFocus
          autoCorrect={false}
          spellCheck={false}
          icon="chevron-back"
          placeholder="Search symbols or companies"
          onIconPress={navigation.canGoBack() ? navigation.goBack : undefined}
          onChangeText={setSearch}
        />
      </AppHeader>

      <FlatList
        data={tickersList}
        renderItem={renderSearchedItem}
        ListEmptyComponent={<ResultsNotFound />}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingVertical: Measurements.medium,
  },
  searchRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Measurements.double,
    paddingHorizontal: Measurements.huge,
  },
  tickerSymbol: {
    width: 75,
  },
  tickerCompanyName: {
    flex: 1,
  },
});

export default StockCompaniesSearchList;
