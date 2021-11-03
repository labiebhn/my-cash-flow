import React, { useState, useEffect } from 'react';
import { Layout, Input, Text, ListItem, Divider, Button } from '@ui-kitten/components';
import { StyleSheet, View, FlatList, Image, Alert } from 'react-native';
import { HeaderNavigation } from '../../../components/Navigations';
import { deleteUserAPI, getUserAPI } from '../../../api/userAPI';
import { host } from '../../../api/config';
import { FloatingButton } from '../../../components/Buttons';
import { ScreenLoader } from '../../../components/Loaders';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';

export const UserManagementSetting = ({ navigation }) => {

  // state
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState([]);

  // function
  const handleGetUserAPI = async () => {
    setIsLoad(true);
    const user = await getUserAPI();
    setData(user.data.data);
    setIsLoad(false);
  }

  const handleEdit = (data) => {
    navigation.navigate('UserRegisterSetting', {data});
  }

  const handleDelete = async (email) => {
    setIsLoad(true);
    try {
      await deleteUserAPI(email);
      showMessage({
        message: `Akun ${email} telah berhasil dihapus`,
        description: ``,
        type: "success",
        duration: 1500
      });
      handleGetUserAPI();
    } catch(err) {
      showMessage({
        message: `Akun ${email} gagal untuk dihapus`,
        description: `Silahkan coba lagi untuk meghapusnya`,
        type: "danger",
        duration: 1500
      });
    }
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      handleGetUserAPI()
    });
  }, []);

  // component
  const accessoryLeft = (image) => (
    <View style={styles.ava}>
      <Image source={{uri: `${host}/${image}`}} style={styles.ava} />
    </View>
  )

  const accessoryRight = (item) => (
    <View style={styles.action}>
      <Button 
        size="tiny" 
        status="success" 
        style={styles.button} 
        onPress={() => handleEdit(item)}
      >Edit</Button>
      <Button 
        size="tiny" 
        status="danger" 
        style={styles.button} 
        onPress={() => {
          return Alert.alert(
            `Hapus akun ${item.email}?`,
            `Jika kamu menghapusnya, transaksi yang telah ${item.email} input tidak akan ikut terhapus.`,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('canceled'),
                style: 'cancel'
              },
              {
                text: 'OK',
                onPress: () => handleDelete(item.email)
              }
            ]
          )
        }}
      >Hapus</Button>
    </View>
  )

  const renderItem = ({item, index}) => (
    <>
      <ListItem
        title={`${item.name} - ${item.email}`}
        description={`${item.role}`}
        accessoryLeft={() => accessoryLeft(item.ava)}
        accessoryRight={() => item.role === 'Manager' ? null : accessoryRight(item)}
      />
      <Divider />
    </>
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderNavigation
        navigation={navigation}
        title="Manajemen User"
      />
      {
        !isLoad ?
        <Layout style={styles.container}>
          <FlatList 
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
          <FloatingButton 
            onPress={() => navigation.navigate('UserRegisterSetting')}
          />
        </Layout> : <ScreenLoader />
      } 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  ava: {
    width: 35, 
    height: 35, 
    borderRadius: 35, 
    overflow: 'hidden'
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    marginLeft: 4,
  }
})
