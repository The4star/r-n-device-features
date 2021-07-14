import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import colors from '../../constants/colors'
import db from '../../helpers/db'
import { PlacesNavigatorParamList } from '../../types/navigation.types'
import styles from './PlaceDetailScreen.styles'

interface IPlaceDetailScreen {
  route: RouteProp<PlacesNavigatorParamList, 'PlaceDetail'>
  navigation: StackNavigationProp<PlacesNavigatorParamList, 'PlaceDetail'>
}

const PlaceDetailScreen = ({ route, navigation }: IPlaceDetailScreen) => {
  const place = route.params.place

  const deleteHandler = async () => {
    navigation.goBack()
    await db.deletePlace(place.id)
  }

  return (
    <View style={styles.screen}>
      <Text>
        {place.title}
      </Text>
      <Button title="Delete" color={colors.primary} onPress={deleteHandler} />
    </View>
  )
}

export default PlaceDetailScreen
