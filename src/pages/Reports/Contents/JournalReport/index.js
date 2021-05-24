import { Button, Divider, Icon, List, ListItem, Spinner } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native'
import { host } from '../../../../api/config';
import { getJounralListAPI, getJournalAPI } from '../../../../api/reportAPI';
import { ScreenLoader } from '../../../../components/Loaders';

export const JournalReport = () => {

  // state
  const [load, setLoad] = useState(false);
  const [data, setData] = useState(null);

  // function
  const handleGetJournalListAPI = async () => {
    const journalList = await getJounralListAPI();
    setData(journalList.data.data);
  }

  const onDownload = async (period) => {
    setLoad(true);
    const res = await getJournalAPI(period);
    Linking.openURL(`${host}/public/pdf/${res.data.data}`);
    setLoad(false);
  }

  useEffect(() => {
    handleGetJournalListAPI();
  }, []);

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
      title={`Jurnal_${item.month}_${item.year}.pdf`}
      description={`Jurnal Umum`}
      disabled={load}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => renderItemAccessory(item)}
      onPress={() => onDownload(item)}
    />
  );

  return data ? (
    <List
      style={styles.container}
      // ItemSeparatorComponent={Divider}
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
