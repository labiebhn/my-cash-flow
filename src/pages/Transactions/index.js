import React from 'react'
import { Button, Icon, Layout, StyleService, Tab, TabView, Text, useStyleSheet } from '@ui-kitten/components'
import { TransactionChart, TransactionForm, TransactionHome } from './Contents';
import { Dimensions } from 'react-native'
import { AvatarList } from '../../components/Lists';
import { useSelector } from 'react-redux';

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

  // redux
  const user = useSelector(state => state.userReducer.data);

  return (
    <>
      <AvatarList 
        name={user.name}
        role={user.role}
      />
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        shouldLoadComponent={shouldLoadComponent}
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
