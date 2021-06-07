import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Icon, Layout, StyleService, Tab, TabView, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { host } from '../../api/config'
import { AvatarCard } from '../../components/Cards/AvatarCard'
import { PeriodList } from '../../components/Lists'
import { tabUser } from '../../store/actions/userAction'
import { UserSetting, UserTransaction } from './Contents'

const ListIcon = (props) => (
  <Icon {...props} name='keypad-outline'/>
);

const SettingIcon = (props) => (
  <Icon {...props} name='settings-outline'/>
);

const Users = ({ navigation }) => {

  const styles = useStyleSheet(themeStyles);

  // redux
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);
  const { data, tab } = user;

  return (
    <Layout style={styles.container}>
      <PeriodList />
      <AvatarCard 
        role={data.role}
        name={data.name}
        email={data.email}
        ava={{uri: `${host}/${data.ava}`}}
      />
      <TabView
        selectedIndex={tab}
        onSelect={index => dispatch(tabUser(index))}
        // shouldLoadComponent={shouldLoadComponent}
        swipeEnabled={true}
        style={styles.tabView}
      >
        <Tab icon={ListIcon} title="Tranksaksi">
          <Layout style={styles.tabContainer}>
            <UserTransaction />
          </Layout>
        </Tab>
        <Tab icon={SettingIcon} title="Pengaturan">
          <Layout style={styles.tabContainer}>
            <UserSetting 
              navigation={navigation}
            />
          </Layout>
        </Tab>
      </TabView>
    </Layout>
  )
}

export default Users

const themeStyles = StyleService.create({
  tabView: {
    backgroundColor: 'color-basic-default',
  },
  tabContainer: {
    minHeight: Dimensions.get('window').height,
  },
});