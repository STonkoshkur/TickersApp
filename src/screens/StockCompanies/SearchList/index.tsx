import React, { FC } from 'react';
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';

// Navigation
import { StackScreenProps } from '@react-navigation/stack';
import { StockCompaniesStackParamList } from 'src/navigation/stacks/StockCompanies';
import Routes from 'src/navigation/routes';

export type StockCompaniesSearchListProps = StackScreenProps<
  StockCompaniesStackParamList,
  Routes.StockCompaniesSearchList
>;

const StockCompaniesSearchList: FC<StockCompaniesSearchListProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello World!</Text>

      <Button
        title="Show Company details"
        onPress={() => {
          navigation.push(Routes.StockCompanyDetails, {
            companySymbol: 'TSLA',
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

export default StockCompaniesSearchList;
