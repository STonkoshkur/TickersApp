import React, { FC, PropsWithChildren, memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

// Hooks
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Layout
import { Colors } from 'src/layout';

export type AppHeaderType = {
  withoutTopOffcet?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const APP_HEADER_HEIGHT = 58;

const AppHeaderContainer: FC<PropsWithChildren<AppHeaderType>> = ({
  withoutTopOffcet = false,
  children,
  style,
}) => {
  const { top: topInset } = useSafeAreaInsets();
  const topOffcetValueToApply = withoutTopOffcet ? 0 : topInset;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: topOffcetValueToApply,
          height: APP_HEADER_HEIGHT + topOffcetValueToApply,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: APP_HEADER_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Solitude,
    backgroundColor: Colors.White,
  },
});

export default memo(AppHeaderContainer);
