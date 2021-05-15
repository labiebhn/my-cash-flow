import React, { useState, useEffect } from 'react'
import { Autocomplete, Button, ButtonGroup, Card, Icon, IndexPath, Input, Layout, Modal, Radio, RadioGroup, Select, SelectItem, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { TransactionCamera } from '../../../../containers/TransactionsPage';
import { AutocompleteForm, CurrencyForm, DatepickerForm, ImageForm } from '../../../../components/Forms';
import { View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const ImageIcon = (props) => (
  <Icon {...props} name='image-2'/>
);


const CameraIcon = (props) => (
  <Icon {...props} name='camera'/>
);

export const TransactionForm = ({ navigation }) => {

  const styles = useStyleSheet(themeStyle);
  const type = ['in', 'out', 'payable', 'receivable']
  const options = {
    mediaType: 'picture',
    quality: 0.5
  };

  // redux
  const reduxCode = useSelector(state => state.accountCodeReducer);

  // state
  const [disabled, setDisabled] = useState(true);
  const [modal, setModal] = useState(false);
  const [accountCode, setAccountCode] = useState([]);
  const [data, setData] = useState({
    amount: 0,
    type: 0,
    code: '',
    date: new Date(),
    evidence: '',
    detail: '',
  });

  // function
  const handleOpenImageLibrary = () => {
    setModal(false);
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Cancel')
      } else {
        const image = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        }

        setData({...data, evidence: image});
      }
    });
  }

  const handleOpenCamera = () => {
    setModal(false);
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('Cancel')
      } else {
        const image = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        }

        setData({...data, evidence: image});
      }
    });
  }

  const handleAccountCode = () => {
    switch (data.type) {
      case 0:
        setAccountCode(reduxCode.out);
        break;
      case 1:
        setAccountCode(reduxCode.in);
        break;
    }
  }

  // handle type change
  useEffect(() => {
    handleAccountCode();
    setData({ ...data, code: '' });
  }, [data.type]);

  // handle disabled submit
  useEffect(() => {
    const { amount, type, code, evidence, detail, date } = data;
    setDisabled(amount && code && evidence && detail && date ? false : true)
    console.log(data);
  }, [data]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      showsVerticalScrollIndicator={false}
      horizontal={false}
    >
      <Layout style={styles.container}>
        <View style={styles.formGroup}>
          <ImageForm
            initValue={data.evidence}
            handleCamera={() => setModal(true)}
          />
        </View>
        <View style={styles.formGroup}>
          <CurrencyForm
            value={data.amount}
            handler={e => setData({ ...data, amount: e })}
            placeholder="Nominal Transaksi"
          />
        </View>
        <View style={styles.formGroup}>
          <DatepickerForm
            initValue={data.date}
            handler={e => setData({ ...data, date: e })}
          />
        </View>
        <View style={styles.formGroup}>
          <RadioGroup
            selectedIndex={data.type}
            onChange={index => setData({ ...data, type: index })}
            style={styles.radioGroup}
          >
            <Radio style={styles.radio} status="primary">Kas Keluar</Radio>
            <Radio style={styles.radio} status="primary">Kas Masuk</Radio>
            <Radio style={styles.radio} status="primary">Utang</Radio>
            <Radio style={styles.radio} status="primary">Piutang</Radio>
          </RadioGroup>
        </View>
        <View style={styles.formGroup}>
          <AutocompleteForm
            placeholder="Jenis Akun"
            initValue={data.code}
            initData={accountCode}
            handler={e => setData({ ...data, code: e.id })}
          />
        </View>
        <View style={styles.formGroup}>
          <Input
            multiline={true}
            placeholder="Keterangan"
            value={data.detail}
            onChangeText={e => setData({ ...data, detail: e })}
          />
        </View>
        <View style={{ marginVertical: 8 }}>
          <Button style={styles.submit} disabled={disabled}>Tambah Transaksi</Button>
        </View>
        <Modal
          visible={modal}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setModal(false)}
        >
          <Card disabled={true}>
            <ButtonGroup appearance='filled' status="basic">
              <Button onPress={handleOpenImageLibrary} accessoryLeft={ImageIcon} />
              <Button onPress={handleOpenCamera} accessoryLeft={CameraIcon} />
            </ButtonGroup>
          </Card>
        </Modal>
      </Layout>
    </ScrollView>
  )
}

const themeStyle = StyleService.create({
  container: {
    flex: 1,
    padding: 8,
    paddingBottom: 650
  },
  formGroup: {
    marginBottom: 8
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  radio: {
    width: 140,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginVertical: 4,
    backgroundColor: 'color-basic-200',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'color-basic-default'
  },
  radioActive: {
    borderColor: 'color-primary-default'
  },
  submit: {
    marginBottom: 4
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})