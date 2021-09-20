import React, { FC } from 'react';
import { View, SafeAreaView } from 'react-native';

// Navigation
import { StackScreenProps } from '@react-navigation/stack';
import { StockCompaniesStackParamList } from 'src/navigation/stacks/StockCompanies';
import Routes from 'src/navigation/routes';

// Layout
import { GeneralStyles } from 'src/layout';

export type StockCompaniesHomeProps = StackScreenProps<
  StockCompaniesStackParamList,
  Routes.StockCompaniesHome
>;

const StockCompaniesHome: FC<StockCompaniesHomeProps> = () => {
  return (
    <SafeAreaView style={GeneralStyles.pageContainer}>
      <View />
    </SafeAreaView>
  );
};

export default StockCompaniesHome;
