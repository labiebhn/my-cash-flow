import { Button, Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ContentStruk } from '../../../assets/images';

const SettingIcon = (props) => (
  <Icon {...props} name='settings-outline' />
);

export const AvatarCard = ({ name, role, ava, email, handler }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageAva} onPress={handler}>
        <Image source={ava} style={styles.image} />
      </TouchableOpacity>
      {
        name && email && role ?
        <View>
          <Text category="h5" style={styles.text}>{name}</Text>
          <Text category="label" appearance="hint" style={styles.text}>{email} - {role}</Text>
        </View> : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8
  },
  imageAva: {
    width: 75,
    height: 75,
    overflow: 'hidden',
    borderRadius: 75,
    marginBottom: 4
  },
  image: {
    width: 75,
    height: 75,
  },
  text: {
    textAlign: 'center',
  }
})
