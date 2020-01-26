/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

console.disableYellowBox = true
YellowBox.ignoreWarnings(['Remote debugger']);
global.__APP__ = true;
global.__ANDROID__ = false;
global.__IOS__ = true;

AppRegistry.registerComponent(appName, () => App);
