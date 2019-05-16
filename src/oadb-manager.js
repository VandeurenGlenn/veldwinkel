import OADB from './oadb.js';

export default class OADBManager {
  constructor(databases) {
    this.databases = new Map();
    if (databases) {
      for (const database of databases) {
        this.databases.set(database, new OADB(database));
      }
    }
  }

  init(database) {
    this.databases.set(database, new OADB(database));
  }

  get(database) {
    if (!database) return this.databases;
    let db = this.databases.get(database);
    if (!db) {
      this.init(database);
      db = this.databases.get(database);
    }
    return db;
  }

  set(database) {
    let db = this.databases.get(database);
    if (!db) {
      this.init(database);
      db = this.databases.get(database);
    }
    if (db) return db;
    return null;
  }
}
