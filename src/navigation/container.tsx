import React, { FC } from 'react';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import StocksCompaniesScreens from 'src/navigation/stacks/StockCompanies';

const Container: FC = () => {
  return (
    <NavigationContainer>
      <StocksCompaniesScreens />
    </NavigationContainer>
  );
};

export default Container;
