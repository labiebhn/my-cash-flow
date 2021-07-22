import { Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import React, { useState } from 'react'
import CurrencyInput, { formatNumber } from 'react-native-currency-input';

export const CurrencyForm = ({ value, handler, placeholder, onFocus }) => {

  const styles = useStyleSheet(themeStyle);

  // state
  const [focus, setFocus] = useState(false);

  return (
    <Layout style={[styles.container, focus ? styles.focus : null]}>
      <Text style={styles.unit} status="primary">Rp</Text>
      <CurrencyInput 
        value={value}
        onChangeValue={handler}
        delimiter="."
        precision={0}
        style={styles.input}
        placeholder={placeholder}
        onFocus={e => {
          setFocus(true)
          onFocus?.();
        }}
        onBlur={e => setFocus(false)}
      />
    </Layout>
  )
}

const themeStyle = StyleService.create({
  container: {
    position: 'relative',
    paddingHorizontal: 24,
    paddingVertical: 6,
    backgroundColor: 'color-basic-200',
    borderWidth: 1,
    borderColor: 'color-basic-400',
    borderRadius: 4
  },
  focus: {
    backgroundColor: 'color-basic-100',
    borderColor: 'color-primary-default',
  },
  unit: {
    position: 'absolute',
    top: 8,
    left: 12,
    fontSize: 8
  },
  input: {
    padding: 0,
    fontSize: 16,
  }
})
