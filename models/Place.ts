class Place {
  public id: number;
  public title: string;
  public image: string;
  public address: string;
  public lat: number;
  public lng: number
  constructor(id: number, title: string, image: string, address: string, lat: number, lng: number) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
  }
}

export default Place