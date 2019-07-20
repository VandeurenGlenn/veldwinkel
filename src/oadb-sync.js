import * as idb from './../node_modules/idb-keyval/dist/idb-keyval-cjs';
const { Store, set, get, remove, keys } = idb;

/**
 * a trimmed version of OADB, only syncs the database to local.
 */
export default class OADBSync {
  constructor(ref) {
    this.sync = this.sync.bind(this);
    this.name = ref;
    window.addEventListener('online', function(e) {
      console.log('online');
      // Re-sync data with server.
    }, false);

    window.addEventListener('offline', function(e) {
      console.log('offline');
      // Queue up events for server.
    }, false);

    if (this.isOnline()) {
      this.init();
    }

    // listen onlinse
    // if (!this.ref) this.init()
    // this.sync()
  }

  isOnline() {
    return navigator.onLine;
  }

  async init() {
    this.store = await new Store(`odb-${this.name}`, this.name);
    this.ref = firebase.database().ref(this.name);
    
    
    await this.sync();
    this.ref.on('child_changed', this.sync);
  }

  async sync(data) {    
    if (this.ref && this.isOnline()) {
      data = await this.ref.once('value');
      data = data.val();
      for (const key of Object.keys(data)) {
        const current = await get(key, this.store);
        if (!current) await set(key, data[key], this.store);
        else if (data[key].timestamp > current.timestamp) {
          await set(key, data[key], this.store)
        }
      }
    }   
  }
    
    
    // set('foo', 'bar', customStore);
    // await this.localStorage.set(data);
  

  async set(child, value) {
    if (child) {
      return await set(child, value, this.localStore);
    }
    const promises = [];
    
    for (const key of Object.keys(value)) {
      promises.push(set(key, value[key], this.localStore))
    }
    return Promise.all(promises);
  }

  get(child) {
    return new Promise(async (resolve, reject) => {
      const online = this.isOnline();
      let data;
      if (child) data = await get(child, this.store);
      else {
        const dataKeys = await keys(this.store);
        if (dataKeys && dataKeys.length > 0) for (const key of dataKeys) {
          data[key] = get(key, this.store)
        }
      }
      if (data) resolve(data);
      if (online && this.ref) {
        let snap;
        if (child) snap = await firebase.database().ref(`${this.name}/${child}`).once('value');
        else snap = await this.ref.once('value');
        snap = snap.val();
        if (!data && snap) {
          resolve(snap);
          if (child) await set(child, snap, this.store);
          else {
            for (const key of Object.keys(snap)) {              
              await set(key, snap[key], this.store);
            }
          }
        } else if (snap && data && data.timestamp < snap.timestamp) {
            if (child) await set(child, snap, this.store);
            else {
              for (const key of Object.keys(snap)) {              
                await set(key, snap[key], this.store);
              }
            }
            document.dispatchEvent(new CustomEvent('storage-update', { detail: { child, snap } }));
          }
        }
      
      resolve();
    });
  }
}
