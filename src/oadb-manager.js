import OADB from './oadb.js';
import OADBSync from './oadb-sync.js'

let DB;
export default class OADBManager {
  /**
   * @param {boolean} sync - when false, pushes updates to server, otherwise just saves to local
   */
  constructor(sync = true) {
    if (typeof sync === 'boolean' && !sync) DB = OADB;
    else DB = OADBSync;
    /**
     * databases map
     */
    this.databases = new Map();
  }

  init(database) {
    this.databases.set(database, new DB(database));
  }
  
  /**
   * @param {string} database - name
   * @returns {OADB} - database
   */
  get(database) {
    let db = this.databases.get(database);
    if (!db) {
      this.init(database);
      db = this.databases.get(database);
    }
    return db;
  }
  
  /**
   * @returns {OADB} - database
   */
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
