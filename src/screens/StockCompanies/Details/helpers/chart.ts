import { Dimensions } from 'react-native';

// Layout
import { Measurements } from 'src/layout';

export const getLineChartWidth = (pageSpacing = Measurements.huge) =>
  !isNaN(pageSpacing)
    ? Dimensions.get('window').width - pageSpacing
    : Dimensions.get('window').width;

export const getMapWidth = (pageSpacing = Measurements.huge) =>
  !isNaN(pageSpacing)
    ? Dimensions.get('window').width - pageSpacing * 2
    : Dimensions.get('window').width;
