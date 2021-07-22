import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectGroup, SelectItem } from '@ui-kitten/components';

export const SelectForm = ({ data = ['Option 1', 'Option 2'], indexState = 0, onSelect, onFocus }) => {

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(indexState));

  const displayValue = data[selectedIndex.row];

  const renderOption = (title) => (
    <SelectItem key={title} title={title} />
  );

  useEffect(() => {
    setSelectedIndex(new IndexPath(indexState));
  }, [indexState]);

  return (
    <Select
      style={styles.select}
      placeholder='Default'
      value={displayValue}
      selectedIndex={selectedIndex}
      onFocus={onFocus}
      onSelect={({ row }) => onSelect(row)}
    >
      {data.map(renderOption)}
    </Select>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  select: {
    flex: 1,
    margin: 2,
  },
});