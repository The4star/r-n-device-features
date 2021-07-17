import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import ENV from '../../../env';

import styles from './MapPreview.styles';

interface IMapPreviewProps {
  lat: number | null,
  lng: number | null,
  openMapHandler: () => void
  readOnly?: boolean;
  children?: any,
}
const MapPreview = ({ lat, lng, openMapHandler, readOnly, children }: IMapPreviewProps) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:A%7C${lat},${lng}&key=${ENV().googleApiKey}`

  if (readOnly) {
    return (
      <TouchableOpacity style={styles.mapPreviewReadOnly} onPress={openMapHandler} >
        <Image style={styles.mapImageReadOnly} source={{ uri: imagePreviewUrl }} />
      </ TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity style={styles.mapPreview} onPress={openMapHandler} >
      {lat && lng ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} /> : children}
    </ TouchableOpacity>
  )
}

export default MapPreview
