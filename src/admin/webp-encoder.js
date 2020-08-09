

const encode = input => {
  let keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let output = "";
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  let i = 0;

  while (i < input.length) {
      chr1 = input[i++];
      chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
      chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
          enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
          enc4 = 64;
      }
      output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
  }
  return output;
}

export default class WebpEncoder {
  constructor() {
    this.size = 960
    this._init()
  }
  
  async _init() {
    await importScript('./third-party/webp/enc/webp_enc.js')
    
    this.module = webp_enc();
  }
  
  get height() {
    return (this.img.height / this.img.width) * this.size
  }
  
  get width() {
    return (this.img.width / this.img.width) * this.size
  }
  
  async load(src) {
    this.img = document.createElement('img');
    this.img.src = src;
    await new Promise(resolve => this.img.onload = resolve);
    // Make canvas same size as image
    const canvas = document.createElement('canvas');
    [canvas.width, canvas.height] = [this.width, this.height];
    // Draw image onto canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
    return ctx.getImageData(0, 0, this.width, this.height);
  }
  
  async encode(src, size, quality = 85) {
    this.size = size
    const image = await this.load(src);
    const result = this.module.encode(image.data, image.width, image.height, {
      quality,
      target_size: 0,
      target_PSNR: 0,
      method: 4,
      sns_strength: 50,
      filter_strength: 60,
      filter_sharpness: 0,
      filter_type: 1,
      partitions: 0,
      segments: 4,
      pass: 1,
      show_compressed: 0,
      preprocessing: 0,
      autofilter: 0,
      partition_limit: 0,
      alpha_compression: 1,
      alpha_filtering: 1,
      alpha_quality: 100,
      lossless: 0,
      exact: 0,
      image_hint: 0,
      emulate_jpeg_size: 0,
      thread_level: 0,
      low_memory: 0,
      near_lossless: 100,
      use_delta_palette: 0,
      use_sharp_yuv: 0,
    });
    console.log('size', result.length);
    // const blob = new Blob([result], {type: 'image/webp'});

    this.module.free_result();

    // const blobURL = URL.createObjectURL(blob);
    // const img = document.createElement('img');
    // img.src = 'data:image/webp;base64,'+encode(bytes)
  
    // return 'data:image/webp;base64,' + encode(new Uint8Array(result))
    return result
    // this.appendChild(img);
  }
}