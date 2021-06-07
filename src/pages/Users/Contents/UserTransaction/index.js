import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { host } from '../../../../api/config'
import { getTransactionAPI } from '../../../../api/transactionAPI'
import { TransactionCard } from '../../../../components/Cards'
import { ScreenLoader } from '../../../../components/Loaders'
import { TransactionPreview } from '../../../../containers/TransactionsPage'

export const UserTransaction = () => {

  // redux
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.data);
  const period = useSelector(state => state.transactionReducer.period);

  // state
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [preview, setPreview] = useState(false);

  // function
  const generateStatus = (type) => {
    switch (type) {
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

  const handleSelectCard = i => {
    setIndex(i);
    setPreview(true);
  }

  const handleGetTransactionAPI = async () => {
    const params = {
      month: period.month,
      year: period.year,
      email: user.email
    }
    const transaction = await getTransactionAPI(params);
    setData(transaction.data.data);
  }

  useEffect(() => {
    handleGetTransactionAPI();
  }, [period]);

  return data ? (
    <ScrollView>
      <View style={styles.container}>
        {
          data.map((data, i) => (
            <TransactionCard
              key={data.id}
              id={data.id}
              detail={data.detail}
              date={data.date}
              amount={data.amount}
              email={data.createdBy}
              status={generateStatus(data.type)}
              image={{ uri: `${host}/${data.evidence}` }}
              handler={() => handleSelectCard(i)}
            />
          ))
        }
        <TransactionPreview
          data={data}
          index={index}
          visible={preview}
          handleClose={() => setPreview(false)}
        />
      </View>
    </ScrollView>
  ) : <ScreenLoader />
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingBottom: 650
  }
})
