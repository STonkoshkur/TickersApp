import React, { FC } from 'react';
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

// Navigation
import { StackScreenProps } from '@react-navigation/stack';
import { StockCompaniesStackParamList } from 'src/navigation/stacks/StockCompanies';
import Routes from 'src/navigation/routes';

// Layout
import { GeneralStyles, Measurements, Colors } from 'src/layout';

export type StockCompaniesSearchListProps = StackScreenProps<
  StockCompaniesStackParamList,
  Routes.StockCompaniesSearchList
>;

const StockCompaniesSearchList: FC<StockCompaniesSearchListProps> = ({
  navigation,
}) => {
  // TODO: will be removed after API service connect
  const stockCompaniesList = [
    { symbol: 'TSLA', name: 'Tesle Inc' },
    { symbol: 'AAPL', name: 'Apple Inc' },
    { symbol: 'GGLE', name: 'Google' },
    { symbol: 'UBER', name: 'Uber Tech' },
    { symbol: 'MU', name: 'Micron Technology' },
  ];

  const handleSearchedTickerPress = (companySymbol: string) => () => {
    navigation.push(Routes.StockCompanyDetails, {
      companySymbol,
    });
  };

  // FIXME: add types after API service connect
  const renderSearchedItem = ({
    item,
  }: ListRenderItemInfo<{ symbol: string; name: string }>) => {
    const { symbol, name } = item;

    return (
      <TouchableHighlight
        style={styles.searchRowWrapper}
        underlayColor={Colors.BlumineTransparent}
        activeOpacity={0.9}
        onPress={handleSearchedTickerPress(symbol)}>
        {/* TouchableHighlight must includes only one child */}
        <>
          {/* Ticker Symbol column */}
          <View style={styles.tickerSymbol}>
            <Typography variant="title3" weight="medium">
              {symbol}
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
          onIconPress={navigation.canGoBack() ? navigation.goBack : undefined}
          placeholder="Search symbols or companies"
        />
      </AppHeader>

      <FlatList
        data={stockCompaniesList}
        renderItem={renderSearchedItem}
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
    paddingLeft: 58,
    paddingRight: Measurements.huge,
  },
  tickerSymbol: {
    width: 75,
  },
  tickerCompanyName: {
    flex: 1,
  },
});

export default StockCompaniesSearchList;
