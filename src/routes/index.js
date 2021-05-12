import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation, BottomNavigationTab, Icon, Layout, Text } from '@ui-kitten/components';
import Transactions from '../pages/Transactions';
import Reports from '../pages/Reports';
import Users from '../pages/Users';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const TransactionIcon = (props) => (
  <Icon {...props} name='square'/>
);

const ReportIcon = (props) => (
  <Icon {...props} name='archive'/>
);

const UserIcon = (props) => (
  <Icon {...props} name='person'/>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={TransactionIcon} />
    <BottomNavigationTab icon={ReportIcon} />
    <BottomNavigationTab icon={UserIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Tab.Screen name='Transactions' component={Transactions}/>
    <Tab.Screen name='Reports' component={Reports}/>
    <Tab.Screen name='Users' component={Users}/>
  </Tab.Navigator>
);

const StackScreen = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Home" component={TabNavigator} />
  </Stack.Navigator>
)

export const AppNavigator = () => (
  <NavigationContainer>
    <StackScreen/>
  </NavigationContainer>
);