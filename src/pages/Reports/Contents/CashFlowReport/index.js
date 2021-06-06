import { Button, Divider, Icon, List, ListItem, Spinner } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native'
import { useSelector } from 'react-redux';
import { host } from '../../../../api/config';
import { getCashFlowAPI } from '../../../../api/reportAPI';
import { ScreenLoader } from '../../../../components/Loaders';

export const CashFlowReport = () => {

  // redux
  const data = useSelector(state => state.reportReducer.report);

  // state
  const [load, setLoad] = useState(false);

  // function
  const onDownload = async (period) => {
    setLoad(true);
    const res = await getCashFlowAPI(period);
    Linking.openURL(`${host}/public/pdf/${res.data.data}`);
    setLoad(false);
  }

  // component
  const renderItemIcon = (props) => (
    <Icon {...props} name='file-outline' />
  );

  const renderItemAccessory = (item) => (
    <Button
      size="tiny"
      disabled={load}
      onPress={() => onDownload(item)}
    >
      {load ? <Spinner status="basic" size="tiny" /> : 'LIHAT'}
    </Button>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={`Arus Kas_${item.month}_${item.year}.pdf`}
      description={`Arus Kas`}
      disabled={load}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => renderItemAccessory(item)}
      onPress={() => onDownload(item)}
    />
  );

  return data ? (
    <List
      style={styles.container}
      ItemSeparatorComponent={Divider}
      data={data}
      renderItem={renderItem}
    />
  ) : <ScreenLoader />
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    padding: 8
  },
})
