export interface INewPlaceInputs {
  title: string;
  image: string;
  location: string;
}

export interface IMapPreview {
  lat: number | null,
  lng: number | null
}