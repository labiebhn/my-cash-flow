import { StyleService, useStyleSheet, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';

export const MiniCard = ({ title, body }) => {

  const styles = useStyleSheet(themeStyle);

  return (
    <View style={styles.container}>
      <Text category="label" style={styles.text}>{title}</Text>
      <Text appearance="hint" category="label" style={styles.text}>{body}</Text>
    </View>
  )
}

const themeStyle = StyleService.create({
  container: {
    width: '47.6%',
    margin: 4,
    borderRadius: 4,
    padding: 4,
    borderWidth: 1,
    borderColor: 'color-basic-300'
  },
  text: {
    textAlign: 'center'
  }
})
