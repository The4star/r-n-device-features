import React, { useEffect, useState } from 'react'
import { View, Button, Text, ActivityIndicator, Alert, Platform } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import * as Location from 'expo-location';

import styles from './LocationPicker.styles';
import colors from '../../constants/colors';
import MapPreview from './map-preview/MapPreview';
import { IMapPreview } from '../../types/forms.types';
import { StackNavigationProp } from '@react-navigation/stack';
import { PlacesNavigatorParamList } from '../../types/navigation.types';


interface ILocationPickerProps {
  onLocationPicked: (value: string) => void;
  navigation: StackNavigationProp<PlacesNavigatorParamList, 'NewPlace'>
  route: RouteProp<PlacesNavigatorParamList, "NewPlace">
}

const LocationPicker = ({ onLocationPicked, navigation, route }: ILocationPickerProps) => {
  const [location, setLocation] = useState<IMapPreview>({ lat: null, lng: null });
  const [loading, setLoading] = useState<boolean>(false);

  const mapPickedLocation = route.params ? route.params : null

  const permissionValidator = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return false
      } else {
        return true
      }
    }
  }

  const getLocationHandler = async () => {
    try {
      setLocation({
        lat: null,
        lng: null
      })
      const permission = await permissionValidator();
      if (permission) {
        setLoading(true)
        const location = await Location.getCurrentPositionAsync({});
        const locationData = {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
        setLocation(locationData)
        onLocationPicked(JSON.stringify(locationData))
      }
    } catch (error) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map',
        [{ text: "OK" }]
      )
      console.log(error);
    }
    setLoading(false);
  }

  const pickOnMapHandler = () => {
    navigation.navigate({
      name: 'Map',
      params: undefined
    })
  }

  useEffect(() => {
    if (mapPickedLocation) {
      setLocation(mapPickedLocation);
      onLocationPicked(JSON.stringify(mapPickedLocation));
    }
  }, [mapPickedLocation])

  return (
    <View style={styles.locationPicker}>
      <MapPreview lat={location.lat} lng={location.lng} openMapHandler={pickOnMapHandler} >
        {
          loading ?
            <ActivityIndicator size="small" color={colors.primary} />
            :
            <Text>No location chosen yet</Text>
        }
      </MapPreview>
      <View style={styles.actions}>
        <Button title="Get My Location" onPress={getLocationHandler} color={colors.primary} />
        <Button title="Pick location on map" onPress={pickOnMapHandler} color={colors.primary} />
      </View>

    </View>
  )
}

export default LocationPicker
