import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './PlaceItem.styles';

interface IPlaceItemProps {
  onSelect: () => void;
  image: string | null;
  title: string;
  address: string | null;
}
const PlaceItem = ({ onSelect, image, title, address }: IPlaceItemProps) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.placeItem}>
      {
        image ?
          <Image style={styles.image} source={{ uri: image }} />
          : null
      }
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PlaceItem
