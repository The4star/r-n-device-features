import React from 'react';

import { Platform, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : colors.primary
  }
})

export default styles;