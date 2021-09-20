import React, { FC, memo, PropsWithChildren } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';

// Layout
import { Colors } from 'src/layout';
import { APP_HEADER_HEIGHT } from '../AppHeader';

export type AppHeaderActionType = TouchableOpacityProps & {
  width?: number;
  hideDivider?: boolean;
};

const AppHeaderAction: FC<PropsWithChildren<AppHeaderActionType>> = ({
  children,
  width,
  style,
  hideDivider = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      {...props}
      style={[
        styles.container,
        {
          height: APP_HEADER_HEIGHT,
          width: width ?? APP_HEADER_HEIGHT,
        },
        !hideDivider && styles.rightDivider,
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightDivider: {
    borderRightWidth: 1,
    borderRightColor: Colors.Solitude,
  },
});

export default memo(AppHeaderAction);
