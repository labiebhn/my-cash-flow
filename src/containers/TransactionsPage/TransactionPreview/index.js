import { Card, Icon, Layout, StyleService, Text, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FormatDateID, GenerateTypeTransaction } from '../../../utils';
import ImageView from "react-native-image-viewing";
import { host } from '../../../api/config';
import { formatNumber } from 'react-native-currency-input';
import { useDispatch } from 'react-redux';
import { selectTransaction, tabTransaction } from '../../../store/actions/transactionAction';

export const TransactionPreview = ({ data, index, visible, handleClose }) => {

  const styles = useStyleSheet(themeStyle);

  // redux
  const dispatch = useDispatch();

  // state
  const [indexState, setIndexState] = useState(index);

  // function
  const handleEdit = () => {
    dispatch(selectTransaction(data[indexState]));
    dispatch(tabTransaction(0));
    handleClose();
  }

  // component
  // **************** Navigation ********************
  const BackIcon = (props) => (
    <TouchableOpacity onPress={handleClose}>
      <Icon {...props} name='arrow-back' />
    </TouchableOpacity>
  );

  const EditIcon = (props) => (
    <TouchableOpacity onPress={handleEdit}>
      <Icon {...props} name='edit-outline' />
    </TouchableOpacity>
  );

  const DeleteIcon = (props) => (
    <TouchableOpacity onPress={handleClose}>
      <Icon {...props} name='trash-outline' />
    </TouchableOpacity>
  );


  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} />
  );

  const RightAction = () => (
    <>
      <TopNavigationAction icon={EditIcon} />
      <TopNavigationAction icon={DeleteIcon} />
    </>
  )

  const Navigation = ({ imageIndex }) => {
    let i = imageIndex;
    let dateID = FormatDateID(data[i].date)
    return (
      <TopNavigation
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={RightAction}
        title={data[i].id}
        subtitle={`${dateID.date} ${dateID.month} ${dateID.year}`}
      />
    )
  }
  // *************** End Navigation ******************

  const Footer = ({ imageIndex }) => {
    let i = imageIndex;
    return (
      <Layout style={styles.footer}>
        <Text status="control" style={styles.text}>{GenerateTypeTransaction(data[i].type)} Rp{formatNumber(data[i].amount)}</Text>
        <Text status="control" style={styles.text}>{data[i].detail}</Text>
        <Text status="control" style={styles.text}>
          <Icon name="plus-square-outline" fill="#ffff" style={[styles.icon, styles.iconCreate]} /> {data[i].createdBy}
        </Text>
        {
          data[i].updatedBy ?
          <Text status="control" style={styles.text}>
            <Icon name="edit-outline" fill="#ffff" style={[styles.icon, styles.iconUpdate]} /> {data[i].updatedBy}
          </Text> : null
        }
      </Layout>
    )
  }

  return (
    <ImageView
      images={data.map(data => ({ uri: `${host}/${data.evidence}` }))}
      imageIndex={index}
      visible={visible}
      animationType="slide"
      swipeToCloseEnabled={false}
      HeaderComponent={Navigation}
      FooterComponent={Footer}
      onRequestClose={handleClose}
      onImageIndexChange={(index) => setIndexState(index)}
    />
  )
}

const themeStyle = StyleService.create({
  footer: {
    padding: 16,
    backgroundColor: '#0000007f'
  },
  text: {
    textAlign: 'center',
  },
  icon: {
    width: 12,
    height: 12,
    marginBottom: -2,
    borderRadius: 2
  },
  iconCreate: {
    backgroundColor: 'color-primary-default'
  },
  iconUpdate: {
    backgroundColor: 'color-warning-default'
  }
})