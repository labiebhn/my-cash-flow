import { Card, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import { formatNumber } from 'react-native-currency-input';
import { useDispatch, useSelector } from 'react-redux';
import { getChartSumBalanceAPI } from '../../../../api/chartAPI';
import { getTransactionAPI } from '../../../../api/transactionAPI';
import { AvatarList } from '../../../../components/Lists';
import { ScreenLoader } from '../../../../components/Loaders';
import { TransactionPieSum, TransactionSum, TransactionSumBalance } from '../../../../containers/TransactionsPage';
import { addTransaction, periodTransaction, sumBalanceTransaction, sumTransaction } from '../../../../store/actions/transactionAction';

export const TransactionChart = () => {

  const styles = useStyleSheet(themeStyle);

  // redux
  const dispatch = useDispatch();
  const user  = useSelector(state => state.userReducer.data);
  const transaction = useSelector(state => state.transactionReducer);
  const { sum, period, sumBalance } = transaction;

  // state
  const [refreshing, setRefreshing] = useState(false);

  // function
  const handleGetTransactionAPI = async () => {
    const params = {
      month: period.month,
      year: period.year
    }
    setRefreshing(true);
    // data transaction
    const transaction = await getTransactionAPI(params);
    dispatch(addTransaction(transaction.data.data));
    dispatch(sumTransaction(transaction.data.sum));
    dispatch(periodTransaction(transaction.data.period));
    // sum balance for chart
    const charSum = await getChartSumBalanceAPI(params);
    dispatch(sumBalanceTransaction(charSum.data.data));
    // return
    setRefreshing(false)
  }

  const handleGetSumChartAPI = async () => {
    const params = {
      month: period.month,
      year: period.year
    }
    // sum balance for chart
    const charSum = await getChartSumBalanceAPI(params);
    dispatch(sumBalanceTransaction(charSum.data.data));
  }

  useEffect(() => {
    if(period) {
      handleGetSumChartAPI();
    }
  }, [period]);

  return sum && sumBalance ? (
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
        <TransactionSumBalance  
          data={sumBalance}
        />
      </Layout>
    </ScrollView>
  ) : <ScreenLoader />
}

const themeStyle = StyleService.create({
  container: {
    flex: 1,
    padding: 8,
    paddingBottom: 300
  },
})