import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation, BottomNavigationTab, Icon, Layout, Text } from '@ui-kitten/components';
import Transactions from '../pages/Transactions';
import Reports from '../pages/Reports';
import Users from '../pages/Users';
import Login from '../pages/Login';
import TransactionCamera from '../containers/TransactionsPage/TransactionCamera';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const TransactionIcon = (props) => (
  <Icon {...props} name='home-outline' />
);

const ReportIcon = (props) => (
  <Icon {...props} name='archive-outline' />
);

const UserIcon = (props) => (
  <Icon {...props} name='person-outline' />
);

const BottomTabBar = ({ navigation, state }) => {
  const user = useSelector(state => state.userReducer.data);
  const superUser = useSelector(state => state.userReducer.super);

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={TransactionIcon} />
      {superUser.includes(user.role) ? <BottomNavigationTab icon={ReportIcon} /> : <></>}
      <BottomNavigationTab icon={UserIcon} />
    </BottomNavigation>
  )
};

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name='Transactions' component={Transactions} />
      <Tab.Screen name='Reports' component={Reports} />
      <Tab.Screen name='Users' component={Users} />
    </Tab.Navigator>
  )
};

const StackScreen = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name="TransactionCamera" component={TransactionCamera} />
  </Stack.Navigator>
)

export const AppNavigator = () => (
  <NavigationContainer>
    <StackScreen />
  </NavigationContainer>
);