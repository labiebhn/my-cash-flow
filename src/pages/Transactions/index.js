import React from 'react'
import { Button, Icon, Layout, StyleService, Tab, TabView, Text, useStyleSheet } from '@ui-kitten/components'
import { TransactionChart, TransactionForm, TransactionHome } from './Contents';
import { Dimensions } from 'react-native'

const ChartIcon = (props) => (
  <Icon {...props} name='trending-up'/>
);

const ViewIcon = (props) => (
  <Icon {...props} name='activity'/>
);

const FormIcon = (props) => (
  <Icon {...props} name='plus-square-outline'/>
);

const Transactions = ({ navigation }) => {
  const styles = useStyleSheet(themeStyles);

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const shouldLoadComponent = (index) => index === selectedIndex;

  return (
    <TabView
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
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
  )
}

export default Transactions

const themeStyles = StyleService.create({
  tabView: {
    backgroundColor: 'color-basic-default',
  },
  tabContainer: {
    height: Dimensions.get('window').height,
  },
});
