import { Dispatch, AnyAction } from 'redux';
import Place from '../models/Place';
import { IPlace } from '../types/places.types';


export interface IPlacesState {
  places: Place[]
}

const initialState: IPlacesState = {
  places: []
}

enum PlacesActions {
  ADD_PLACE = 'ADD_PLACE'
}

export const addPlace = (place: IPlace) => {
  return { type: PlacesActions.ADD_PLACE, data: place }
}

const placesReducer = (state = initialState, action: AnyAction): IPlacesState => {
  const { type, data } = action
  switch (type) {
    case PlacesActions.ADD_PLACE:
      const placeToAdd = new Place(data.title)
      return {
        ...state,
        places: [...state.places, placeToAdd]
      }
    default:
      return state
  }
}

export default placesReducer;