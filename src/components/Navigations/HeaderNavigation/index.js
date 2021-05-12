import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export function HeaderNavigation({ navigation, title }) {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );
  return (
    <TopNavigation title={title} alignment='center' accessoryLeft={BackAction}/>
  )
}
