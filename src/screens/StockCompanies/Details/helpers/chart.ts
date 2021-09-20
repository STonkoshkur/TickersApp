import { Dimensions } from 'react-native';

export const getLineChartWidth = (pageSpacing = 30) =>
  !isNaN(pageSpacing)
    ? Dimensions.get('window').width - pageSpacing
    : Dimensions.get('window').width;
