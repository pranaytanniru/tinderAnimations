/** @format */

import {AppRegistry} from 'react-native';
import App from './app/TinderApp.js';
import {name as appName} from './app.json';
import codePush from 'react-native-code-push';

AppRegistry.registerComponent(appName, () => codePush(App));
