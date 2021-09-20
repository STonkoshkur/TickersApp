import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

// Components
import AppHeader from 'src/components/Navigation/AppHeader';
import AppHeaderAction from 'src/components/Navigation/AppHeaderAction';
import SearchBar from 'src/components/SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';

// Navigation
import Routes from 'src/navigation/routes';
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import CompaniesHome from 'src/screens/StockCompanies/Home';
import CompaniesSearchList from 'src/screens/StockCompanies/SearchList';
import CompanyDetails from 'src/screens/StockCompanies/Details';

// Layout
import { Colors } from 'src/layout';

export type StockCompaniesStackParamList = {
  [Routes.StockCompaniesHome]: undefined;
  [Routes.StockCompaniesSearchList]: undefined;
  [Routes.StockCompanyDetails]: {
    companySymbol: string;
  };
};

const Stack = createStackNavigator<StockCompaniesStackParamList>();

const StockCompaniesStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.StockCompaniesHome}
      screenOptions={{
        header: ({ navigation }) => (
          <AppHeader>
            <AppHeaderAction
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}>
              <Icon name="md-menu-sharp" size={22} color={Colors.Manatee} />
            </AppHeaderAction>

            {/* TextInput onPressIn() handler doesn't work with editable={false} on Android.
            TouchableOpacity wrapper is used instead of TextInput onPressIn(). */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.push(Routes.StockCompaniesSearchList);
              }}>
              <SearchBar
                editable={false}
                placeholder="Search symbols or companies"
                pointerEvents="none"
              />
            </TouchableOpacity>
          </AppHeader>
        ),
      }}>
      <Stack.Screen
        name={Routes.StockCompaniesHome}
        component={CompaniesHome}
      />
      <Stack.Screen
        name={Routes.StockCompaniesSearchList}
        component={CompaniesSearchList}
        options={{
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
          headerShown: false,
        }}
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
