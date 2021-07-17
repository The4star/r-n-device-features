import Place from "../models/Place";
import { IMapPreview } from "./forms.types";

export type PlacesNavigatorParamList = {
  Places: undefined;
  PlaceDetail: IPlaceDetailParams;
  NewPlace: IMapPreview | undefined;
  Map: IReadOnlyMapProps | undefined
}

interface IPlaceDetailParams {
  place: Place
}

interface IReadOnlyMapProps {
  readOnly: boolean
  initialLocation: IMapPreview
}
