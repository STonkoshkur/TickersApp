import React, { FC, memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

// Components
import Typography from 'src/components/Typography';

// Layout
import { Measurements } from 'src/layout';

export type ResultsNotFoundProps = {
  title?: string;
  style?: StyleProp<ViewStyle>;
};

const ResultsNotFound: FC<ResultsNotFoundProps> = ({
  title = 'No Results Found',
  style,
  ...props
}) => {
  return (
    <View {...props} style={[styles.container, style]}>
      <Typography variant="title3">{title}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Measurements.double,
    paddingBottom: Measurements.double,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(ResultsNotFound);
