import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import * as maps from 'react-native-maps'
import MapView, { Marker } from 'react-native-maps';
import { IMapPreview } from '../../types/forms.types';
import { PlacesNavigatorParamList } from '../../types/navigation.types';

import styles from './MapScreen.styles'

interface IMapScreenProps {
  navigation: StackNavigationProp<PlacesNavigatorParamList, "Map">
  route: RouteProp<PlacesNavigatorParamList, "Map">
}

const MapScreen = ({ navigation, route }: IMapScreenProps) => {
  const readOnly = route.params ? route.params.readOnly : false
  const initialPlace = route.params ? route.params.initialLocation : { lat: null, lng: null }
  const [selectedLocation, setSelectedLocation] = useState<IMapPreview>(initialPlace)
  const mapRegion = {
    latitude: initialPlace.lat ? initialPlace.lat : 133,
    longitude: initialPlace.lng ? initialPlace.lng : 27,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  const selectLocationHandler = (e: maps.MapEvent<{}>) => {
    if (readOnly) {
      return
    }

    const coordinates = e.nativeEvent.coordinate
    setSelectedLocation({
      lat: coordinates.latitude,
      lng: coordinates.longitude
    })
  }

  const savePickedLocation = useCallback(() => {
    if (!selectedLocation.lat) {
      Alert.alert(
        'No location picked',
        'Please pick a location',
        [{ text: "OK" }]
      )
      return
    }
    navigation.navigate({
      name: 'NewPlace',
      params: {
        lat: selectedLocation.lat,
        lng: selectedLocation.lng
      }
    })
  }, [selectedLocation])

  useEffect(() => {
    if (!readOnly) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={savePickedLocation} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Save Location</Text>
          </TouchableOpacity>
        )
      })
    }

  }, [savePickedLocation, readOnly])

  return (
    <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler} >
      {
        selectedLocation.lat && selectedLocation.lng ?
          <Marker title="Picked Location" coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />
          : null
      }
    </MapView>
  )
}

export default MapScreen;
