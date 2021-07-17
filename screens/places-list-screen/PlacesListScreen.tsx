import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PlaceItem from '../../components/place-item/PlaceItem'
import Place from '../../models/Place'
import { loadPlaces } from '../../state/places.state'
import { ICombinedStates } from '../../state/store'
import { PlacesNavigatorParamList } from '../../types/navigation.types'
import styles from './PlacesListScreen.styles'

type PlacesListScreenNavigationProp = StackNavigationProp<PlacesNavigatorParamList, 'Places'>

interface IPlacesListScreenProp {
  navigation: PlacesListScreenNavigationProp
}
const PlacesListScreen = ({ navigation }: IPlacesListScreenProp) => {
  const dispatch = useDispatch()
  const places = useSelector<ICombinedStates, Place[]>(state => state.places.places)

  const loadAllPlaces = () => {
    dispatch(loadPlaces())
  }

  useEffect(() => {
    loadAllPlaces()
  }, [loadAllPlaces])

  useEffect(() => {
    navigation.addListener('focus', loadAllPlaces)
    return () => {
      navigation.removeListener('focus', loadAllPlaces)
    }
  }, [loadAllPlaces])

  return (
    <FlatList keyExtractor={(item) => item.title} data={places} renderItem={(itemData: ListRenderItemInfo<Place>) => (
      <PlaceItem title={itemData.item.title} address={itemData.item.address} image={itemData.item.image} onSelect={() => {
        navigation.navigate({
          name: 'PlaceDetail',
          params: { place: itemData.item }
        })
      }} />
    )} />
  )
}

export default PlacesListScreen
