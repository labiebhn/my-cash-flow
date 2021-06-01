import { Card, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { formatNumber } from 'react-native-currency-input';

export const TransactionSum = ({ sumIn, sumOut, sumReceivable, sumPayable }) => {

  const styles = useStyleSheet(themeStyle);

  return (
    <>
      <View style={styles.cardContainer}>
        <Card style={styles.card} status='warning'>
          <Text category="label">Kas Keluar</Text>
          <Text category="h6">Rp{formatNumber(sumOut.total)}</Text>
        </Card>
        <Card style={styles.card} status='success'>
          <Text category="label">Kas Masuk</Text>
          <Text category="h6">Rp{formatNumber(sumIn.total)}</Text>
        </Card>
        <Card style={styles.card} status='danger'>
          <Text category="label">Utang</Text>
          <Text category="h6">Rp{formatNumber(sumPayable.total)}</Text>
        </Card>
        <Card style={styles.card} status='info'>
          <Text category="label">Piutang</Text>
          <Text category="h6">Rp{formatNumber(sumReceivable.total)}</Text>
        </Card>
      </View>
    </>
  )
}

const themeStyle = StyleService.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: 170,
    marginBottom: 4,
  }
})