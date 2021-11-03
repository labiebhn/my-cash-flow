import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input, Layout, Spinner, StyleService, useStyleSheet } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { putPasswordAPI } from '../../../api/userAPI';
import { HeaderNavigation } from '../../../components/Navigations';

export const UserSecuritySetting = ({ navigation }) => {

  const styles = useStyleSheet(themeStyles);

  // redux
  const user = useSelector(state => state.userReducer.data);

  // state
  const [load, setLoad] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({
    prevPassword: '',
    newPassword: ''
  });

  // function
  const onSubmit = async () => {
    setLoad(true);
    try {
      await putPasswordAPI(user.id, data);
      showMessage({
        message: `Password kamu telah berhasil dirubah.`,
        type: "success",
        duration: 2000
      });
      setTimeout(async () => {
        await AsyncStorage.clear();
        navigation.replace('Login');
      }, 2000); 
    } catch (err) {
      showMessage({
        message: `Gagal update password user. Coba lagi.`,
        type: "danger",
        duration: 2000
      });
      console.log(err);
    }
    setLoad(false);
  }

  useEffect(() => {
    const { prevPassword, newPassword } = data;
    setDisabled(prevPassword && newPassword ? false : true);
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderNavigation
        navigation={navigation}
        title="Pengaturan Keamanan"
      />
      <Layout style={styles.container}>
        <View style={styles.formGroup}>
          <Input
            label="Password"
            secureTextEntry={true}
            onChangeText={e => setData({ ...data, prevPassword: e })}
          />
        </View>
        <View style={styles.formGroup}>
          <Input
            label="Password Baru"
            secureTextEntry={true}
            onChangeText={e => setData({ ...data, newPassword: e })}
          />
        </View>
        <Button
          status="primary"
          disabled={disabled}
          onPress={onSubmit}
        >
          {!load ? 'Ubah Password' : <Spinner status="basic" size="small" />}
        </Button>
      </Layout>
    </SafeAreaView>
  )
}

const themeStyles = StyleService.create({
  container: {
    flex: 1,
    padding: 8
  },
  formGroup: {
    marginBottom: 14
  }
})
