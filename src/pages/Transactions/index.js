import React, { useEffect, useState } from 'react'
import { Button, Icon, Layout, StyleService, Tab, TabView, Text, useStyleSheet } from '@ui-kitten/components'
import { TransactionChart, TransactionForm, TransactionHome } from './Contents';
import { Dimensions } from 'react-native'
import { AvatarList, PeriodList } from '../../components/Lists';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountCodeAPI } from '../../api/accountCodeAPI';
import { addAccountCode } from '../../store/actions/accountCodeAction';
import { addTransaction, clusterListTransaction, periodListTransaction, periodTransaction, sumTransaction, tabTransaction } from '../../store/actions/transactionAction';
import { ScreenLoader } from '../../components/Loaders';
import { getTransactionAPI, getTransactionPeriodAPI } from '../../api/transactionAPI';
import { getClusterAPI } from '../../api/clusterAPI';

const ChartIcon = (props) => (
  <Icon {...props} name='pie-chart-outline'/>
);

const ViewIcon = (props) => (
  <Icon {...props} name='cube-outline'/>
);

const FormIcon = (props) => (
  <Icon {...props} name='plus-square-outline'/>
);

const Transactions = ({ navigation }) => {
  const styles = useStyleSheet(themeStyles);
  
  // redux
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.data);
  const accountCode = useSelector(state => state.accountCodeReducer.data);
  const transaction = useSelector(state => state.transactionReducer);
  const { data, tab, periodList, clusterList } = transaction;

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

  const handleGetClusterListAPI = async () => {
    const clusterList = await getClusterAPI();
    dispatch(clusterListTransaction(clusterList.data.data));
  }

  useEffect(() => {
    handleGetAccountCode();
    handleGetTransactionAPI();
    handleGetPeriodListAPI();
    handleGetClusterListAPI();
  }, []);

  return data && periodList && accountCode && clusterList ? (
    <>
      <PeriodList />
      <TabView
        selectedIndex={tab}
        onSelect={index => dispatch(tabTransaction(index))}
        // shouldLoadComponent={shouldLoadComponent}
        swipeEnabled={false}
        style={styles.tabView}
      >
        <Tab icon={ChartIcon} title="Grafik Transaksi">
          <Layout style={styles.tabContainer}>
            <TransactionChart />
          </Layout>
        </Tab>
        <Tab icon={ViewIcon} title="Daftar Transaksi">
          <Layout style={styles.tabContainer}>
            <TransactionHome />
          </Layout>
        </Tab>
        <Tab icon={FormIcon} title="Tambah Transaksi">
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
