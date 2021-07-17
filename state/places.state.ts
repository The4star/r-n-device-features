import * as FileSystem from 'expo-file-system';
import { Dispatch, AnyAction } from 'redux';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';
import db from '../helpers/db';
import Place from '../models/Place';
import { IPlace } from '../types/places.types';
import ENV from '../env'


export interface IPlacesState {
  places: Place[]
}

const initialState: IPlacesState = {
  places: []
}

enum PlacesActions {
  ADD_PLACE = 'ADD_PLACE',
  SET_PLACES = 'SET_PLACES'
}

export const addPlace = (place: IPlace) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const addressResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${place.lat},${place.lng}&key=${ENV().googleApiKey}`)
      const address = addressResponse.data.results ? addressResponse.data.results[0].formatted_address : 'Not available'
      const fileName = place.image.split('/').pop() as string;
      const newPath = FileSystem.documentDirectory + fileName;

      await FileSystem.moveAsync({
        from: place.image,
        to: newPath
      });

      place.address = address;
      place.image = newPath
      const dbResult = await db.insertPlace(
        place.title,
        place.image,
        address,
        place.lat,
        place.lng
      ) as SQLite.SQLResultSet

      place.id = dbResult.insertId
      dispatch({
        type: PlacesActions.ADD_PLACE,
        data: place
      })
    } catch (error) {
      throw error;
    }
  }
}

export const loadPlaces = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const dbResult = await db.getAllPlaces() as SQLite.SQLResultSet;
      const dbRows: any = dbResult.rows
      dispatch({
        type: PlacesActions.SET_PLACES,
        data: dbRows._array
      })
    } catch (error) {
      throw error;
    }
  }
}

const placesReducer = (state = initialState, action: AnyAction): IPlacesState => {
  const { type, data } = action
  switch (type) {
    case PlacesActions.ADD_PLACE:
      const placeToAdd = new Place(
        data.id,
        data.title,
        data.image,
        data.address,
        data.lat,
        data.lng
      )
      return {
        ...state,
        places: [...state.places, placeToAdd]
      }
    case PlacesActions.SET_PLACES:
      return {
        ...state,
        places: data.map((place: IPlace) => (
          new Place(
            place.id!,
            place.title,
            place.image,
            place.address!,
            place.lat,
            place.lng
          )
        ))
      }
    default:
      return state
  }
}

export default placesReducer;