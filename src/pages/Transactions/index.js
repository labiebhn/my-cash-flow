import React, { useEffect, useState } from 'react'
import { Button, Icon, Layout, StyleService, Tab, TabView, Text, useStyleSheet } from '@ui-kitten/components'
import { TransactionChart, TransactionForm, TransactionHome } from './Contents';
import { Dimensions } from 'react-native'
import { AvatarList } from '../../components/Lists';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountCodeAPI } from '../../api/accountCodeAPI';
import { addAccountCode } from '../../store/actions/accountCodeAction';
import { tabTransaction } from '../../store/actions/transactionAction';

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
  const tab = useSelector(state => state.transactionReducer.tab);

  // state
  const shouldLoadComponent = (index) => index === tab;


  // function
  const handleGetAccountCode = async () => {
    const code = await getAccountCodeAPI();
    dispatch(addAccountCode(code.data.data));
    console.log(code.data.data);
  }

  useEffect(() => {
    handleGetAccountCode();
  }, []);

  return (
    <>
      <AvatarList 
        name={user.name}
        role={user.role}
      />
      <TabView
        selectedIndex={tab}
        onSelect={index => dispatch(tabTransaction(index))}
        // shouldLoadComponent={shouldLoadComponent}
        swipeEnabled={false}
        style={styles.tabView}
      >
        <Tab icon={FormIcon}>
          <Layout style={styles.tabContainer}>
            <TransactionForm 
              navigation={navigation}
            />
          </Layout>
        </Tab>
        <Tab icon={ViewIcon}>
          <Layout style={styles.tabContainer}>
            <TransactionHome />
          </Layout>
        </Tab>
        <Tab icon={ChartIcon}>
          <Layout style={styles.tabContainer}>
            <TransactionChart />
          </Layout>
        </Tab>
      </TabView>
    </>
  )
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
