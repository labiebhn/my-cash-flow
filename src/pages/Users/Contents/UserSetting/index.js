import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Divider, Icon, Input, ListItem } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';

const DirectIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward-outline'/>
);

const SettingIcon = (props) => (
  <Icon {...props} name='settings-outline'/>
);

const SecurityIcon = (props) => (
  <Icon {...props} name='shield-outline'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

export const UserSetting = ({ navigation }) => {

  // redux
  const user = useSelector(state => state.userReducer.data);

  // function
  const onLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Login');
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <ListItem 
        title={`Umum`} 
        accessoryLeft={SettingIcon}
        accessoryRight={DirectIcon}
        onPress={() => navigation.navigate('UserGeneralSetting')}
      />
      <Divider />
      <ListItem 
        title={`Keamanan`} 
        accessoryLeft={SecurityIcon}
        accessoryRight={DirectIcon}
        onPress={() => navigation.navigate('UserSecuritySetting')}
      />
      <Divider />
      <ListItem 
        title={`Logout`} 
        accessoryLeft={LogoutIcon}
        onPress={onLogout}
      />
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
})
