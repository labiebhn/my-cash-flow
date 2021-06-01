import { Card, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import { formatNumber } from 'react-native-currency-input';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionAPI } from '../../../../api/transactionAPI';
import { ScreenLoader } from '../../../../components/Loaders';
import { TransactionPieSum, TransactionSum } from '../../../../containers/TransactionsPage';
import { addTransaction, periodTransaction, sumTransaction } from '../../../../store/actions/transactionAction';

export const TransactionChart = () => {

  const styles = useStyleSheet(themeStyle);

  // redux
  const dispatch = useDispatch();
  const transaction = useSelector(state => state.transactionReducer);
  const { sum, period } = transaction;

  // state
  const [refreshing, setRefreshing] = useState(false);

  // function
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

  return sum ? (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleGetTransactionAPI}
        />
      }
    >
      <Layout style={styles.container}>
        <TransactionSum {...sum} />
        <TransactionPieSum {...sum} />
      </Layout>
    </ScrollView>
  ) : <ScreenLoader />
}

const themeStyle = StyleService.create({
  container: {
    flex: 1,
    padding: 8,
  },
})