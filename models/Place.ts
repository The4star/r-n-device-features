import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

class Place {
  public id: string;
  public title: string;
  constructor(title: string) {
    this.id = uuidv4();
    this.title = title
  }
}

export default Place