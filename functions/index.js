const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sharp = require('sharp');
const { promisify } = require('util');
const nodemailer = require('nodemailer');
const atob = require('atob');
const btoa = require('btoa');
const { createReadStream, readFile } = require('fs');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  }
});

const read= promisify(readFile)

class DateMan {
  // connectedCallback() {
  //   if (super.connectedCallback) super.connectedCallback()
  // }
  get months() {
     return  ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
   }

   get days() {
     if (this.lang === 'nl') return ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag']
     return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
   }
  set lang(value) {
    this._lang = value;
  }

  get lang() {
    return this._lang;
  }

  set value(value) {
    this._value = value;
    const date = new Date(Number(value));
    this.day = date.getDay();
    this.date = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  };

  set day(value) {
    this._day = value;
  }

  set month(value) {
    this._month = value;
  }

  set date(value) {
    this._date = value;
  }

  set year(value) {
    this._year = value;
  }

  get day() {
    return this._day;
  }

  get month() {
    return this._month;
  }

  get date() {
    return this._date;
  }

  get year() {
    return this._year;
  }

  next(day) {
    if (typeof day === 'string') day = this.days.indexOf(day);
    const date = new Date(Number(this._value));
    if (day === date.getDay()) {
      this.value = date.setDate(date.getDate() - date.getDay() + 7 + day)
    } else {
      this.value = date.setDate(date.getDate() - date.getDay() + day)
    }

  }

}

const dateMan = new DateMan();
admin.initializeApp();

const THUMB_MAX_WIDTH = 320;
const THUMB_MAX_HEIGHT = 320;

const express = require('express');
const api = express();
const bodyParser = require('body-parser');
const bucket = admin.storage().bucket();
// const imagesRef = storageRef.child('images');
const cors = require('cors');
const download = require('download')
api.use(cors({ origin: '*' }));
api.use(express.json());

/**
 * @param {buffer|string} value
 */
const resizeImage = (key, value, size, quality = 70) => new Promise((resolve, reject) => {
  const file = bucket.file(`images/${key}.png`);
  const uploadStream = file.createWriteStream({gzip: true, public: true});
  uploadStream.on('finish', async () => {
    resolve(`${key}.png`);
  });
  uploadStream.on('error', error => {
    reject(error)
  });
  const pipeline = sharp();
  pipeline.resize(size, size).png({ quality }).pipe(uploadStream);

  //
  const Readable = require('stream').Readable;
  const s = new Readable();
  s._read = () => {}; // redundant? see update below
  s.push(value);
  s.pipe(pipeline);
  s.push(null);
})

const _resizeImage = (key, size, quality = 25, buffer) => {
  const file = bucket.file(`images/${key}.webp`);
  const uploadStream = file.createWriteStream({gzip: true, public: true});
  uploadStream.on('finish', async () => {
    // resolve(`${key}.webp`);
  });
  uploadStream.on('error', error => {
    // reject(error)
  });
  const pipeline = sharp();  
  if (buffer) pipeline.resize(size, size).webp({ quality }).toBuffer();
  else pipeline.resize(size, size).webp({ quality }).pipe(uploadStream);
  return pipeline;
}

const readableStream = value => {
  const Readable = require('stream').Readable;
  const s = new Readable();
  s._read = () => {}; // redundant? see update below
  s.push(value);
  s.push(null)
  return s;
}


