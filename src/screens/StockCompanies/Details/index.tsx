import React, { FC } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

// Components
import Chip from 'src/components/Chip';
import Section from './components/Section';
import MapView from 'src/components/MapView';
import LineChart from 'src/components/LineChart';
import Typography from 'src/components/Typography';
import Icon from 'react-native-vector-icons/Ionicons';

// Navigation
import { StackScreenProps } from '@react-navigation/stack';
import { StockCompaniesStackParamList } from 'src/navigation/stacks/StockCompanies';
import Routes from 'src/navigation/routes';

// Hooks
import useSymbolCompanyDetails from 'src/hooks/entities/useSymbolCompanyDetails';
import useSymbolAggregatedStocks from 'src/hooks/entities/useSymbolAggregatedStocks';

// Layout
import { GeneralStyles, Measurements, Colors } from 'src/layout';

// Utils
import { getLineChartWidth, getMapWidth } from './helpers/chart';
import { formatPhoneNumber, formatNumber } from 'src/utils/formatting';

export type StockCompanyDetailsProps = StackScreenProps<
  StockCompaniesStackParamList,
  Routes.StockCompanyDetails
>;

const StockCompanyDetails: FC<StockCompanyDetailsProps> = ({
  navigation,
  route,
}) => {
  const { companySymbol } = route.params;

  const {
    symbolCompany: tickerCompany,
    isCompanyLoadingFailed: isTickerCompanyLoadingFailed,
  } = useSymbolCompanyDetails(companySymbol);

  const shouldNotFoundBeShown = isTickerCompanyLoadingFailed && !tickerCompany;

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
    {
      key: 'phone',
      value: tickerCompany?.phone
        ? formatPhoneNumber(tickerCompany.phone)
        : '-',
    },
  ];

  // Get data for stocks chart
  const {
    symbolStocksAggregatesForChart,
    isValueGrownPerPeriod,
    lastOpenCloseValues,
  } = useSymbolAggregatedStocks(companySymbol);

  const isLastClosePriceGrown = lastOpenCloseValues?.priceChange
    ? lastOpenCloseValues.priceChange >= 0
    : false;

  const stockColor = isLastClosePriceGrown
    ? Colors.Emerald
    : Colors.FireEngineRed;

  const chartColor = isValueGrownPerPeriod
    ? Colors.Emerald
    : Colors.FireEngineRed;

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

          {!!tickerCompany?.name && (
            <Typography variant="title3">{tickerCompany.name}</Typography>
          )}
        </View>

        <Typography variant="title1" weight="medium" style={styles.priceRow}>
          {lastOpenCloseValues?.closePrice
            ? formatNumber(lastOpenCloseValues.closePrice, {
                currency: 'usd',
              })
            : '-'}
        </Typography>

        {/* Price value changes section */}
        <View style={styles.companyTitleRow}>
          <Typography
            variant="title3"
            color={stockColor}
            style={styles.companyTitleLabel}>
            {lastOpenCloseValues?.priceChange
              ? formatNumber(lastOpenCloseValues.priceChange, {
                  prefixSymbol: true,
                  minimumFractionDigits: 2,
                })
              : '-'}
          </Typography>

          {!!lastOpenCloseValues?.persontagePriceChange && (
            <Typography
              variant="title3"
              color={stockColor}
              style={styles.companyTitleLabel}>
              <Icon
                size={18}
                color={stockColor}
                name={isLastClosePriceGrown ? 'md-arrow-up' : 'md-arrow-down'}
              />
              {`${Math.abs(lastOpenCloseValues.persontagePriceChange)}%`}
            </Typography>
          )}
        </View>

        {/* Chart section */}
        <LineChart
          data={symbolStocksAggregatesForChart}
          color={chartColor}
          height={120}
          width={getLineChartWidth(Measurements.huge)}
        />

        {shouldNotFoundBeShown ? (
          <Section title="Company loading error">
            <Typography variant="callout" weight="medium">
              Unable to load ticker company details
            </Typography>
          </Section>
        ) : (
          <>
            {/* General company info section */}
            <Section title={`About ${tickerCompany?.symbol ?? companySymbol}`}>
              <View style={GeneralStyles.horisontalAlign}>
                <View style={styles.columnX2}>
                  {aboutCompanyValues.map(({ label, value }) => (
                    <Typography
                      key={label}
                      variant="callout"
                      style={styles.calloutTextLine}>
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
              </View>
              {!!tickerCompany && (
                <MapView
                  address={`${tickerCompany.name}, ${tickerCompany.hq_address}`}
                  containerStyle={styles.mapContainer}
                />
              )}
            </Section>

            {/* Company description section */}
            <Section title="Description">
              <Typography variant="callout" style={styles.descriptionBodyText}>
                {tickerCompany?.description || '-'}
              </Typography>
            </Section>

            {/* Tags section */}
            {!!tickerCompany?.tags && (
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
            {!!tickerCompany?.similar && (
              <Section
                title="Related Stocks"
                contentContainerStyle={[
                  GeneralStyles.horisontalAlign,
                  GeneralStyles.flexWrap,
                ]}>
                {tickerCompany.similar.map((similarSymbol, index) => (
                  <Chip
                    key={similarSymbol}
                    color={index % 2 ? Colors.Emerald : Colors.Cinnabar}
                    onPress={handleRelatedStockPress(similarSymbol)}>
                    {similarSymbol}
                  </Chip>
                ))}
              </Section>
            )}
          </>
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
  mapContainer: {
    marginTop: 20,
    width: getMapWidth(Measurements.huge),
  },
});

export default StockCompanyDetails;
