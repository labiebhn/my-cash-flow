import { Datepicker, Icon } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

export const DatepickerForm = ({ initValue, handler }) => {

  const handleChangeDate = nextDate => {
    const date = new Date(nextDate);
    date.setDate(date.getDate() + 1);

    handler(date);
  }

  return (
    <Datepicker 
      placeholder='Tanggal Transaksi'
      date={initValue}
      onSelect={nextDate => handler(nextDate)}
      accessoryRight={CalendarIcon}
    />
  )
}

const styles = StyleSheet.create({})
