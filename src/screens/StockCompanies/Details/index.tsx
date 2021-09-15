import React, { FC } from 'react';
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';

// Navigation
import { StackScreenProps } from '@react-navigation/stack';
import { StockCompaniesStackParamList } from 'src/navigation/stacks/StockCompanies';
import Routes from 'src/navigation/routes';

export type StockCompanyDetailsProps = StackScreenProps<
  StockCompaniesStackParamList,
  Routes.StockCompanyDetails
>;

const StockCompanyDetails: FC<StockCompanyDetailsProps> = ({
  navigation,
  route,
}) => {
  const { companySymbol } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello Company {companySymbol}!</Text>
      <Button
        title="Show one more Company"
        onPress={() => {
          navigation.push(Routes.StockCompanyDetails, {
            companySymbol: `COMPANY-${Date.now()}`,
          });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StockCompanyDetails;