const resizeImages = async (images, key, ignore = key => false) => {
  const promises = []
  for (let img of Object.keys(images)) {
    let url;
    // console.log(img);
    if (images[img].indexOf('.png') === -1 && images[img].indexOf('.webp') === -1) {
      if (images[img].indexOf('https://') !== -1) {
        // TODO: support urls or not?
        const buffer = await download(images[img])
        const stream = readableStream(buffer)
        
        if (img !== 'thumb' && img !== 'placeholder') {
          if (Number(img) === 0) stream.pipe(_resizeImage(`${key}-${img}`, 480, 100)).pipe(_resizeImage(`${key}-thumbm`, 240, 100)).pipe(_resizeImage(`${key}-thumb`, 120, 85)).pipe(_resizeImage(`${key}-placeholder`, 5, 25));
          else stream.pipe(_resizeImage(`${key}-${img}`, 480, 100));
          if (Number(img) === 0) {
            promises.push(admin.database().ref(`images/${key}/placeholder`).set(`${key}-placeholder.webp`),
            admin.database().ref(`images/${key}/thumb`).set(`${key}-thumb.webp`),
            admin.database().ref(`images/${key}/thumbm`).set(`${key}-thumbm.webp`))
          }          
          promises.push(admin.database().ref(`images/${key}/${img}`).set(`${key}-${img}.webp`));
        }  
      } else {
        const buffer = Buffer.from(images[img], 'base64');
        const stream = readableStream(buffer)
        if (img !== 'thumb' && img !== 'placeholder') {
          if (Number(img) === 0) stream.pipe(_resizeImage(`${key}-${img}`, 480, 100)).pipe(_resizeImage(`${key}-thumbm`, 240, 100)).pipe(_resizeImage(`${key}-thumb`, 120, 85)).pipe(_resizeImage(`${key}-placeholder`, 5, 25));
          else stream.pipe(_resizeImage(`${key}-${img}`, 480, 100));
          if (Number(img) === 0) {
            promises.push(admin.database().ref(`images/${key}/placeholder`).set(`${key}-placeholder.webp`),
            admin.database().ref(`images/${key}/thumb`).set(`${key}-thumb.webp`),
            admin.database().ref(`images/${key}/thumbm`).set(`${key}-thumbm.webp`))
          }          
          promises.push(admin.database().ref(`images/${key}/${img}`).set(`${key}-${img}.webp`));
        }        
      }
    } else {
      if (img !== 'thumb' && img !== 'placeholder') {
        // await admin.database().ref(`images/${key}/${img}`).set(images[img]);
        const file = bucket.file(`images/${key}-${img}.webp`);
        const stream = file.createReadStream();
        if (Number(img) === 0) stream.pipe(_resizeImage(`${key}-${img}`, 480, 100)).pipe(_resizeImage(`${key}-thumbm`, 240, 100)).pipe(_resizeImage(`${key}-thumb`, 120, 85)).pipe(_resizeImage(`${key}-placeholder`, 5, 25));
        else stream.pipe(_resizeImage(`${key}-${img}`, 480, 100));
        if (Number(img) === 0) {
          await admin.database().ref(`images/${key}/placeholder`).set(`${key}-placeholder.webp`);  
          await admin.database().ref(`images/${key}/thumb`).set(`${key}-thumb.webp`);
          await admin.database().ref(`images/${key}/thumbm`).set(`${key}-thumbm.webp`);
        }
        
        await admin.database().ref(`images/${key}/${img}`).set(`${key}-${img}.webp`);
      }
    }
  }
  return Promise.all(promises);

}

api.post('/image', async (request, response) => {
  if (!request.body.key) response.sendStatus('300', 'item (product, offer, etc) key required')
  await resizeImages(request.body.image, request.body.key);
  response.sendStatus(200);
});

api.delete('/image', async (request, response) => {
  if (!request.body.path) response.sendStatus('300', 'item (product, offer, etc) path required')
  let image = await admin.database().ref(`${request.body.path}`).once('value')
  image = image.val();
  await bucket.file(`images/${image}`).delete()
  await admin.database().ref(`${request.body.path}`).set(null)
  response.sendStatus(200);
});

api.delete('/offer', async (request, response) => {
  if (!request.body.key) response.sendStatus('300', 'item (product, offer, etc) key required')
  let images = await admin.database().ref(`offers/${request.body.key}/image`).once('value');
  let thumb = await admin.database().ref(`offerDisplay/${request.body.key}/thumb`).once('value');
  images = images.val();
  // console.log(images);
  thumb = thumb.val()
  images = {...images, thumb: thumb};
  if (images) {
    for (const imgKey of Object.keys(images)) {
      const url = `images/${images[imgKey]}`;

        console.log(url, imgKey);
      await bucket.file(url.toString()).delete()
    }
  }

  admin.database().ref(`offers/${request.body.key}`).set(null)
  admin.database().ref(`offerDisplay/${request.body.key}`).set(null)
  response.sendStatus(200);
})

