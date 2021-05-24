import { Button, Icon, Layout, List, ListItem, Popover, Spinner } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionAPI } from '../../../api/transactionAPI';
import { addTransaction, periodTransaction, sumTransaction } from '../../../store/actions/transactionAction';
import { FormatDateID } from '../../../utils';
import { ScreenLoader } from '../../Loaders';

const ChangeIcon = (props) => (
  <Icon {...props} name='chevron-down-outline' fill="#C5CEE0" style={{ width: 20, height: 20, marginRight: -8 }} />
);

export const PeriodList = () => {

  // redux
  const dispatch = useDispatch();
  const transaction = useSelector(state => state.transactionReducer);
  const { period, periodList } = transaction;

  // state
  const [load, setLoad] = useState(false);
  const [periodID, setPeriodID] = useState(FormatDateID(new Date()));
  const [visible, setVisible] = useState(false);

  // function
  const generateDateID = ({ month, year }) => {
    let date = new Date();
    date.setMonth(month - 1);
    date.setFullYear(year);

    return FormatDateID(date);
  }

  const handleGetTransactionAPI = async (params) => {
    setLoad(true);
    const transaction = await getTransactionAPI(params);
    dispatch(addTransaction(transaction.data.data));
    dispatch(sumTransaction(transaction.data.sum));
    dispatch(periodTransaction(transaction.data.period));
    setLoad(false);
  }

  useEffect(() => {
    if (period) {
      setPeriodID(generateDateID(period));
    }
  }, [period]);


  // components
  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)} status="control" accessoryLeft={ChangeIcon}>
      {load ? <Spinner size="tiny" /> : `${periodID.month} ${periodID.year}`}
    </Button>
  );

  const renderItem = ({ index, item }) => {
    let periodListID = generateDateID(item);
    return (
      <ListItem 
        key={index}
        title={`${periodListID.month} ${periodListID.year}`}
        onPress={() => handleGetTransactionAPI(item)}
        disabled={load}
      />
    )
  };

  return (
    <Popover
      visible={visible}
      anchor={renderToggleButton}
      fullWidth={true}
      onBackdropPress={() => setVisible(false)}
    >
      <List
        style={styles.container}
        data={periodList}
        renderItem={renderItem}
      />
    </Popover>
  )
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
  },
  avatar: {
    marginHorizontal: 4,
  },
});