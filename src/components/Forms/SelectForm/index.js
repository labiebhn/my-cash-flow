import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectGroup, SelectItem } from '@ui-kitten/components';

export const SelectForm = ({ data = ['Option 1', 'Option 2'], defaultIndex = 0, onSelect }) => {

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(defaultIndex));

  const displayValue = data[selectedIndex.row];

  const handleSelect = (index) => {
    console.log('change index: ', index);
    setSelectedIndex(index);
    onSelect(index.row);
  }

  const renderOption = (title) => (
    <SelectItem key={title} title={title}/>
  );

  useEffect(() => {
    setSelectedIndex(new IndexPath(defaultIndex));
    onSelect(defaultIndex)
  }, [defaultIndex]);

  return (
    <Layout style={styles.container} level='1'>

      <Select
        style={styles.select}
        placeholder='Default'
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
      >
        {data.map(renderOption)}
      </Select>

    </Layout>
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