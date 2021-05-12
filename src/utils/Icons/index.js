import { Icon } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const Icons = (props) => {
  return (
    <Icon {...props} name={props.name} />
  )
}
