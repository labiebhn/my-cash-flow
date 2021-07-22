import { Card, Layout, StyleService, Text, useStyleSheet, Input } from '@ui-kitten/components'
import React, { useEffect, useState, useCallback } from 'react'
import { ScrollView, View, RefreshControl, FlatList } from 'react-native';
import { host } from '../../../../api/config';
import { getTransactionAPI, getTransactionSearchAPI } from '../../../../api/transactionAPI';
import { TransactionCard } from '../../../../components/Cards';
import { ScreenLoader } from '../../../../components/Loaders';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, periodTransaction, sumTransaction } from '../../../../store/actions/transactionAction';
import { TransactionPreview } from '../../../../containers/TransactionsPage';

export const TransactionHome = () => {

  const styles = useStyleSheet(themeStyle);

  // redux
  const dispatch = useDispatch();
  const transaction = useSelector(state => state.transactionReducer);
  const { data, period } = transaction;

  // state
  const [dataMap, setDataMap] = useState(data);
  const [preview, setPreview] = useState(false);
  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // function
  const generateStatus = (type) => {
    switch (type) {
      case 'in':
        return 'success'
      case 'out':
        return 'warning'
      case 'payable':
        return 'danger'
      case 'receivable':
        return 'info'
      default:
        return 'basic'
    }
  }

  const handleSelectCard = i => {
    setIndex(i);
    setPreview(true);
  }

  const handleGetTransactionAPI = async () => {
    const params = {
      month: period.month,
      year: period.year
    }
    setRefreshing(true);
    const transaction = await getTransactionAPI(params);
    dispatch(addTransaction(transaction.data.data));
    dispatch(sumTransaction(transaction.data.sum));
    dispatch(periodTransaction(transaction.data.period));
    setRefreshing(false)
  }

  const handleSearchTransactionAPI = async (search) => {
    const error = new Error('Promise cancel');
    try {
      if(search.length > 3) {
        const transaction = await getTransactionSearchAPI({detail: search});
        setDataMap(transaction.data.data);
      } else {
        setDataMap(data);
        throw error;
      }
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setDataMap(data);
  }, [data]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleGetTransactionAPI}
        />
      }
    >
      <Layout style={styles.container}>
        <View style={styles.header}>
          <Input 
            placeholder="Cari transaksi.."
            onChangeText={(e) => handleSearchTransactionAPI(e)}
          />
        </View>
        <FlatList 
          data={dataMap}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <TransactionCard
              id={item.id}
              detail={item.detail}
              date={item.date}
              amount={item.amount}
              email={item.createdBy}
              status={generateStatus(item.type)}
              image={{uri: `${host}/${item.evidence}`}}
              handler={() => handleSelectCard(index)}
            />
          )}
        />
        <TransactionPreview 
          data={dataMap}
          index={index}
          visible={preview}
          handleClose={() => setPreview(false)}
        />
      </Layout>
    </ScrollView>
  )
}

const themeStyle = StyleService.create({
  container: {
    flex: 1,
    padding: 8,
    paddingBottom: 260
  },
  header: {
    paddingBottom: 8,
  }
})