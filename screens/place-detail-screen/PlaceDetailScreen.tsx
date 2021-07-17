import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { ScrollView, View, Image, Text, Button } from 'react-native'
import MapPreview from '../../components/location-picker/map-preview/MapPreview'
import colors from '../../constants/colors'
import db from '../../helpers/db'
import Place from '../../models/Place'
import { PlacesNavigatorParamList } from '../../types/navigation.types'
import styles from './PlaceDetailScreen.styles'

interface IPlaceDetailScreen {
  route: RouteProp<PlacesNavigatorParamList, 'PlaceDetail'>
  navigation: StackNavigationProp<PlacesNavigatorParamList, 'PlaceDetail'>
}

const PlaceDetailScreen = ({ route, navigation }: IPlaceDetailScreen) => {
  const place: Place = route.params.place

  const deleteHandler = async () => {
    navigation.goBack()
    await db.deletePlace(place.id)
  }

  const showMapHandler = () => {
    navigation.navigate({
      name: 'Map',
      params: {
        readOnly: true,
        initialLocation: {
          lat: place.lat,
          lng: place.lng
        }
      }
    })
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>
            {place.address}
          </Text>
        </View>

        <MapPreview lat={place.lat} lng={place.lng} openMapHandler={showMapHandler} readOnly />
      </View>
      <Button title="Delete" color={colors.primary} onPress={deleteHandler} />
    </ScrollView>
  )
}

export default PlaceDetailScreen
