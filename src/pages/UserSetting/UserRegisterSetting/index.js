import React, { useState, useEffect, useRef } from 'react';
import { Layout, Input, Button, Radio, Text, RadioGroup, Spinner } from '@ui-kitten/components';
import { StyleSheet, View, ScrollView } from 'react-native';
import { HeaderNavigation } from '../../../components/Navigations';
import { showMessage } from 'react-native-flash-message';
import { putUserAPI, registerUserAPI } from '../../../api/userAPI';

const initialState = {
  name: '',
  email: '',
  password: '',
  role: '',
  ava: '',
}

export const UserRegisterSetting = ({ navigation, route }) => {

  // route
  const { params } = route;

  // ref
  const scrollRef = useRef();

  // state
  const [isLoad, setIsLoad] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({ ...initialState });
  const [selectedRole, setSelectedRole] = useState(0);
  const [roleDescription, setRoleDescription] = useState({
    title: '',
    description: ''
  });

  // function
  const handleFindRoleIndex = (role) => {
    let index = 0;
    switch(role) {
      case 'Akuntan': 
        index = 0;
        break;
      case 'Keuangan': 
        index = 1;
        break;
      default: 
        index = 2;
        break;
    }
    setSelectedRole(index);
  }

  const handleRoleIndex = () => {
    let role = '';
    switch(selectedRole) {
      case 0:
        role = 'Akuntan';
        break;
      case 1:
        role = 'Keuangan';
        break;
      default:
        role = !isUpdate ? '' : params.data.role;
        break;
    }

    setData({...data, role});
  }

  const handleRoleDescription = () => {
    let title = '';
    let description = '';
    switch(selectedRole) {
      case 0:
        title = 'Akuntan';
        description = `
          - Dapat melihat grafik transaksi \n
          - Dapat melihat seluruh transaksi \n
          - Dapat menginput seluruh jenis transaksi \n
          - Dapat mengubah seluruh transaksi \n
          - Dapat menghapus seluruh transaksi \n
          - Dapat mengunduh semua laporan keuangan \n
          - Dapat mengubah data akun sendiri
        `;
        break;
      case 1:
        title = 'Keuangan';
        description = `
          - Dapat melihat grafik transaksi \n
          - Dapat melihat seluruh transaksi \n
          - Dapat menginput seluruh jenis transaksi \n
          - Dapat mengubah transaksi divisi nya saja \n
          - Dapat menghapus transaksi divisi nya saja \n
          - Dapat mengubah data akun sendiri
        `;
        break;
      case 2:
        title = 'Lainnya';
        description = `
          - Dapat melihat transaksi divisi nya saja \n
          - Dapat menginput transaksi Kas Keluar \n
          - Dapat mengubah transaksi divisi nya saja \n
          - Dapat menghapus transaksi divisi nya saja \n
        `;
        break;
      default:
        title = '';
        description = '';
        break;
    }
    setRoleDescription({title, description});
  }

  const onSubmit = async () => {
    setIsLoad(true);
    try {
      !isUpdate ? await registerUserAPI(data) : await putUserAPI(data);
      showMessage({
        message: `User berhasil ${isUpdate ? 'diubah' : 'didaftarkan'}`,
        description: `Silahkan login menggunakan user yang telah kamu daftarkan`,
        type: "success",
        duration: 1500
      });
      setData(initialState);
      setIsUpdate(false);
      isUpdate ? setTimeout(() => navigation.goBack(), 2000) : null;
    } catch(err) {
      showMessage({
        message: `User gagal ${isUpdate ? 'diubah' : 'didaftarkan'}`,
        description: `Tunggu sebentar dan coba lagi untuk submit`,
        type: "danger",
        duration: 1500
      });
    }
    setIsLoad(false);
  }

  useEffect(() => {
    handleRoleIndex();
    handleRoleDescription();
  }, [selectedRole]);

  useEffect(() => {
    const { name, email, password, role, ava } = data;
    setDisabled(name && email && password && role ? false : true);
  }, [data]);

  useEffect(() => {
    if(params?.data) {
      setIsUpdate(true);
      setData(params.data);
      handleFindRoleIndex(params.data.role);
    }
  }, [params]);

  return (
    <>
      <HeaderNavigation
        navigation={navigation}
        title={!isUpdate ? 'Registrasi User' : 'Ubah Data User'}
      />
      <Layout style={styles.container}>
        <ScrollView ref={scrollRef} >
          <View style={{padding: 16}}>
            <View style={styles.formGroup}>
              <Input
                label="Nama"
                value={data.name}
                onChangeText={e => setData({ ...data, name: e })}
              />
            </View>
            {
              !isUpdate ?
              <View style={styles.formGroup}>
                <Input
                  label="Email"
                  value={data.email}
                  keyboardType="email-address"
                  onChangeText={e => setData({ ...data, email: e })}
                />
              </View> : null
            }
            <View style={styles.formGroup}>
              {
                !isUpdate ?
                <Input
                  label="Password"
                  value={data.password}
                  secureTextEntry={true}
                  onChangeText={e => setData({ ...data, password: e })}
                /> : null
              }
            </View>
            <View style={styles.formGroup}>
              <Text category="label" appearance="hint" style={{marginBottom: 8}}>Jabatan</Text>
              <RadioGroup 
                style={styles.radioContainer}
                selectedIndex={selectedRole}
                onChange={index => setSelectedRole(index)}
              >
                <Radio style={styles.radio}>
                  Akuntan 
                </Radio>
                <Radio style={styles.radio}>
                  Keuangan 
                </Radio>
                <Radio style={styles.radio}>
                  Jabatan Lain..
                </Radio>
              </RadioGroup>
            </View>
            {
              selectedRole === 2 ?
              <View style={styles.formGroup}>
                <Input 
                  label="Jabatan Lain"
                  value={data.role}
                  onChangeText={e => setData({...data, role: e})}
                />
              </View> : null
            }
            <View style={styles.formGroup}>
              <Text status="info" category="s2">Deskripsi Jabatan {roleDescription.title} :</Text>
              <Text appearance="hint" category="label" style={{marginLeft: -26}}>{roleDescription.description}</Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Button 
                disabled={disabled}
                onPress={onSubmit}
              >
                {!isLoad ? 'Submit' : <Spinner status="basic" size="small" />}
              </Button>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 14
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  radio: {
    // marginRight: 24
  },
  resetPassword: {
    width: 120
  }
})
