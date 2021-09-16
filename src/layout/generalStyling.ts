import Colors from './colors';

const generalStyles = {
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  horisontalAlign: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
} as const;

export default generalStyles;
