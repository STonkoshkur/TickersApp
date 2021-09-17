/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { FC } from 'react';

// Navigation
import NavigationContainer from 'src/navigation/container';

// Services
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer />
    </QueryClientProvider>
  );
};

export default App;
