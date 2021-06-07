import { Button, Input, Layout, Spinner, StyleService, useStyleSheet } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { host } from '../../../api/config';
import { getUserByEmailAPI, putUserAPI } from '../../../api/userAPI';
import { AvatarCard } from '../../../components/Cards/AvatarCard';
import { HeaderNavigation } from '../../../components/Navigations';
import { addUser } from '../../../store/actions/userAction';

export const UserGeneralSetting = ({ navigation }) => {

  const styles = useStyleSheet(themeStyles);
  const options = {
    mediaType: 'picture',
    quality: 0.5
  };

  // redux
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.data);

  // state
  const [data, setData] = useState(user);
  const [disabled, setDisabled] = useState(true);
  const [load, setLoad] = useState(false);

  // function
  const handleOpenImageLibrary = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Cancel')
      } else {
        const image = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        }
        setData({ ...data, ava: image });
      }
    });
  }

  const onSubmit = async () => {
    setLoad(true);
    try {
      // call api for update data
      await putUserAPI(data);
      // get new user data
      const user = await getUserByEmailAPI(data.email);
      // send to redux
      dispatch(addUser(user.data.data));
      // set state new user data
      setData(user.data.data);
      // show message success
      showMessage({
        message: `Info user kamu telah berhasil dirubah.`,
        type: "success",
        duration: 2000
      });
    } catch (err) {
      showMessage({
        message: `Gagal update data user. Coba lagi.`,
        type: "danger",
        duration: 2000
      });
      console.log(err);
    }
    setLoad(false);
  }

  useEffect(() => {
    const { name, email, ava } = data;
    console.log(data);
    setDisabled(name && email && ava ? false : true);
  }, [data]);

  return (
    <>
      <HeaderNavigation
        navigation={navigation}
        title="Pengaturan Umum"
      />
      <Layout style={styles.container}>
        <AvatarCard
          ava={{ uri: typeof data.ava === 'string' ? `${host}/${user.ava}` : data.ava.uri }}
          handler={handleOpenImageLibrary}
        />
        <View style={styles.formGroup}>
          <Input
            label="Nama"
            value={data.name}
            onChangeText={e => setData({ ...data, name: e })}
          />
        </View>
        <View style={styles.formGroup}>
          <Input
            label="Email"
            keyboardType="email-address"
            value={data.email}
            onChangeText={e => setData({ ...data, email: e })}
          />
        </View>
        <Button
          status="primary"
          disabled={disabled}
          onPress={onSubmit}
        >
          {!load ? 'Submit' : <Spinner status="basic" size="small" />}
        </Button>
      </Layout>
    </>
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
