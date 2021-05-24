import { Card, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { formatNumber } from 'react-native-currency-input';
import { useSelector } from 'react-redux';
import { ScreenLoader } from '../../../../components/Loaders';

export const TransactionChart = () => {

  const styles = useStyleSheet(themeStyle);

  // redux
  const sum = useSelector(state => state.transactionReducer.sum);

  // function


  return sum ? (
    <ScrollView>
      <Layout style={styles.container}>
        <View style={styles.cardContainer}>
          <Card style={styles.card} status='warning'>
            <Text category="label">Kas Keluar</Text>
            <Text category="h6">Rp{formatNumber(sum.sumOut.total)}</Text>
          </Card>
          <Card style={styles.card} status='success'>
            <Text category="label">Kas Masuk</Text>
            <Text category="h6">Rp{formatNumber(sum.sumIn.total)}</Text>
          </Card>
          <Card style={styles.card} status='danger'>
            <Text category="label">Utang</Text>
            <Text category="h6">Rp{formatNumber(sum.sumReceivable.total)}</Text>
          </Card>
          <Card style={styles.card} status='info'>
            <Text category="label">Piutang</Text>
            <Text category="h6">Rp{formatNumber(sum.sumPayable.total)}</Text>
          </Card>
        </View>
      </Layout>
    </ScrollView>
  ) : <ScreenLoader />
}

const themeStyle = StyleService.create({
  container: {
    flex: 1,
    padding: 8,
  },
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