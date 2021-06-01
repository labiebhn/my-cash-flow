import React from 'react'
import { Card, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { View, Image } from 'react-native';
import { FormatDateID } from '../../../utils';
import { formatNumber } from 'react-native-currency-input';

export const TransactionCard = ({ id, detail, date, amount, email, status, image, handler  }) => {

  const styles = useStyleSheet(themeStyle);

  let dateID = FormatDateID(date);

  const Header = (props) => (
    <Image 
      {...props}
      source={image}
      style={styles.image}
    />
  )

  return (
      <Card style={styles.card} status={status ?? 'basic'} header={Header} onPress={handler}>
        <View style={styles.detail}>
          <View style={styles.textContainer}>
            <Text category="h6">{id}</Text>
            <Text appearance="hint">{detail}</Text>
          </View>
          <View style={[styles.textContainer, { alignItems: 'flex-end' }]}>
            <Text category="h6">Rp{formatNumber(amount)}</Text>
            <Text category="p1" appearance="hint">{email}</Text>
            <Text category="p1" appearance="hint">{dateID.date} {dateID.month} {dateID.year}</Text>
          </View>
        </View>
      </Card>
  )
}

const themeStyle = StyleService.create({
  card: {
    marginBottom: 8
  },
  image: {
    width: '100%',
    height: 120,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1,
  }
})