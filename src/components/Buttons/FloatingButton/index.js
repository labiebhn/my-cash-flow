import { Button } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export const FloatingButton = (props) => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text style={styles.title}>+</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 28,
    right: 28,
    backgroundColor: '#3366FF',
    width: 50,
    height: 50,
    borderRadius: 50,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    color: '#FFFF'
  }
})
