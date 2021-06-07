import { Layout, StyleService, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderNavigation } from '../../../components/Navigations';

export const UserSecuritySetting = ({ navigation }) => {

  const styles = useStyleSheet(themeStyles);

  return (
    <>
    <HeaderNavigation 
      navigation={navigation}
      title="Pengaturan Keamanan"
    />
      <Layout style={styles.container}>
        <Text>User Security</Text>
      </Layout>
    </>
  )
}

const themeStyles = StyleService.create({
  container: {
    flex: 1,
    padding: 8
  }
})
