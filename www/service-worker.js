// import LeofcoinApi from './../node_modules/lfc-api/src/api.js';

var CACHE_NAME = 1596994044641;
var urlsToCache = [
  '/',
  '/index.html'
];

const fromCache = async ({request}) => {
  return await caches.match(request)
};

const fromNet = async ({request}) => {
  // const isIpfsRequest  = request.url.startsWith(`${self.location.origin}/ipfs/`)
  // if (isIpfsRequest) {
  //   const match = request.url.match(/(\/ipfs\/.*?)(#|\?|$)/)
  //   const response = await getResponse(ipfs, match[1])
  //   return response
  // }
  const response = await fetch(request);
  if(!response || response.status !== 200 || response.type !== 'basic') {
    return response
  }
  if (!request.url.includes('/api/dns')) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());  
  }  
  return response
};

self.addEventListener('install', async event => {
  skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', async event => {
  const response = new Promise(async (resolve, reject) => {    
    let response = await fromCache(event);
    if(!response || response.status !== 200 || response.type !== 'basic') response = await fromNet(event);
    resolve(response);
  });
  return event.respondWith(response)
});

self.addEventListener('activate', async (event) => {
  // if (!ipfs) {
  //   ipfs = await new LeofcoinApi()
  //   ipfs = ipfs.ipfs
  // }
  event.waitUntil(clients.claim());
  const keys = await caches.keys();
  for (const key of keys) { 
    if (key !== CACHE_NAME) caches.delete(key);
  }
});
// 
// 
// createProxyServer(() => ipfs, {
//   addListener: self.addEventListener && self.addEventListener.bind(self),
//   removeListener: self.removeEventListener && self.removeEventListener.bind(self),
//   postMessage (data) {
//     self.clients.matchAll().then((clients) => {
//       clients.forEach(client => client.postMessage(data))
//     })
//   }
// })
