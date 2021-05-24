import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Layout } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'

const Users = ({ navigation }) => {

  // redux
  const dispatch = useDispatch();

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
    <Layout style={styles.container}>
      <Button onPress={onLogout}>LOGOUT</Button>
    </Layout>
  )
}

export default Users

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
