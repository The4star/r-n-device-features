import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'
import { PlacesNavigator } from './navigation/PlacesNavigator';
import stateStore from './state/store';

export default function App() {
  return (
    <Provider store={stateStore}>
      <NavigationContainer>
        <PlacesNavigator />
      </NavigationContainer>
    </Provider>
  )
}