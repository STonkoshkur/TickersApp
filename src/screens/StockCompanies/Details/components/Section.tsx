import React, { FC, memo, ReactNode } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

// Components
import Typography from 'src/components/Typography';

// Layout
import { Measurements } from 'src/layout';

export type SectionProps = {
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const Section: FC<SectionProps> = ({
  title,
  children,
  titleStyle,
  style,
  contentContainerStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <Typography
        style={[styles.titleStyle, titleStyle]}
        variant="headline"
        weight="medium">
        {title}
      </Typography>

      <View style={contentContainerStyle}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Measurements.double,
    paddingBottom: Measurements.double,
  },
  titleStyle: {
    marginBottom: Measurements.medium,
  },
});

export default memo(Section);
