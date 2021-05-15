import { Layout, Modal, Spinner } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, Text, Dimensions } from 'react-native'

export const ScreenLoader = ({ visible }) => {
  return (
    <Layout style={styles.container}>
      <Spinner size="giant" />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
