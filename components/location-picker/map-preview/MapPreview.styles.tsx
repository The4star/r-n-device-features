import React from 'react';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  mapPreviewReadOnly: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  mapImage: {
    width: '100%',
    height: '100%'
  },
  mapImageReadOnly: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
})

export default styles;