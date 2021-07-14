import * as FileSystem from 'expo-file-system';
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
  return async (dispatch: Dispatch<AnyAction>) => {
    const fileName = place.image.split('/').pop() as string;
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: place.image,
        to: newPath
      });
      place.image = newPath
    } catch (error) {
      console.log(`Something went wrong saving photo: ${error}`);
      throw error;
    }

    dispatch({
      type: PlacesActions.ADD_PLACE,
      data: place
    })
  }
}

const placesReducer = (state = initialState, action: AnyAction): IPlacesState => {
  const { type, data } = action
  switch (type) {
    case PlacesActions.ADD_PLACE:
      const placeToAdd = new Place(data.title, data.image)
      return {
        ...state,
        places: [...state.places, placeToAdd]
      }
    default:
      return state
  }
}

export default placesReducer;