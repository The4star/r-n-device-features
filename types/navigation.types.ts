import Place from "../models/Place";

export type PlacesNavigatorParamList = {
  Places: undefined;
  PlaceDetail: IPlaceDetailParams;
  NewPlace: undefined;
  Map: undefined
}

interface IPlaceDetailParams {
  place: Place
}