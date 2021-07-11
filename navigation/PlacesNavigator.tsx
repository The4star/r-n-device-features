import React from 'react';
import { createStackNavigator, HeaderTitle, StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import colors from '../constants/colors';
import MapScreen from '../screens/map-screen/MapScreen';
import NewPlaceScreen from '../screens/new-place-screen/NewPlaceScreen';
import PlaceDetailScreen from '../screens/place-detail-screen/PlaceDetailScreen';
import PlacesListScreen from '../screens/places-list-screen/PlacesListScreen';
import { PlacesNavigatorParamList } from '../types/navigation.types';
import CustomHeaderButton from '../components/global/CustomHeaderButton';
import { RouteProp } from '@react-navigation/native';

const PlacesStack = createStackNavigator<PlacesNavigatorParamList>();


const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
}

const PlacesNavigator = () => (
  <PlacesStack.Navigator screenOptions={defaultScreenOptions}>
    <PlacesStack.Screen
      name="Places"
      component={PlacesListScreen}
      options={({ navigation }: { navigation: StackNavigationProp<PlacesNavigatorParamList, 'Places'> }) => {
        return {
          headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Add Place"
              iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
              onPress={() => navigation.navigate({
                name: 'NewPlace',
                params: undefined
              })}
            />
          </HeaderButtons>
        }
      }}
    />
    <PlacesStack.Screen
      name="PlaceDetail"
      component={PlaceDetailScreen}
      options={({ route }: { route: RouteProp<PlacesNavigatorParamList, 'PlaceDetail'> }) => {
        return {
          headerTitle: route.params.place.title
        }
      }}
    />
    <PlacesStack.Screen
      name="NewPlace"
      component={NewPlaceScreen}
      options={() => {
        return {
          headerTitle: "Add Place"
        }
      }}
    />
    <PlacesStack.Screen
      name="Map"
      component={MapScreen}
    />
  </PlacesStack.Navigator>
)

export {
  PlacesNavigator
}