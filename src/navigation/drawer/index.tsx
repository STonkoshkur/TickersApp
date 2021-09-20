import React, { FC } from 'react';

// Navigation
import Routes from 'src/navigation/routes';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TickersStack from '../stacks/StockCompanies';

export type DrawerNavigatorParamList = {
  [Routes.StockCompaniesStack]: undefined;
};

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name={Routes.StockCompaniesStack}
        component={TickersStack}
        options={{
          title: 'Tickers',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
