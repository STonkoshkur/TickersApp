// react-native-gesture-handler is needed for correct handling of navigation gesture.
// Also, it prevents production builds crashes.
import 'react-native-gesture-handler';

/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from 'src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
