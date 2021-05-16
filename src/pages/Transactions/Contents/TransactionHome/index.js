import { Card, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { host } from '../../../../api/config';
import { getTransactionAPI } from '../../../../api/transactionAPI';
import { TransactionCard } from '../../../../components/Cards';
import { ScreenLoader } from '../../../../components/Loaders';

export const TransactionHome = () => {

  const styles = useStyleSheet(themeStyle);

  // state
  const [data, setData] = useState(null);
  const [sum, setSum] = useState(null);
  const [period, setPeriod] = useState(null);

  // function
  const generateStatus = (type) => {
    switch(type) {
      case 'in':
        return 'success'
      case 'out':
        return 'warning'
      case 'payable':
        return 'danger'
      case 'receivable':
        return 'info'
      default:
        return 'basic'
    }
  }

  const handleGetTransactionAPI = async () => {
    const transaction = await getTransactionAPI();
    setData(transaction.data.data);
    setSum(transaction.data.sum);
    setPeriod(transaction.data.period);
  }

  useEffect(() => {
    handleGetTransactionAPI();
  }, []);

  return data ? (
    <ScrollView>
      <Layout style={styles.container}>
        {
          data.map(data => (
            <TransactionCard 
              key={data.id}
              id={data.id}
              detail={data.detail}
              date={data.date}
              amount={data.amount}
              email={data.createdBy}
              status={generateStatus(data.type)}
              image={data.evidence}
            />
          ))
        }
      </Layout>
    </ScrollView>
  ) : <ScreenLoader />
}

const themeStyle = StyleService.create({
  container: {
    flex: 1,
    padding: 8,
    paddingBottom: 180
  },
})