import { Card, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React, { useEffect, useState, useCallback } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native';
import { host } from '../../../../api/config';
import { getTransactionAPI } from '../../../../api/transactionAPI';
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
        {
          data.map((data, i) => (
            <TransactionCard
              key={data.id}
              id={data.id}
              detail={data.detail}
              date={data.date}
              amount={data.amount}
              email={data.createdBy}
              status={generateStatus(data.type)}
              image={{uri: `${host}/${data.evidence}`}}
              handler={() => handleSelectCard(i)}
            />
          ))
        }
        <TransactionPreview 
          data={data}
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
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})