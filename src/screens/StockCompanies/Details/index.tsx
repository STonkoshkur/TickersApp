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

  // TODO: will be removed after API services implementation
  const similar = ['TTM', 'NIO', 'TST', 'NKLA'];
  const companyTags = ['Automotive', 'Consumer'];
  const isSuccessedStocks = Math.random() < 0.5;
  const chartData = new Array(30).fill(0).map(() => Math.random() * 100);
  const aboutCompanyValues = [
    { label: 'Sector', value: 'Company sector' },
    { label: 'Industry', value: 'Company industry' },
    { label: 'CEO', value: 'Company CEO Full Name' },
    { label: 'Employees', value: formatNumber(5325) },
  ];
  const companyContactsValues = [
    { key: 'address', value: '1 Infinite Loop Cupertino CA, 95014, USA' },
    { key: 'phone', value: '+1 408 996-1010' },
  ];

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
          <Typography variant="title2" weight="medium">
            {companySymbol}
          </Typography>
          <Typography variant="title3" style={styles.companyTitleLabel}>
            Company name
          </Typography>
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
          data={chartData}
          color={stockColor}
          height={100}
          width={Dimensions.get('window').width - Measurements.huge}
        />

        {/* General company info section */}
        <Section
          title={`About ${companySymbol.toUpperCase()}`}
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Section>

        {/* Tags section */}
        <Section
          title="Tags"
          contentContainerStyle={GeneralStyles.horisontalAlign}>
          {companyTags.map((tag, index) => (
            <Chip
              key={tag}
              color={index % 2 ? Colors.PictonBlue : Colors.DarkOrchid}
              disabled>
              {tag}
            </Chip>
          ))}
        </Section>

        {/* Related Stocks section */}
        <Section
          title="Related Stocks"
          contentContainerStyle={GeneralStyles.horisontalAlign}>
          {similar.map((similarSymbol, index) => (
            <Chip
              color={index % 2 ? Colors.Emerald : Colors.Cinnabar}
              onPress={handleRelatedStockPress(similarSymbol)}>
              {similarSymbol}
            </Chip>
          ))}
        </Section>
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
  },
  companyTitleLabel: {
    marginLeft: Measurements.medium,
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
