import { Button, Divider, Input, Layout, Spinner, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import { getUserByEmailAPI, userLoginAPI } from '../../api/userAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/actions/userAction';
import { ScreenLoader } from '../../components/Loaders';

const Login = ({ navigation }) => {
  const styles = useStyleSheet(themeStyle);

  // redux
  const dispatch = useDispatch()

  // state
  const [load, setLoad] = useState({
    button: false,
    screen: true,
  });
  const [message, setMessage] = useState('');
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  // function
  const handleLoginChecker = async () => {
    try {
      const error = new Error();
      // get token and email from storage
      const token = await AsyncStorage.getItem('@token');
      const email = await AsyncStorage.getItem('@email');
      // handle token and email null
      if(!token || !email) throw error;
      // generate data to json
      const user = await getUserByEmailAPI(email);
      // error handling
      if(!user) throw error;
      // save to redux
      dispatch(addUser(user.data.data));
      // navigation
      navigation.replace('Home');
    } catch(err) {
      console.log(err);
      setLoad({...load, screen: false});
    }
  }

  const handleLogin = async () => {
    setLoad({...load, button: true});
    try {
      const user = await userLoginAPI(data);
      // save to AsyncStorage
      await AsyncStorage.setItem('@email', user.data.data.email);
      await AsyncStorage.setItem('@token', user.data.token);
      // send to redux
      dispatch(addUser(user.data.data));
      // navigation
      navigation.replace('Home');
    } catch(err) {
      setMessage('Email dan password salah.');
      setTimeout(() => setMessage(''), 5000);
    }
    setLoad({...load, button: false});
  }

  useEffect(() => {
    handleLoginChecker();
  }, []);

  return !load.screen ? (
    <Layout style={styles.container}>
      <Text style={styles.hint} appearance='hint'>Untuk melanjutkan aplikasi My Cash Flow ini kamu harus login terlebih dahulu.</Text>
      <Layout style={{ marginBottom: 4 }}>
        <Input 
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={e => setData({...data, email: e})}
        />
        <Input 
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={e => setData({...data, password: e})}
        />
      </Layout>
      <Layout>
        <Button style={styles.button} onPress={handleLogin}>
          {!load.button ? 'Login' : <Spinner status="basic" size="small" />}
        </Button>
        <Button style={styles.button} status="basic">Belum punya akun?</Button>
      </Layout>
      <Text appearance='hint' status="danger">{message}</Text>
    </Layout>
  ) : <ScreenLoader />
}

export default Login

const themeStyle = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  hint: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8
  },
  button: {
    marginBottom: 4
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})