const deleteImages = async (key) => {
  let image = await admin.database().ref(`images/${key}`).once('value');
  image = image.val();
  if (image) {
    for (const key of Object.keys(image)) {
      await bucket.file(`images/${image[key]}`).delete();
    }  
  }
  
  await admin.database().ref(`images/${key}`).set(null);
}

api.patch('/offer', async (request, response) => {
  const { name, price, public, key } = request.body;
  console.log(JSON.stringify(request.body.image));
  let images = request.body.image;
  delete request.body.name
  delete request.body.price
  delete request.body.public
  delete request.body.image
  delete request.body.key
  const snap = await admin.database().ref(`offerDisplay/${key}`).set({ name, price, public });
  await admin.database().ref(`offers/${key}`).set(request.body);
  if (images && Object.keys(images).length > 0) await resizeImages(images, key);
  else deleteImages(key)

  response.sendStatus(200);
  // console.log(JSON.stringify(req.body));
});

// api.post('/upload/image', async (request, response) => {})
api.post('/offer', async (request, response) => {
  const { name, price, public } = request.body;
  // console.log(JSON.stringify(request.body));
  let images = request.body.image;
  delete request.body.name
  delete request.body.price
  delete request.body.public
  delete request.body.image
  const snap = await admin.database().ref('offerDisplay').push({ name, price, public });
  await admin.database().ref(`offers/${snap.key}`).set(request.body);
  if (images) await resizeImages(images, snap.key);

  response.sendStatus(200);
  // console.log(JSON.stringify(req.body));
});

api.post('/product', async (request, response) => {
  // console.log(JSON.stringify(request.body));
  let images = request.body.image;
  delete request.body.image
  const snap = await admin.database().ref(`products`).push(request.body);
  await resizeImages(images, snap.key);

  response.sendStatus(200);
  // console.log(JSON.stringify(req.body));
});

api.get('/thumb/:url', (request, response) => {
  const stream = bucket.file(`images/${request.params.url}`).createReadStream();
  // await ()
  stream.pipe(response);
});

api.get('/thumbm/:url', (request, response) => {
  const stream = bucket.file(`images/${request.params.url}`).createReadStream();
  // await ()
  stream.pipe(response);
});
api.get('/image/:url', (request, response) => {
  const stream = bucket.file(`images/${request.params.url}`).createReadStream();
  // await ()
  stream.pipe(response);
});

api.get('/placeholder/:url', (request, response) => {
  const stream = bucket.file(`images/${request.params.url}`).createReadStream();
  // await ()
  stream.pipe(response);
});

exports.api = functions.https.onRequest(api);

exports.sendEmailConfirmation = functions.database.ref('/orders/{userUID}/{orderUID}').onWrite(async (change) => {
  const snapshot = change.after;
  const val = snapshot.val();

  const mailOptions = {
    from: gmailEmail,
    to: val[0].email,
  };

  const ready = val[0].ready;
  dateMan.value = new Date().getTime();
  dateMan.lang = 'nl';
  if (val[0].collectionTime === 'tuesday') dateMan.next('dinsdag')
  else if (val[0].collectionTime === 'friday') dateMan.next('vrijdag')
  // Building Email message.
  mailOptions.subject = `Bestelling ${snapshot.key} ${ready ? 'klaar' : 'ontvangen'}!`;
  mailOptions.text = `Bestelling ${ready ? ` ${snapshot.key} is klaar voor afhaling` : 'ontvangen,\nwij maken deze klaar voor afhaling'} op ${dateMan.days[dateMan.day]} ${dateMan.date}/${dateMan.month}`

  try {
    await mailTransport.sendMail(mailOptions);
    console.log(`Bestelling ${ready ? 'klaar' : 'ontvangen'} email sent to:`, val.email);
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
  return null;
});
