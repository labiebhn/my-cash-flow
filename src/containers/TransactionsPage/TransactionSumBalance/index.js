import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatNumber } from 'react-native-currency-input';
import { MiniCard } from '../../../components/Cards';

export const TransactionSumBalance = ({ data }) => {
  return (
    <View style={styles.container}>
      {
        data.map(data => (
          <MiniCard 
            key={data.code}
            title={data.name}
            body={`Rp${formatNumber(data.balance)}`}
          />
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});