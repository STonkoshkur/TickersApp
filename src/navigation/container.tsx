import React, { FC } from 'react';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import MainDrawerScreens from 'src/navigation/drawer';

const Container: FC = () => {
  return (
    <NavigationContainer>
      <MainDrawerScreens />
    </NavigationContainer>
  );
};

export default Container;
