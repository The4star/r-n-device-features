import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

class Place {
  public id: string;
  public title: string;
  public image: string;
  constructor(title: string, image: string) {
    this.id = uuidv4();
    this.title = title
    this.image = image
  }
}

export default Place