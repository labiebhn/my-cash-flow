/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import PushNotification from "react-native-push-notification";

AppRegistry.registerComponent(appName, () => {

  return App
});
