import { Icon, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

export const ImageForm = ({ initValue, handleCamera }) => {
  return (
    <Layout style={styles.container} level="2">
      <TouchableOpacity style={styles.button} onPress={handleCamera}>
        {
          initValue ? 
          <Image source={initValue} style={styles.image} />
          : 
          <View style={{alignItems: 'center'}}>
            <Icon style={styles.icon} fill="#C5CEE0" name="image-outline" />
            <Text appearance="hint">Foto Bukti Transaksi</Text>
          </View>
        }
      </TouchableOpacity>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  button: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 50,
    height: 50,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 4
  }
})
