/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten mycashflow
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, Alert } from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { AppNavigator } from './routes';
import { Provider } from "react-redux";
import store from "./store"
import FlashMessage from "react-native-flash-message";
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import { CreateChannelNotification, Notification } from './utils';
import PushNotification, { Importance } from 'react-native-push-notification';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */

 console.disableYellowBox = true;

export default () => {
  
  useEffect(() => {
    StatusBar.setBackgroundColor('#ffff');
    StatusBar.setBarStyle('dark-content');
    SplashScreen.hide();
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <AppNavigator />
          <FlashMessage position="top" />
        </ApplicationProvider>
      </Provider>
    </>
  )
};
