import { Card, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import { PieChart } from 'react-native-chart-kit';

const chartConfig = {
  color: (opacity = 1) => `white`,
  labelColor: (opacity = 1) => `white`,
  style: {
      borderRadius: 16
  }
}

export const TransactionPieSum = ({ sumIn, sumOut, sumReceivable, sumPayable }) => {

  const styles = useStyleSheet(themeStyle);

  const data = [
    {
      name: "Kas Keluar",
      total: parseInt(sumOut.total),
      color: "#FFC94D",
      legendFontColor: "#151A30",
      legendFontSize: 11
    },
    {
      name: "Kas Masuk",
      total: parseInt(sumIn.total),
      color: "#51F0B0",
      legendFontColor: "#151A30",
      legendFontSize: 11
    },
    {
      name: "Utang",
      total: parseInt(sumPayable.total),
      color: "#FF708D",
      legendFontColor: "#151A30",
      legendFontSize: 11
    },
    {
      name: "Piutang",
      total: parseInt(sumReceivable.total),
      color: "#42AAFF",
      legendFontColor: "#151A30",
      legendFontSize: 11
    },
  ];

  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={chartConfig}
        backgroundColor="transparent"
        accessor="total"
        paddingLeft="16"
        absolute={false}
        style={{
            borderRadius: 4,
        }}
      />
    </View>
  )
}

const themeStyle = StyleService.create({
  container: {
    marginBottom: 4
  }
})