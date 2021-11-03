import { Icon, Layout, StyleService, Tab, TabView, useStyleSheet } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getReportListAPI } from '../../api/reportAPI';
import { PeriodList } from '../../components/Lists';
import { ScreenLoader } from '../../components/Loaders';
import { listReport, tabReport } from '../../store/actions/reportAction';
import { JournalReport, CashFlowReport, LedgerReport, TrialBalanceReport } from './Contents';

const FileIcon = (props) => (
  <Icon {...props} name='folder-outline'/>
);

const JournalIcon = (props) => (
  <Icon {...props} name='grid-outline' />
)

const LedgerIcon = (props) => (
  <Icon {...props} name='book-open-outline' />
)

const BalanceIcon = (props) => (
  <Icon {...props} name='bar-chart-outline'/>
);

const FlowIcon = (props) => (
  <Icon {...props} name='swap-outline' />
)

const Reports = ({ navigation }) => {

  const styles = useStyleSheet(themeStyles);

  // redux
  const dispatch = useDispatch();
  const tab = useSelector(state => state.reportReducer.tab);
  const report = useSelector(state => state.reportReducer.report);

  const shouldLoadComponent = (index) => index === tab;

  // function
  const handleGetReportListAPI = async () => {
    const reportList = await getReportListAPI();
    dispatch(listReport(reportList.data.data));
  }

  useEffect(() => {
    handleGetReportListAPI();
  }, []);

  return  (
    <SafeAreaView>
      {/* <PeriodList /> */}
      <TabView
        selectedIndex={tab}
        onSelect={index => dispatch(tabReport(index))}
        // shouldLoadComponent={shouldLoadComponent}
        swipeEnabled={true}
        style={styles.tabView}
      >
        <Tab title="Jurnal Umum" icon={JournalIcon}>
          <Layout style={styles.tabContainer}>
            <JournalReport />
          </Layout>
        </Tab>
        <Tab title="Buku Besar" icon={LedgerIcon}>
          <Layout style={styles.tabContainer}>
            <LedgerReport />
          </Layout>
        </Tab>
        <Tab title="Neraca Saldo" icon={BalanceIcon}>
          <Layout style={styles.tabContainer}>
            <TrialBalanceReport />
          </Layout>
        </Tab>
        <Tab title="Arus Kas" icon={FlowIcon}>
          <Layout style={styles.tabContainer}>
            <CashFlowReport />
          </Layout>
        </Tab>
      </TabView>
    </SafeAreaView>
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