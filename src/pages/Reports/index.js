import { Icon, Layout, StyleService, Tab, TabView, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { PeriodList } from '../../components/Lists';
import { tabReport } from '../../store/actions/reportAction';
import { JournalReport } from './Contents';

const FileIcon = (props) => (
  <Icon {...props} name='folder-outline'/>
);

const BalanceIcon = (props) => (
  <Icon {...props} name='file-text-outline'/>
);

const Reports = ({ navigation }) => {

  const styles = useStyleSheet(themeStyles);

  // redux
  const dispatch = useDispatch();
  const tab = useSelector(state => state.reportReducer.tab);

  const shouldLoadComponent = (index) => index === tab;

  return (
    <>
      {/* <PeriodList /> */}
      <TabView
        selectedIndex={tab}
        onSelect={index => dispatch(tabReport(index))}
        // shouldLoadComponent={shouldLoadComponent}
        swipeEnabled={true}
        style={styles.tabView}
      >
        <Tab title="Jurnal Umum" icon={FileIcon}>
          <Layout style={styles.tabContainer}>
            <JournalReport />
          </Layout>
        </Tab>
        <Tab title="Neraca Saldo" icon={FileIcon}>
          <Layout style={styles.tabContainer}>
            <Text>Neraca Saldo</Text>
          </Layout>
        </Tab>
        <Tab title="Buku Besar" icon={FileIcon}>
          <Layout style={styles.tabContainer}>
            <Text>Buku Besar </Text>
          </Layout>
        </Tab>
        <Tab title="Arus Kas" icon={FileIcon}>
          <Layout style={styles.tabContainer}>
            <Text>Arus Kas </Text>
          </Layout>
        </Tab>
      </TabView>
    </>
  )
}

export default Reports;

const themeStyles = StyleService.create({
  tabView: {
    backgroundColor: 'color-basic-default',
  },
  tabContainer: {
    minHeight: Dimensions.get('window').height,
  },
});