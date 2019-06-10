export default class OADB {
  get localStorage() {
    return {
      get: (child) => new Promise((resolve, reject) => {
        let data;
        if (child) {
          data = localStorage.getItem(this.name);
          if (data) {
            data = JSON.parse(data);
            data = data[child];
          } else {
            data = null;
          }
        } else {
          data = localStorage.getItem(this.name);
          if (data) data = JSON.parse(data);
          else data = null;
          // if (!data) data = null;
        }
        resolve(data);
      }),
      set: (child, value) => new Promise((resolve, reject) => {
        if (!value) {
          value = child;
          child = undefined;
        }
        if (child) {
          let data = localStorage.getItem(this.name);
          data = JSON.parse(data);
          data[child] = value;
          value = data;
        }
        localStorage.setItem(this.name, JSON.stringify(value));
        resolve();
      })
    };
  }

  get localChanges() {
    return {
      get: (child) => new Promise((resolve, reject) => {
        let data;
        if (child) {
          data = localStorage.getItem('localChanges');
          data = JSON.parse(data);
          if (data) data = data[child];
          else data = null;
        } else {
          data = localStorage.getItem('localChanges');
          if (data) data = JSON.parse(data);
          else data = null;
          // if (!data) data = null;
        }
        resolve(data);
      }),
      set: (value, child) => new Promise((resolve, reject) => {
        if (child) {
          let data = localStorage.getItem('localChanges');
          data = JSON.parse(data);
          data[child] = value;
          value = data;
        }
        localStorage.setItem('localChanges', JSON.stringify(value));
        resolve();
      }),
      remove: (child) => new Promise((resolve, reject) => {
        if (child) {
          let data = localStorage.getItem('localChanges');
          data = JSON.parse(data);
          delete data[child];
          value = data;
        } else {
          value = {};
        }
        localStorage.setItem('localChanges', JSON.stringify(value));
        resolve();
      })
    };
  }
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
    this.ref = firebase.database().ref(this.name);
    await this.sync();
    this.ref.on('child_changed', this.sync);
  }

  async sync(data) {
    if (this.ref && this.isOnline()) {
      data = await this.ref.once('value');
      data = data.val();
      for (const key of Object.keys(data)) {
        const change = await this.localChanges.get(key);
        if (change && change.timestamp > data[key].timestamp) {
          await firebase.database().ref(`${this.name}/${key}`).set(change);
          this.localChanges.remove(key);
        }
      }
    }
    await this.localStorage.set(data);
  }

  async set(child, value) {
    const online = this.isOnline();
    if (online) {
      if (this.ref) return this.ref.set(value);
    } else if (!online && child) {
      await this.localChanges.set(child, value);
    }
    return this.localStorage.set(value);
  }

  get(child) {
    return new Promise(async (resolve, reject) => {
      const online = this.isOnline();
      const data = await this.localStorage.get(child);
      if (data) resolve(data);
      if (online && this.ref) {
        let snap;
        if (child) snap = await firebase.database().ref(`${this.name}/${child}`).once('value');
        else snap = await this.ref.once('value');
        snap = snap.val();
        if (!data) {
          resolve(snap);
          if (child) await this.localStorage.set(child, snap);
          else await this.localStorage.set(snap);
        } else {
          // TODO: introduce timestamps
          if (data.timestamp < snap.timestamp) {
            if (child) await this.localStorage.set(child, snap);
            else await this.localStorage.set(snap);
            document.dispatchEvent(new CustomEvent('storage-update', { detail: { child, snap } }));
          }
        }
      }
    });
  }
}
