import React, { FC, memo } from 'react';
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

// Components
import Typography from 'src/components/Typography';

// Layout
import { Measurements, Colors } from 'src/layout';

export type ChipProps = {
  color?: string;
  children: string;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
};

const Chip: FC<ChipProps> = ({
  color,
  children,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, !!color && { backgroundColor: color }, style]}
      {...props}>
      <Typography
        style={[styles.textStyle, textStyle]}
        variant="body"
        weight="medium"
        color={Colors.White}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.PictonBlue,
    borderRadius: Measurements.tiny,
    justifyContent: 'center',
    marginVertical: Measurements.tiny,
    marginRight: Measurements.medium,
    minHeight: Measurements.huge,
    paddingVertical: Measurements.tiny,
    paddingHorizontal: Measurements.double,
  },
  textStyle: {
    color: Colors.White,
  },
});

export default memo(Chip);
