import React, { useState, useEffect } from 'react'
import { Autocomplete, Button, IndexPath, Input, Layout, Radio, RadioGroup, Select, SelectItem, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { TransactionCamera } from '../../../../containers/TransactionsPage';
import { AutocompleteForm, CurrencyForm, DatepickerForm, ImageForm } from '../../../../components/Forms';
import { View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';


export const TransactionForm = ({ navigation }) => {

  const styles = useStyleSheet(themeStyle);
  const type = ['in', 'out', 'payable', 'receivable']

  // redux
  const reduxCode = useSelector(state => state.accountCodeReducer);
  const reduxEvidence = useSelector(state => state.transactionReducer.evidence);

  // state
  const [accountCode, setAccountCode] = useState([]);
  const [data, setData] = useState({
    amount: 0,
    type: 0,
    code: '',
    date: new Date(),
    evidence: reduxEvidence,
    detail: '',
  });

  // function
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

  useEffect(() => {
    setData({...data, evidence: reduxEvidence});
    console.log(reduxEvidence);
  }, [reduxEvidence]);

  useEffect(() => {
    handleAccountCode();
    setData({...data, code: ''});
  }, [data.type]);

  useEffect(() => {
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
            handleCamera={() => navigation.navigate('TransactionCamera')}
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
            onChangeText={e => setData({...data, detail: e})}
          />
        </View>
        <View style={{ marginVertical: 8 }}>
          <Button style={styles.submit}>Tambah Transaksi</Button>
          <Button style={styles.submit} status="basic" >Reset</Button>
        </View>
      </Layout>
    </ScrollView>
  )
}

const themeStyle = StyleService.create({
  container: {
    flex: 1,
    padding: 8,
    paddingBottom: 520
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
  }
})