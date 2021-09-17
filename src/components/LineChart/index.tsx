import React, { FC, memo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

// Components
import { LineChart as LineChartKit } from 'react-native-chart-kit';

// Styling
import { Measurements, Colors } from 'src/layout';

export type LineChartProps = {
  color?: string;
  data: number[];
  backgroundColor?: string;
  width: number;
  height: number;
  style?: Partial<ViewStyle>;
};

const LineChart: FC<LineChartProps> = ({
  data,
  color,
  backgroundColor,
  width,
  height,
  style,
}) => {
  return (
    <LineChartKit
      data={{
        labels: [],
        legend: [],
        datasets: [
          {
            data: [...data],
          },
        ],
      }}
      width={width}
      height={height}
      withDots={false}
      withInnerLines={false}
      withOuterLines={false}
      withHorizontalLabels={false}
      withVerticalLabels={false}
      withShadow={false}
      chartConfig={{
        backgroundGradientFrom: backgroundColor ?? Colors.White,
        backgroundGradientTo: backgroundColor ?? Colors.White,
        color: () => color ?? Colors.PictonBlue,
      }}
      bezier
      style={StyleSheet.flatten([styles.chart, style])}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  chart: {
    paddingRight: 0,
    paddingTop: 0,
    marginVertical: Measurements.large,
  },
});

export default memo(LineChart);
