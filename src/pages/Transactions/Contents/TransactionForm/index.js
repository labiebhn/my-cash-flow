import React, { useState, useEffect } from 'react'
import { Autocomplete, Button, ButtonGroup, Card, Icon, IndexPath, Input, Layout, Modal, Radio, RadioGroup, Select, SelectItem, Spinner, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { AutocompleteForm, CurrencyForm, DatepickerForm, ImageForm, SelectForm } from '../../../../components/Forms';
import { View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getTransactionAPI, postTransactionAPI, updateTransactionAPI } from '../../../../api/transactionAPI';
import { showMessage } from 'react-native-flash-message';
import { ScreenLoader } from '../../../../components/Loaders';
import { addTransaction, periodTransaction, selectTransaction, sumTransaction } from '../../../../store/actions/transactionAction';
import { FindAccountCode } from '../../../../utils';
import { host } from '../../../../api/config';


const ImageIcon = (props) => (
  <Icon {...props} name='image-2'/>
);


const CameraIcon = (props) => (
  <Icon {...props} name='camera'/>
);


export const TransactionForm = ({ navigation }) => {
  
  const styles = useStyleSheet(themeStyle);
  const type = ['out', 'in', 'payable', 'receivable']
  const options = {
    mediaType: 'picture',
    quality: 0.5
  };
  
  // redux
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.data);
  const superUser = useSelector(state => state.userReducer.super);
  const reduxCode = useSelector(state => state.accountCodeReducer.data);
  const transaction = useSelector(state => state.transactionReducer);
  const { selectData, period, clusterList } = transaction;

  let disabledRadio = superUser.includes(user.role) ? false : true;
  
  const initData = {
    amount: 0,
    type: 0,
    code: 512,
    date: new Date(),
    evidence: '',
    detail: '',
    cluster: '',
    createdBy: user.email,
    updatedBy: ''
  }

  // state
  const [load, setLoad] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState(initData);
  const [imageString, setImageString] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [modal, setModal] = useState(false);
  const [accountCode, setAccountCode] = useState(reduxCode.out);
  const [indexAccountCode, setIndexAccountCode] = useState(0);
  const [disabledIndexUpdate, setDisabledIndexUpdate] = useState(false);

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

        setImageString(null);
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

        setImageString(null);
        setData({...data, evidence: image});
      }
    });
  }

  // handle type change
  const handleAccountCode = () => {
    switch (data.type) {
      case 0:
        setAccountCode(reduxCode.out);
        break;
      case 1:
        setAccountCode(reduxCode.in);
        break;
      case 2:
        setAccountCode(reduxCode.payable);
        break;
      case 3:
        setAccountCode(reduxCode.receivable);
        break;
      default:
        setAccountCode(reduxCode.out);
        break;
    }
  }
  // handle type change
  useEffect(() => {
    handleAccountCode(); //return setAccountCode
  }, [data.type]);

  // handle accountCode change
  useEffect(() => {
    if(!disabledIndexUpdate) {
      setData({...data, code: accountCode[0].code});
      setIndexAccountCode(0);
    } else {
      setDisabledIndexUpdate(false);
    }
  }, [accountCode]);

  const handleGetTransactionAPI = async () => {
    const params = superUser.includes(user.role) ? {
      month: period.month,
      year: period.year
    } : {
      month: period.month,
      year: period.year,
      email: user.email
    }
    const transaction = await getTransactionAPI(params);
    dispatch(addTransaction(transaction.data.data));
    dispatch(sumTransaction(transaction.data.sum));
    dispatch(periodTransaction(transaction.data.period));
  }

  const onReset = () => {
    setData(initData);
    setIndexAccountCode(0);
    setIsUpdate(false);
    setImageString(null);
    dispatch(selectTransaction(null));
  }

  const onSubmit = async () => {
    setLoad(true);
    const dataNew = {...data};
    dataNew.type = type[dataNew.type]
    dataNew.date = (new Date(dataNew.date)).toUTCString();
    dataNew.updatedBy = isUpdate ? user.email : '';
    try {
      isUpdate ? await updateTransactionAPI(dataNew) : await postTransactionAPI(dataNew);
      handleGetTransactionAPI();
      showMessage({
        message: `Transaksi berhasil ${isUpdate ? 'diubah' : 'dicatat'}`,
        description: `Terimakasih telah ${isUpdate ? 'mengubah' : 'mencatat'} transaksi ini`,
        type: "success",
        duration: 1500
      });
      // reset form
      onReset();
    } catch(err) {
      showMessage({
        message: `Transaksi gagal ${isUpdate ? 'diubah' : 'dicatat'}`,
        description: "Coba lagi",
        type: "danger",
        duration: 2000
      });
      console.log(err);
    }
    setLoad(false);
  }

  // handle disabled submit
  useEffect(() => {
    const { amount, type, code, evidence, detail, date } = data;
    setDisabled(amount && code && evidence && detail && date ? false : true)
    console.log(data);
  }, [data]);

  // handle selected data for edit
  useEffect(() => {
    if(selectData) {
      let selectDataNew = {...selectData};
      // find index type
      let indexType = type.indexOf(selectDataNew.type);
      // generate index for selected form account code
      let idCode = reduxCode[type[indexType]].map(({code}) => code);
      setIndexAccountCode(idCode.indexOf(selectDataNew.code));
      // set new account code list
      setAccountCode(reduxCode[type[indexType]]);
      // disabled accoundCode effect for updating value indexAccountCode
      setDisabledIndexUpdate(true);
      // generate default value for form
      selectDataNew.date = new Date(selectDataNew.date);
      selectDataNew.type = indexType;
      // handle image preview
      setImageString({uri: `${host}/${selectDataNew.evidence}`});
      // update data
      setData(selectDataNew);
      setIsUpdate(true)
    }
  }, [selectData]);

  useEffect(() => {
    console.log('index account code: ', indexAccountCode);
  }, [indexAccountCode]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      showsVerticalScrollIndicator={false}
      horizontal={false}
    >
      <Layout style={styles.container}>
        <View style={styles.formGroup}>
          <ImageForm
            initValue={imageString ?? data.evidence}
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
            <Radio style={styles.radio} status="primary" disabled={disabledRadio}>Kas Masuk</Radio>
            <Radio style={styles.radio} status="primary" disabled={disabledRadio}>Utang</Radio>
            <Radio style={styles.radio} status="primary" disabled={disabledRadio}>Piutang</Radio>
          </RadioGroup>
        </View>
        {
          data.type === 2 || data.type === 3 ?
          <View style={styles.formGroup}>
            <AutocompleteForm 
              placeholder={data.type === 2 ? 'Kreditur' : 'Debitur'}
              initData={clusterList}
              initValue={data.cluster}
              handler={(e) => setData({...data, cluster: e})}
            />
          </View> : null
        }
        <View style={styles.formGroup}>
          <SelectForm 
            data={accountCode.map(accountCode => accountCode.name)}
            onSelect={index => {
              setData({ ...data, code: accountCode[index].code })
              setIndexAccountCode(index);
            }}
            indexState={indexAccountCode}
          />
        </View>
        <View style={styles.formGroup}>
          <Input
            multiline={true}
            placeholder="Keterangan"
            value={data.detail}
            caption={data.type === 2 || data.type === 3 ? 'Note: Untuk hutang/piutang baru harap cantumkan tag "#Baru" pada kolom input Keterangan.' : ''}
            onChangeText={e => setData({ ...data, detail: e })}
          />
        </View>
        <View style={{ marginVertical: 8 }}>
          <Button style={styles.submit} disabled={disabled} onPress={onSubmit} status="primary">
            {!load ? isUpdate ? 'Ubah Transaksi' : 'Tambah Transaksi' : <Spinner status="basic" size="small" />}
          </Button>
          <Button style={styles.submit} status="basic" onPress={onReset}>
            Reset
          </Button>
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
    paddingBottom: 600
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