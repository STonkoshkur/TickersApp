import React, { FC } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';

// Components
import Chip from 'src/components/Chip';
import Section from './components/Section';
import LineChart from 'src/components/LineChart';
import Typography from 'src/components/Typography';
import Icon from 'react-native-vector-icons/Ionicons';

// Navigation
import { StackScreenProps } from '@react-navigation/stack';
import { StockCompaniesStackParamList } from 'src/navigation/stacks/StockCompanies';
import Routes from 'src/navigation/routes';

// Hooks
import { useQuery } from 'react-query';
import useSymbolAggregatedStocks from 'src/hooks/entities/useSymbolAggregatedStocks';

// Services
import API from 'src/services/API';

// Layout
import { GeneralStyles, Measurements, Colors } from 'src/layout';

// Utils
import { formatNumber } from 'src/utils/formatting';

export type StockCompanyDetailsProps = StackScreenProps<
  StockCompaniesStackParamList,
  Routes.StockCompanyDetails
>;

const StockCompanyDetails: FC<StockCompanyDetailsProps> = ({
  navigation,
  route,
}) => {
  const { companySymbol } = route.params;

  const { data: tickerCompany } = useQuery(
    ['company', companySymbol],
    () => API.tickers.getTickerDetails(companySymbol),
    {
      staleTime: 5 * 60 * 1000, // 5 min
    },
  );

  // Mapped company data to display
  const aboutCompanyValues = [
    { label: 'Sector', value: tickerCompany?.sector ?? '-' },
    { label: 'Industry', value: tickerCompany?.industry ?? '-' },
    { label: 'CEO', value: tickerCompany?.ceo ?? '-' },
    {
      label: 'Employees',
      value: tickerCompany?.employees
        ? formatNumber(tickerCompany?.employees)
        : '-',
    },
  ];
  const companyContactsValues = [
    {
      key: 'address',
      value: tickerCompany
        ? [tickerCompany.hq_address, tickerCompany.hq_country].join(', ')
        : '-',
    },
    { key: 'phone', value: tickerCompany?.phone ?? '-' },
  ];

  // Get data for stocks chart
  const { symbolStocksAggregatesForChart, isValueGrownPerPeriod } =
    useSymbolAggregatedStocks(companySymbol);

  const chartColor = isValueGrownPerPeriod
    ? Colors.Emerald
    : Colors.FireEngineRed;

  // TODO: will be removed after API services implementation
  const isSuccessedStocks = Math.random() < 0.5;
  const stockColor = isSuccessedStocks ? Colors.Emerald : Colors.FireEngineRed;

  const handleRelatedStockPress = (relatedSymbol: string) => () => {
    navigation.push(Routes.StockCompanyDetails, {
      companySymbol: relatedSymbol,
    });
  };

  return (
    <SafeAreaView style={GeneralStyles.pageContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header section */}
        <View style={styles.companyTitleRow}>
          <Typography
            variant="title2"
            weight="medium"
            style={styles.companyTitleLabel}>
            {tickerCompany?.symbol ?? companySymbol}
          </Typography>

          {tickerCompany?.name && (
            <Typography variant="title3">{tickerCompany.name}</Typography>
          )}
        </View>

        <Typography variant="title1" weight="medium" style={styles.priceRow}>
          {formatNumber(1245.345, { currency: 'usd' })}
        </Typography>

        <View style={styles.companyTitleRow}>
          <Typography variant="title3" color={stockColor}>
            {formatNumber(-2.3, { minimumFractionDigits: 2 })}
          </Typography>

          <Typography
            variant="title3"
            color={stockColor}
            style={styles.companyTitleLabel}>
            <Icon
              name={isSuccessedStocks ? 'md-arrow-up' : 'md-arrow-down'}
              size={18}
              color={stockColor}
            />{' '}
            1.5%
          </Typography>
        </View>

        {/* Chart section */}
        <LineChart
          data={symbolStocksAggregatesForChart}
          color={chartColor}
          height={120}
          width={Dimensions.get('window').width - Measurements.huge}
        />

        {/* General company info section */}
        <Section
          title={`About ${tickerCompany?.symbol ?? companySymbol}`}
          contentContainerStyle={GeneralStyles.horisontalAlign}>
          <View style={styles.columnX2}>
            {aboutCompanyValues.map(({ label, value }) => (
              <Typography
                key={label}
                variant="callout"
                style={styles.calloutTextLine}
                numberOfLines={1}>
                {`${label}: `}
                <Typography variant="callout" weight="medium">
                  {value}
                </Typography>
              </Typography>
            ))}
          </View>

          <View style={styles.column}>
            {companyContactsValues.map(({ key, value }) => (
              <Typography
                key={key}
                variant="callout"
                style={styles.contactsText}>
                {value}
              </Typography>
            ))}
          </View>
        </Section>

        {/* Company description section */}
        <Section title="Description">
          <Typography
            variant="callout"
            weight="medium"
            style={styles.descriptionBodyText}>
            {tickerCompany?.description || '-'}
          </Typography>
        </Section>

        {/* Tags section */}
        {tickerCompany?.tags && (
          <Section
            title="Tags"
            contentContainerStyle={[
              GeneralStyles.horisontalAlign,
              GeneralStyles.flexWrap,
            ]}>
            {tickerCompany.tags.map((tag, index) => (
              <Chip
                key={tag}
                color={index % 2 ? Colors.PictonBlue : Colors.DarkOrchid}
                disabled>
                {tag}
              </Chip>
            ))}
          </Section>
        )}

        {/* Related Stocks section */}
        {tickerCompany?.similar && (
          <Section
            title="Related Stocks"
            contentContainerStyle={[
              GeneralStyles.horisontalAlign,
              GeneralStyles.flexWrap,
            ]}>
            {tickerCompany.similar.map((similarSymbol, index) => (
              <Chip
                color={index % 2 ? Colors.Emerald : Colors.Cinnabar}
                onPress={handleRelatedStockPress(similarSymbol)}>
                {similarSymbol}
              </Chip>
            ))}
          </Section>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 40,
    paddingHorizontal: Measurements.huge,
  },
  companyTitleRow: {
    ...GeneralStyles.horisontalAlign,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  companyTitleLabel: {
    marginRight: Measurements.medium,
  },
  priceRow: {
    marginTop: Measurements.medium,
    marginBottom: Measurements.base,
  },
  column: {
    flex: 3,
  },
  columnX2: {
    flex: 5,
    paddingRight: Measurements.base,
  },
  calloutTextLine: {
    marginBottom: 6,
  },
  contactsText: {
    lineHeight: 20,
  },
  descriptionBodyText: {
    lineHeight: 18,
  },
});

export default StockCompanyDetails;
