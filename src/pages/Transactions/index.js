import React from 'react'
import { Button, Icon, Layout, StyleService, Tab, TabView, Text, useStyleSheet } from '@ui-kitten/components'
import { TransactionForm, TransactionHome } from './Contents';
import { Dimensions } from 'react-native'

const ViewIcon = (props) => (
  <Icon {...props} name='swap'/>
);

const FormIcon = (props) => (
  <Icon {...props} name='keypad'/>
);

const Transactions = ({ navigation }) => {
  const styles = useStyleSheet(themeStyles);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const shouldLoadComponent = (index) => index === selectedIndex;

  return (
    <TabView
      selectedIndex={selectedIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={index => setSelectedIndex(index)}
      style={styles.tabView}
    >
      <Tab icon={ViewIcon}>
        <Layout style={styles.tabContainer}>
          <TransactionHome />
        </Layout>
      </Tab>
      <Tab icon={FormIcon}>
        <Layout style={styles.tabContainer}>
          <TransactionForm />
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
