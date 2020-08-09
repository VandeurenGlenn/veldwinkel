import * as idb from './../node_modules/idb-keyval/dist/idb-keyval.mjs';
const { Store, set, get, del, keys } = idb;

const unique = arr => arr.filter((el, pos, arr) => {
  return arr.indexOf(el) == pos;
})

export default class OADB {
  constructor(ref) {
    this.sync = this.sync.bind(this);
    this.remove = this.remove.bind(this);
    
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
    this.localStore = await new Store(`odb-local-${this.name}`, this.name);
    this.ref = firebase.database().ref(this.name);
    
    
    await this.sync();
    this.ref.on('child_removed', this.remove)
    this.ref.on('child_changed', this.sync);
    this.ref.on('child_added', (snap) => {      
      pubsub.publish(`${this.name}.added`, snap.key)
    });
    
  }
  
  async remove(snap) {
    pubsub.publish(`${this.name}.remove`, snap.key)
    await del(snap.key, this.store)
  }

  async sync(data) {    
    // if (this.ref && this.isOnline()) {
    //   const localKeys = await keys(this.localStore)
    //   data = await this.ref.once('value');
    //   data = data.val();
    // 
    //   if (data) for (const key of Object.keys(data)) {
    //     console.log(key);
    //     const local = await get(key, this.localStore);
    //     console.log({local});
    //     if (!local && data[key].timestamp) {
    //       const current = await get(key, this.store);
    //       if (!current) await set(key, data[key], this.store);
    //       else {
    //         // if (data[key].timestamp !== current.timestamp) {
    //         //   if (data[key].timestamp > current.timestamp) {
    //             await set(key, data[key], this.store)
    //         //   }
    //         // }              
    //       }
    //     }  
    //     if (local && local.timestamp > data[key].timestamp) {
    //       await firebase.database().ref(`${this.name}/${key}`).set(local);
    //       await remove(key, this.localStore);
    //     }
    //   }
    // }
    if (this.ref && this.isOnline()) {
      data = await this.ref.once('value');
      data = data.val();
      if (data) {
        for (const key of Object.keys(data)) {
          const current = await get(key, this.store);
          if (!current) await set(key, data[key], this.store);
          else if (data[key].timestamp > current.timestamp) {
            await set(key, data[key], this.store)
          }
        }
        
        
        const dataKeys = await keys(this.store);
        if (dataKeys && dataKeys.length > 0) for (const key of dataKeys) {
          if (!data[key]) await del(key, this.store)
        }
      } else {
        const dataKeys = await keys(this.store);
        if (dataKeys && dataKeys.length > 0) for (const key of dataKeys) {
          await del(key, this.store)
        }
      }      
    }
  }
    
    
    // set('foo', 'bar', customStore);
    // await this.localStorage.set(data);
  

  // async set(child, value) {

  //   const online = this.isOnline();
  //   if (online) {
  //     if (child) return firebase.database().ref(`${this.name}/${child}`).set(value);
  //     else return firebase.database().ref(`${this.name}`).set(value);
  //   }
  //   if (!online && child) {
  //     return await set(child, value, this.localStore);
  //   }
  //   const promises = [];
  // 
  //   for (const key of Object.keys(value)) {
  //     promises.push(set(key, value[key], this.localStore))
  //   }
  //   return Promise.all(promises);
  // }

  async set(child, value) {
    if (child) {
      return await set(child, value, this.store);
    }
    const promises = [];
    
    for (const key of Object.keys(value)) {
      promises.push(set(key, value[key], this.store))
    }
    return Promise.all(promises);
  }

  get(child) {
    return new Promise(async (resolve, reject) => {
      const online = this.isOnline();
      console.log(child);
      let data = {};
      if (child) data = await get(child, this.store);
      else {
        const dataKeys = await keys(this.store);
        if (dataKeys && dataKeys.length > 0) for (const key of dataKeys) {
          data[key] = await get(key, this.store)
        }
      }
      console.log({data});
      if (data && Object.keys(data).length > 0) resolve(data);
      if (online && this.ref) {
        let snap;
        if (child) snap = await firebase.database().ref(`${this.name}/${child}`).once('value');
        else snap = await this.ref.once('value');
        snap = snap.val();
        if (!data && snap || data && Object.keys(data).length === 0 && snap) {
          resolve(snap);
          if (child) {
            await set(child, snap, this.store);
          }
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
        resolve()
    });
  }
}
