import { Autocomplete, AutocompleteItem } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const filter = (item, query) => item.toLowerCase().includes(query.toLowerCase());

export const AutocompleteForm = ({ placeholder, initValue, initData, handler, onFocus }) => {

  const [value, setValue] = useState(initValue);
  const [data, setData] = useState(initData);

  const onSelect = (index) => {
    handler(initData[index]);
  };

  const onChangeText = (query) => {
    handler(query);
    setData(initData.filter(item => filter(item, query)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item}
    />
  );

  useEffect(() => {
    setData(initData);
    setValue('');
  }, [initData]);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  return (
    <Autocomplete
      placeholder={placeholder}
      value={value}
      onFocus={onFocus}
      onSelect={onSelect}
      onChangeText={onChangeText}>
      {data.map(renderOption)}
    </Autocomplete>
  )
}

const styles = StyleSheet.create({})
