import React, { useEffect, useState } from 'react'
import { Button, Icon, Layout, StyleService, Tab, TabView, Text, useStyleSheet } from '@ui-kitten/components'
import { TransactionChart, TransactionForm, TransactionHome } from './Contents';
import { Dimensions } from 'react-native'
import { AvatarList, PeriodList } from '../../components/Lists';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountCodeAPI } from '../../api/accountCodeAPI';
import { addAccountCode } from '../../store/actions/accountCodeAction';
import { addTransaction, periodListTransaction, periodTransaction, sumTransaction, tabTransaction } from '../../store/actions/transactionAction';
import { ScreenLoader } from '../../components/Loaders';
import { getTransactionAPI, getTransactionPeriodAPI } from '../../api/transactionAPI';

const ChartIcon = (props) => (
  <Icon {...props} name='pie-chart-outline'/>
);

const ViewIcon = (props) => (
  <Icon {...props} name='activity'/>
);

const FormIcon = (props) => (
  <Icon {...props} name='plus-square-outline'/>
);

const Transactions = ({ navigation }) => {
  const styles = useStyleSheet(themeStyles);
  
  // redux
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.data);
  const transaction = useSelector(state => state.transactionReducer);
  const { data, tab, period, periodList } = transaction;

  // state
  const shouldLoadComponent = (index) => index === tab;


  // function
  const handleGetAccountCode = async () => {
    const code = await getAccountCodeAPI();
    dispatch(addAccountCode(code.data.data));
  }

  const handleGetTransactionAPI = async () => {
    const transaction = await getTransactionAPI();
    dispatch(addTransaction(transaction.data.data));
    dispatch(sumTransaction(transaction.data.sum));
    dispatch(periodTransaction(transaction.data.period));
  }

  const handleGetPeriodListAPI = async () => {
    const periodList = await getTransactionPeriodAPI();
    dispatch(periodListTransaction(periodList.data.data));
  }

  useEffect(() => {
    handleGetAccountCode();
    handleGetTransactionAPI();
    handleGetPeriodListAPI();
  }, []);

  return data && periodList ? (
    <>
      <PeriodList />
      <TabView
        selectedIndex={tab}
        onSelect={index => dispatch(tabTransaction(index))}
        // shouldLoadComponent={shouldLoadComponent}
        swipeEnabled={true}
        style={styles.tabView}
      >
        <Tab icon={ChartIcon} title="Grafik">
          <Layout style={styles.tabContainer}>
            <TransactionChart />
          </Layout>
        </Tab>
        <Tab icon={ViewIcon} title="List Transaksi">
          <Layout style={styles.tabContainer}>
            <TransactionHome />
          </Layout>
        </Tab>
        <Tab icon={FormIcon} title="Input Transaksi">
          <Layout style={styles.tabContainer}>
            <TransactionForm 
              navigation={navigation}
            />
          </Layout>
        </Tab>
      </TabView>
    </>
  ) : <ScreenLoader />
}

export default Transactions

const themeStyles = StyleService.create({
  tabView: {
    backgroundColor: 'color-basic-default',
  },
  tabContainer: {
    minHeight: Dimensions.get('window').height,
  },
});
