import React, { FC, ReactNode } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';

// Layout
import { Colors } from 'src/layout';

export type InputProps = TextInputProps & {
  renderLeftComponent?: () => ReactNode;
  renderRightComponent?: () => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

const Input: FC<InputProps> = ({
  renderLeftComponent,
  renderRightComponent,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {renderLeftComponent?.()}

      <TextInput {...props} style={[styles.input, style]} />

      {renderRightComponent?.()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    fontSize: 18,
    color: Colors.Black,
  },
});

export default Input;
