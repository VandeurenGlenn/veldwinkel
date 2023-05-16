// const initialSetup = async (strap, address) => {
//   strap.push(address)
//   await ipfs.config.set('Bootstrap', strap)
//   await ipfs.swarm.connect(address)
// }

// export default async (address = '/dns4/star.leofcoin.org/tcp/4003/wss/p2p/QmfShD2oP9b51eGPCNPHH3XC8K28VLXtgcR7fhpqJxNzH4') => {
//   if (!globalThis.ipfs) {
//     await import('https://cdn.jsdelivr.net/npm/ipfs@0.48.1/dist/index.min.js')
//     globalThis.ipfs = await Ipfs.create()
//   }
//   const strap = await ipfs.config.get('Bootstrap')
//   if (strap.indexOf(address) === -1) await initialSetup(strap, address)
// }