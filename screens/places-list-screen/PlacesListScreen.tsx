import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { useSelector } from 'react-redux'
import PlaceItem from '../../components/place-item/PlaceItem'
import Place from '../../models/Place'
import { ICombinedStates } from '../../state/store'
import { PlacesNavigatorParamList } from '../../types/navigation.types'
import styles from './PlacesListScreen.styles'

type PlacesListScreenNavigationProp = StackNavigationProp<PlacesNavigatorParamList, 'Places'>

interface IPlacesListScreenProp {
  navigation: PlacesListScreenNavigationProp
}
const PlacesListScreen = ({ navigation }: IPlacesListScreenProp) => {
  const places = useSelector<ICombinedStates, Place[]>(state => state.places.places)
  return (
    <FlatList data={places} renderItem={(itemData: ListRenderItemInfo<Place>) => (
      <PlaceItem title={itemData.item.title} address={null} image={null} onSelect={() => {
        navigation.navigate({
          name: 'PlaceDetail',
          params: { place: itemData.item }
        })
      }} />
    )} />
  )
}

export default PlacesListScreen
