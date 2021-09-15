import React, { FC } from 'react';

// Navigation
import Routes from 'src/navigation/routes';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import CompaniesSearchList from 'src/screens/StockCompanies/SearchList';
import CompanyDetails from 'src/screens/StockCompanies/Details';

export type StockCompaniesStackParamList = {
  [Routes.StockCompaniesSearchList]: undefined;
  [Routes.StockCompanyDetails]: {
    companySymbol: string;
  };
};

const Stack = createStackNavigator<StockCompaniesStackParamList>();

const StockCompaniesStack: FC = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.StockCompaniesSearchList}>
      <Stack.Screen
        name={Routes.StockCompaniesSearchList}
        component={CompaniesSearchList}
      />
      <Stack.Screen
        name={Routes.StockCompanyDetails}
        component={CompanyDetails}
        options={{
          cardOverlayEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StockCompaniesStack;
