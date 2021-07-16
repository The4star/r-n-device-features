import * as SQLite from 'expo-sqlite';

class DB {
  public client: SQLite.WebSQLDatabase
  constructor() {
    this.client = SQLite.openDatabase('places.db');

    this.client.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => {
          console.log("Database connected");
        },
        (_, error) => {
          console.log((error));
          return false
        }
      );
    })
  }

  insertPlace = (title: string, image: string, address: string, lat: number, lng: number): Promise<SQLite.SQLResultSet | SQLite.SQLError> => {
    return new Promise((resolve, reject) => {
      this.client.transaction((tx) => {
        tx.executeSql('INSERT INTO places (title, image, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
          [title, image, address, lat, lng],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error)
            return false
          }
        );
      })
    })
  }

  getAllPlaces = (): Promise<SQLite.SQLResultSet | SQLite.SQLError> => {
    return new Promise((resolve, reject) => {
      this.client.transaction((tx) => {
        tx.executeSql('SELECT * FROM places;',
          [],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error)
            return false
          }
        );
      })
    })
  }

  deletePlace = (id: number): Promise<SQLite.SQLResultSet | SQLite.SQLError> => {
    return new Promise((resolve, reject) => {
      this.client.transaction((tx) => {
        tx.executeSql('DELETE FROM places WHERE id = ?;',
          [id],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error)
            return false
          }
        );
      })
    })
  }
}

export default new DB();