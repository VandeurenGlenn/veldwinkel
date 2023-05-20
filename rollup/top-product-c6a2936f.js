import { d as define, E as ElementBase$1 } from './shell-6ca0d34f.js';
import require$$0 from 'path';
import require$$0$3 from 'fs';
import require$$0$2 from 'http';
import require$$1$1 from 'https';
import require$$2 from 'zlib';
import require$$0$1 from 'stream';
import require$$5 from 'util';
import require$$7 from 'crypto';
import require$$8 from 'url';

customElements.define('shop-admin-action-bar', class ShopAdminActionBar extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: row;
        height: 72px;
        box-sizing: border-box;
        padding: 24px;
        width: 100%;
        max-width: 640px;
      }
      .flex {
        flex: 1;
      }
    </style>
    
    <custom-svg-icon icon="delete"></custom-svg-icon>
    <span class="flex"></span>
    <custom-svg-icon icon="public"></custom-svg-icon>
    `
  }
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
				var args = [null];
				args.push.apply(args, arguments);
				var Ctor = Function.bind.apply(f, args);
				return new Ctor();
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

const ALBUM = {
  BASE_PATH: 'v1/albums',
  ENRICHMENTS: {
    TEXT: 'text',
    LOCATION: 'location',
    MAP: 'map',
  },
  POSITION_TYPE: {
    POSITION_TYPE_UNSPECIFIED: 'POSITION_TYPE_UNSPECIFIED',
    FIRST_IN_ALBUM: 'FIRST_IN_ALBUM',
    LAST_IN_ALBUM: 'LAST_IN_ALBUM',
    AFTER_MEDIA_ITEM: 'AFTER_MEDIA_ITEM',
    AFTER_ENRICHMENT_ITEM: 'AFTER_ENRICHMENT_ITEM',
  },
};

var album$1 = ALBUM;

let SharedAlbumOptions$1 = class SharedAlbumOptions {
  constructor(isCollaborative, isCommentable) {
    this.isCollaborative = isCollaborative;
    this.isCommentable = isCommentable;
  }

  toJson() {
    return {
      isCollaborative: this.isCollaborative,
      isCommentable: this.isCommentable,
    };
  }
};

var shared_album_options = SharedAlbumOptions$1;

const constants$6 = album$1;

let Enrichment$4 = class Enrichment {
  constructor() {
    if (this.constructor.name === 'Enrichment') {
      throw Error('Create either a text, location or map enrichment.');
    }
  }

  getJSON() {
    let key;
    if (this.type === constants$6.ENRICHMENTS.TEXT) {
      key = 'textEnrichment';
    } else if (this.type === constants$6.ENRICHMENTS.LOCATION) {
      key = 'locationEnrichment';
    } else if (this.type === constants$6.ENRICHMENTS.MAP) {
      key = 'mapEnrichment';
    }
    return {
      [key]: this.getEnrichmentJson(),
    };
  }
};

var enrichment = Enrichment$4;

const {POSITION_TYPE} = album$1;

let AlbumPosition$2 = class AlbumPosition {
  constructor(position) {
    this.position = position;
  }

  setRelativeItemId(itemId) {
    if (
      this.position === POSITION_TYPE.AFTER_ENRICHMENT_ITEM ||
      this.position === POSITION_TYPE.AFTER_MEDIA_ITEM
    ) {
      this.relativeItemId = itemId;
    } else {
      throw Error('Cannot set relative item for this type');
    }
  }

  getJson() {
    const albumPosition = {
      position: this.position,
    };
    if (this.position === POSITION_TYPE.AFTER_ENRICHMENT_ITEM) {
      albumPosition.relativeEnrichmentItemId = this.itemId;
    } else if (this.position === POSITION_TYPE.AFTER_MEDIA_ITEM) {
      albumPosition.relativeMediaItemId = this.itemId;
    }
    return albumPosition;
  }
};

AlbumPosition$2.POSITIONS = POSITION_TYPE;

var album_position = AlbumPosition$2;

let Album$1 = class Album {
  setId(id) {
    this.id = id;
    return this;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setProductUrl(productUrl) {
    this.productUrl = productUrl;
    return this;
  }

  setIsWriteable(isWriteable) {
    this.isWriteable = isWriteable;
    return this;
  }

  setTotalMediaItems(totalMediaItems) {
    this.totalMediaItems = totalMediaItems;
    return this;
  }

  setCoverPhotoBaseUrl(coverPhotoBaseUrl) {
    this.coverPhotoBaseUrl = coverPhotoBaseUrl;
    return this;
  }

  setShareInfo(shareInfo) {
    this.shareInfo = shareInfo;
    return this;
  }

  static albumForCreation(title) {
    return new Album().setTitle(title);
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
      isWriteable: this.isWriteable,
      coverPhotoBaseUrl: this.coverPhotoBaseUrl,
      totalMediaItems: this.totalMediaItems,
      productUrl: this.productUrl,
      shareInfo: this.shareInfo,
    };
  }
};

var album = Album$1;

const constants$5 = album$1;
const SharedAlbumOptions = shared_album_options;
const Enrichment$3 = enrichment;
const AlbumPosition$1 = album_position;
const Album = album;

let Albums$1 = class Albums {
  constructor(transport) {
    this.transport = transport;
  }

  list(pageSize = 50, pageToken) {
    const params = {pageSize};
    if (pageToken) {
      params.pageToken = pageToken;
    }
    return this.transport.get(constants$5.BASE_PATH, params);
  }

  get(albumId) {
    return this.transport.get(`${constants$5.BASE_PATH}/${albumId}`);
  }

  create(title) {
    const album = Album.albumForCreation(title);
    return this.transport.post(constants$5.BASE_PATH, {
      album: album.toJson(),
    });
  }

  share(albumId, isCollaborative, isCommentable) {
    const shareOptions = {
      sharedAlbumOptions: new SharedAlbumOptions(isCollaborative, isCommentable).toJson(),
    };
    return this.transport.post(`${constants$5.BASE_PATH}/${albumId}:share`, shareOptions);
  }

  unshare(albumId) {
    return this.transport.post(`${constants$5.BASE_PATH}/${albumId}:unshare`);
  }

  addEnrichment(albumId, enrichmentItem, albumPosition) {
    const params = {};
    const enrichmentJson =
      enrichmentItem instanceof Enrichment$3 ? enrichmentItem.getJSON() : enrichmentItem;
    const positionJson =
      albumPosition instanceof AlbumPosition$1 ? albumPosition.getJson() : albumPosition;
    if (enrichmentItem) {
      params.newEnrichmentItem = enrichmentJson;
    }
    if (albumPosition) {
      params.albumPosition = positionJson;
    }
    return this.transport.post(`${constants$5.BASE_PATH}/${albumId}:addEnrichment`, params);
  }

  batchAddMediaItems(albumId, mediaItemIds) {
    if (!mediaItemIds || mediaItemIds.length <= 0) {
      throw Error('mediaItems must be passed');
    }
    const params = {
      mediaItemIds,
    };
    return this.transport.post(`${constants$5.BASE_PATH}/${albumId}:batchAddMediaItems`, params);
  }

  batchRemoveMediaItems(albumId, mediaItemIds) {
    if (!mediaItemIds || mediaItemIds.length <= 0) {
      throw Error('mediaItems must be passed');
    }
    const params = {
      mediaItemIds,
    };
    return this.transport.post(`${constants$5.BASE_PATH}/${albumId}:batchRemoveMediaItems`, params);
  }
};

var albums = Albums$1;

const SHARED_ALBUMS = {
  BASE_PATH: 'v1/sharedAlbums',
};

var shared_albums$1 = SHARED_ALBUMS;

const constants$4 = shared_albums$1;

let SharedAlbums$1 = class SharedAlbums {
  constructor(transport) {
    this.transport = transport;
  }

  get(shareToken) {
    return this.transport.get(`${constants$4.BASE_PATH}/${shareToken}`);
  }

  join(shareToken) {
    return this.transport.post(`${constants$4.BASE_PATH}:join`, {shareToken});
  }

  leave(shareToken) {
    return this.transport.post(`${constants$4.BASE_PATH}:leave`, {shareToken});
  }

  list(pageSize = 50, pageToken) {
    return this.transport.get(constants$4.BASE_PATH, {pageSize, pageToken});
  }
};

var shared_albums = SharedAlbums$1;

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject$1(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * _.chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * _.chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk$1(array, size, guard) {
  if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
    size = 1;
  } else {
    size = nativeMax(toInteger(size), 0);
  }
  var length = array ? array.length : 0;
  if (!length || size < 1) {
    return [];
  }
  var index = 0,
      resIndex = 0,
      result = Array(nativeCeil(length / size));

  while (index < length) {
    result[resIndex++] = baseSlice(array, index, (index += size));
  }
  return result;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject$1(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_chunk = chunk$1;

const MEDIA_ITEMS = {
  BASE_PATH: 'v1/mediaItems',
  VIDEO_PROCESSING_STATUS: {
    UNSPECIFIED: 'UNSPECIFIED',
    PROCESSING: 'PROCESSING',
    READY: 'READY',
    FAILED: 'FAILED',
  },
  CONTENT_CATEGORY: {
    NONE: 'NONE',
    LANDSCAPES: 'LANDSCAPES',
    RECEIPTS: 'RECEIPTS',
    CITYSCAPES: 'CITYSCAPES',
    LANDMARKS: 'LANDMARKS',
    SELFIES: 'SELFIES',
    PEOPLE: 'PEOPLE',
    PETS: 'PETS',
    WEDDINGS: 'WEDDINGS',
    BIRTHDAYS: 'BIRTHDAYS',
    DOCUMENTS: 'DOCUMENTS',
    TRAVEL: 'TRAVEL',
    ANIMALS: 'ANIMALS',
    FOOD: 'FOOD',
    SPORT: 'SPORT',
    NIGHT: 'NIGHT',
    PERFORMANCES: 'PERFORMANCES',
    WHITEBOARDS: 'WHITEBOARDS',
    SCREENSHOTS: 'SCREENSHOTS',
    UTILITY: 'UTILITY',
  },
  MEDIA_TYPE: {
    ALL_MEDIA: 'ALL_MEDIA',
    PHOTO: 'PHOTO',
    VIDEO: 'VIDEO',
  },
};

var media_items$1 = MEDIA_ITEMS;

const path = require$$0;
const chunk = lodash_chunk;
const constants$3 = media_items$1;

let MediaItems$1 = class MediaItems {
  constructor(transport) {
    this.transport = transport;
  }

  list(pageSize = 50, pageToken) {
    const params = {pageSize};
    if (pageToken) {
      params.pageToken = pageToken;
    }
    return this.transport.get(constants$3.BASE_PATH, params);
  }

  get(mediaItemId) {
    return this.transport.get(`${constants$3.BASE_PATH}/${mediaItemId}`);
  }

  batchGet(mediaItemIds) {
    return this.transport.get(`${constants$3.BASE_PATH}/:batchGet`, mediaItemIds.map(el => { return ['mediaItemIds', el] }));
  }

  async upload(
    albumId,
    fileName,
    filePath,
    description,
    requestTimeout = 10000
  ) {
    const url = `${constants$3.BASE_PATH}/:batchCreate`;
    const token = await this.transport.upload(
      fileName, filePath, requestTimeout);

    return this.transport.post(url, {
      albumId: albumId || '',
      newMediaItems: [
        {
          description: description || '',
          simpleMediaItem: {
            uploadToken: token,
          },
        },
      ],
    });
  }

  async uploadMultiple(
    albumId,
    files,
    directoryPath,
    requestDelay = 10000,
    requestTimeout = 10000
  ) {
    const url = `${constants$3.BASE_PATH}/:batchCreate`;
    const batchedFiles = chunk(files, 50);
    // eslint-disable-next-line
    for (const batch of batchedFiles) {
      // eslint-disable-next-line
      const newMediaItems = await Promise.all(
        batch.map(async (file) => {
          const token = await this.transport.upload(
            file.name, path.join(directoryPath, file.name), requestTimeout);

          return {
            description: file.description || '',
            simpleMediaItem: {
              uploadToken: token,
            },
          };
        })
      );
      this.transport.post(url, {
        albumId: albumId || '',
        newMediaItems,
      });
      // google upload token generation seems to cap at ~500 requests per minute, this is a configurable workaround
      // eslint-disable-next-line
      await new Promise((resolve) => setTimeout(resolve, requestDelay));
    }
  }

  search(albumIdOrFilters, pageSize = 50, pageToken) {
    const postBody = {pageSize, pageToken};
    if (typeof albumIdOrFilters === 'string' || albumIdOrFilters instanceof String) {
      postBody.albumId = albumIdOrFilters;
    } else {
      postBody.filters = albumIdOrFilters.toJSON();
    }
    return this.transport.post(`${constants$3.BASE_PATH}:search`, postBody);
  }
};

var media_items = MediaItems$1;

const constants$2 = album$1;
const Enrichment$2 = enrichment;

let TextEnrichment$1 = class TextEnrichment extends Enrichment$2 {
  constructor(content) {
    super();
    this.type = constants$2.ENRICHMENTS.TEXT;

    this.content = content;
  }

  setContent(content) {
    this.content = content;
  }

  getEnrichmentJson() {
    return {
      text: this.content,
    };
  }
};

var text_enrichment = TextEnrichment$1;

let Location$3 = class Location {
  constructor(locationName, latitude, longitude) {
    this.locationName = locationName;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  setLocation(locationName, latitude, longitude) {
    this.locationName = locationName;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getLocation() {
    return {
      locationName: this.locationName,
      latlng: {
        latitude: this.latitude,
        longitude: this.longitude,
      },
    };
  }
};

var location = Location$3;

const constants$1 = album$1;
const Location$2 = location;
const Enrichment$1 = enrichment;

let MapEnrichment$1 = class MapEnrichment extends Enrichment$1 {
  constructor(origin, destination) {
    super();
    this.type = constants$1.ENRICHMENTS.MAP;

    if (!(origin instanceof Location$2) || !(destination instanceof Location$2)) {
      throw Error('origin and destination are not location');
    }

    this.origin = origin;
    this.destination = destination;
  }

  setContent(origin, destination) {
    this.origin = origin;
    this.destination = destination;
  }

  setOrigin(locationName, latitude, longitude) {
    this.origin = new Location$2(locationName, latitude, longitude);
    return this;
  }

  setDestination(locationName, latitude, longitude) {
    this.destination = new Location$2(locationName, latitude, longitude);
    return this;
  }

  getEnrichmentJson() {
    const originJson = this.origin && this.origin.getLocation ? this.origin.getLocation() : {};
    const destinationJson =
      this.destination && this.destination.getLocation ? this.destination.getLocation() : {};
    return {
      origin: originJson,
      destination: destinationJson,
    };
  }
};

var map_enrichment = MapEnrichment$1;

const constants = album$1;
const Location$1 = location;
const Enrichment = enrichment;

let LocationEnrichment$1 = class LocationEnrichment extends Enrichment {
  constructor(locationName, latitude, longitude) {
    super();
    this.type = constants.ENRICHMENTS.LOCATION;

    this.location = new Location$1(locationName, latitude, longitude);
  }

  setContent(locationName, latitude, longitude) {
    this.location.setLocation(locationName, latitude, longitude);
  }

  getEnrichmentJson() {
    return {
      location: this.location.getLocation(),
    };
  }
};

var location_enrichment = LocationEnrichment$1;

const API = {
  HOST: 'https://photoslibrary.googleapis.com/',
};

var api = API;

var dist = {exports: {}};

/**
 * Returns a `Buffer` instance from the given data URI `uri`.
 *
 * @param {String} uri Data URI to turn into a Buffer instance
 * @return {Buffer} Buffer instance from Data URI
 * @api public
 */
function dataUriToBuffer(uri) {
    if (!/^data:/i.test(uri)) {
        throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
    }
    // strip newlines
    uri = uri.replace(/\r?\n/g, '');
    // split the URI up into the "metadata" and the "data" portions
    const firstComma = uri.indexOf(',');
    if (firstComma === -1 || firstComma <= 4) {
        throw new TypeError('malformed data: URI');
    }
    // remove the "data:" scheme and parse the metadata
    const meta = uri.substring(5, firstComma).split(';');
    let charset = '';
    let base64 = false;
    const type = meta[0] || 'text/plain';
    let typeFull = type;
    for (let i = 1; i < meta.length; i++) {
        if (meta[i] === 'base64') {
            base64 = true;
        }
        else {
            typeFull += `;${meta[i]}`;
            if (meta[i].indexOf('charset=') === 0) {
                charset = meta[i].substring(8);
            }
        }
    }
    // defaults to US-ASCII only if type is not provided
    if (!meta[0] && !charset.length) {
        typeFull += ';charset=US-ASCII';
        charset = 'US-ASCII';
    }
    // get the encoded data portion and decode URI-encoded chars
    const encoding = base64 ? 'base64' : 'ascii';
    const data = unescape(uri.substring(firstComma + 1));
    const buffer = Buffer.from(data, encoding);
    // set `.type` and `.typeFull` properties to MIME type
    buffer.type = type;
    buffer.typeFull = typeFull;
    // set the `.charset` property
    buffer.charset = charset;
    return buffer;
}
var src = dataUriToBuffer;

const {Readable} = require$$0$1;

/**
 * @type {WeakMap<Blob, {type: string, size: number, parts: (Blob | Buffer)[] }>}
 */
const wm = new WeakMap();

async function * read(parts) {
	for (const part of parts) {
		if ('stream' in part) {
			yield * part.stream();
		} else {
			yield part;
		}
	}
}

class Blob {
	/**
	 * The Blob() constructor returns a new Blob object. The content
	 * of the blob consists of the concatenation of the values given
	 * in the parameter array.
	 *
	 * @param {(ArrayBufferLike | ArrayBufferView | Blob | Buffer | string)[]} blobParts
	 * @param {{ type?: string }} [options]
	 */
	constructor(blobParts = [], options = {}) {
		let size = 0;

		const parts = blobParts.map(element => {
			let buffer;
			if (element instanceof Buffer) {
				buffer = element;
			} else if (ArrayBuffer.isView(element)) {
				buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
			} else if (element instanceof ArrayBuffer) {
				buffer = Buffer.from(element);
			} else if (element instanceof Blob) {
				buffer = element;
			} else {
				buffer = Buffer.from(typeof element === 'string' ? element : String(element));
			}

			// eslint-disable-next-line unicorn/explicit-length-check
			size += buffer.length || buffer.size || 0;
			return buffer;
		});

		const type = options.type === undefined ? '' : String(options.type).toLowerCase();

		wm.set(this, {
			type: /[^\u0020-\u007E]/.test(type) ? '' : type,
			size,
			parts
		});
	}

	/**
	 * The Blob interface's size property returns the
	 * size of the Blob in bytes.
	 */
	get size() {
		return wm.get(this).size;
	}

	/**
	 * The type property of a Blob object returns the MIME type of the file.
	 */
	get type() {
		return wm.get(this).type;
	}

	/**
	 * The text() method in the Blob interface returns a Promise
	 * that resolves with a string containing the contents of
	 * the blob, interpreted as UTF-8.
	 *
	 * @return {Promise<string>}
	 */
	async text() {
		return Buffer.from(await this.arrayBuffer()).toString();
	}

	/**
	 * The arrayBuffer() method in the Blob interface returns a
	 * Promise that resolves with the contents of the blob as
	 * binary data contained in an ArrayBuffer.
	 *
	 * @return {Promise<ArrayBuffer>}
	 */
	async arrayBuffer() {
		const data = new Uint8Array(this.size);
		let offset = 0;
		for await (const chunk of this.stream()) {
			data.set(chunk, offset);
			offset += chunk.length;
		}

		return data.buffer;
	}

	/**
	 * The Blob interface's stream() method is difference from native
	 * and uses node streams instead of whatwg streams.
	 *
	 * @returns {Readable} Node readable stream
	 */
	stream() {
		return Readable.from(read(wm.get(this).parts));
	}

	/**
	 * The Blob interface's slice() method creates and returns a
	 * new Blob object which contains data from a subset of the
	 * blob on which it's called.
	 *
	 * @param {number} [start]
	 * @param {number} [end]
	 * @param {string} [type]
	 */
	slice(start = 0, end = this.size, type = '') {
		const {size} = this;

		let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
		let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);

		const span = Math.max(relativeEnd - relativeStart, 0);
		const parts = wm.get(this).parts.values();
		const blobParts = [];
		let added = 0;

		for (const part of parts) {
			const size = ArrayBuffer.isView(part) ? part.byteLength : part.size;
			if (relativeStart && size <= relativeStart) {
				// Skip the beginning and change the relative
				// start & end position as we skip the unwanted parts
				relativeStart -= size;
				relativeEnd -= size;
			} else {
				const chunk = part.slice(relativeStart, Math.min(size, relativeEnd));
				blobParts.push(chunk);
				added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
				relativeStart = 0; // All next sequental parts should start at 0

				// don't add the overflow to new blobParts
				if (added >= span) {
					break;
				}
			}
		}

		const blob = new Blob([], {type: String(type).toLowerCase()});
		Object.assign(wm.get(blob), {size: span, parts: blobParts});

		return blob;
	}

	get [Symbol.toStringTag]() {
		return 'Blob';
	}

	static [Symbol.hasInstance](object) {
		return (
			object &&
			typeof object === 'object' &&
			typeof object.stream === 'function' &&
			object.stream.length === 0 &&
			typeof object.constructor === 'function' &&
			/^(Blob|File)$/.test(object[Symbol.toStringTag])
		);
	}
}

Object.defineProperties(Blob.prototype, {
	size: {enumerable: true},
	type: {enumerable: true},
	slice: {enumerable: true}
});

var fetchBlob = Blob;

(function (module, exports) {

	exports = module.exports = fetch;

	const http = require$$0$2;
	const https = require$$1$1;
	const zlib = require$$2;
	const Stream = require$$0$1;
	const dataUriToBuffer = src;
	const util = require$$5;
	const Blob = fetchBlob;
	const crypto = require$$7;
	const url = require$$8;

	class FetchBaseError extends Error {
		constructor(message, type) {
			super(message);
			// Hide custom error implementation details from end-users
			Error.captureStackTrace(this, this.constructor);

			this.type = type;
		}

		get name() {
			return this.constructor.name;
		}

		get [Symbol.toStringTag]() {
			return this.constructor.name;
		}
	}

	/**
	 * @typedef {{ address?: string, code: string, dest?: string, errno: number, info?: object, message: string, path?: string, port?: number, syscall: string}} SystemError
	*/

	/**
	 * FetchError interface for operational errors
	 */
	class FetchError extends FetchBaseError {
		/**
		 * @param  {string} message -      Error message for human
		 * @param  {string} [type] -        Error type for machine
		 * @param  {SystemError} [systemError] - For Node.js system error
		 */
		constructor(message, type, systemError) {
			super(message, type);
			// When err.type is `system`, err.erroredSysCall contains system error and err.code contains system error code
			if (systemError) {
				// eslint-disable-next-line no-multi-assign
				this.code = this.errno = systemError.code;
				this.erroredSysCall = systemError.syscall;
			}
		}
	}

	/**
	 * Is.js
	 *
	 * Object type checks.
	 */

	const NAME = Symbol.toStringTag;

	/**
	 * Check if `obj` is a URLSearchParams object
	 * ref: https://github.com/node-fetch/node-fetch/issues/296#issuecomment-307598143
	 *
	 * @param  {*} obj
	 * @return {boolean}
	 */
	const isURLSearchParameters = object => {
		return (
			typeof object === 'object' &&
			typeof object.append === 'function' &&
			typeof object.delete === 'function' &&
			typeof object.get === 'function' &&
			typeof object.getAll === 'function' &&
			typeof object.has === 'function' &&
			typeof object.set === 'function' &&
			typeof object.sort === 'function' &&
			object[NAME] === 'URLSearchParams'
		);
	};

	/**
	 * Check if `object` is a W3C `Blob` object (which `File` inherits from)
	 *
	 * @param  {*} obj
	 * @return {boolean}
	 */
	const isBlob = object => {
		return (
			typeof object === 'object' &&
			typeof object.arrayBuffer === 'function' &&
			typeof object.type === 'string' &&
			typeof object.stream === 'function' &&
			typeof object.constructor === 'function' &&
			/^(Blob|File)$/.test(object[NAME])
		);
	};

	/**
	 * Check if `obj` is a spec-compliant `FormData` object
	 *
	 * @param {*} object
	 * @return {boolean}
	 */
	function isFormData(object) {
		return (
			typeof object === 'object' &&
			typeof object.append === 'function' &&
			typeof object.set === 'function' &&
			typeof object.get === 'function' &&
			typeof object.getAll === 'function' &&
			typeof object.delete === 'function' &&
			typeof object.keys === 'function' &&
			typeof object.values === 'function' &&
			typeof object.entries === 'function' &&
			typeof object.constructor === 'function' &&
			object[NAME] === 'FormData'
		);
	}

	/**
	 * Check if `obj` is an instance of AbortSignal.
	 *
	 * @param  {*} obj
	 * @return {boolean}
	 */
	const isAbortSignal = object => {
		return (
			typeof object === 'object' &&
			object[NAME] === 'AbortSignal'
		);
	};

	const carriage = '\r\n';
	const dashes = '-'.repeat(2);
	const carriageLength = Buffer.byteLength(carriage);

	/**
	 * @param {string} boundary
	 */
	const getFooter = boundary => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;

	/**
	 * @param {string} boundary
	 * @param {string} name
	 * @param {*} field
	 *
	 * @return {string}
	 */
	function getHeader(boundary, name, field) {
		let header = '';

		header += `${dashes}${boundary}${carriage}`;
		header += `Content-Disposition: form-data; name="${name}"`;

		if (isBlob(field)) {
			header += `; filename="${field.name}"${carriage}`;
			header += `Content-Type: ${field.type || 'application/octet-stream'}`;
		}

		return `${header}${carriage.repeat(2)}`;
	}

	/**
	 * @return {string}
	 */
	const getBoundary = () => crypto.randomBytes(8).toString('hex');

	/**
	 * @param {FormData} form
	 * @param {string} boundary
	 */
	async function * formDataIterator(form, boundary) {
		for (const [name, value] of form) {
			yield getHeader(boundary, name, value);

			if (isBlob(value)) {
				yield * value.stream();
			} else {
				yield value;
			}

			yield carriage;
		}

		yield getFooter(boundary);
	}

	/**
	 * @param {FormData} form
	 * @param {string} boundary
	 */
	function getFormDataLength(form, boundary) {
		let length = 0;

		for (const [name, value] of form) {
			length += Buffer.byteLength(getHeader(boundary, name, value));

			if (isBlob(value)) {
				length += value.size;
			} else {
				length += Buffer.byteLength(String(value));
			}

			length += carriageLength;
		}

		length += Buffer.byteLength(getFooter(boundary));

		return length;
	}

	const INTERNALS = Symbol('Body internals');

	/**
	 * Body mixin
	 *
	 * Ref: https://fetch.spec.whatwg.org/#body
	 *
	 * @param   Stream  body  Readable stream
	 * @param   Object  opts  Response options
	 * @return  Void
	 */
	class Body {
		constructor(body, {
			size = 0
		} = {}) {
			let boundary = null;

			if (body === null) {
				// Body is undefined or null
				body = null;
			} else if (isURLSearchParameters(body)) {
			// Body is a URLSearchParams
				body = Buffer.from(body.toString());
			} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (util.types.isAnyArrayBuffer(body)) {
				// Body is ArrayBuffer
				body = Buffer.from(body);
			} else if (ArrayBuffer.isView(body)) {
				// Body is ArrayBufferView
				body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
			} else if (body instanceof Stream) ; else if (isFormData(body)) {
				// Body is an instance of formdata-node
				boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
				body = Stream.Readable.from(formDataIterator(body, boundary));
			} else {
				// None of the above
				// coerce to string then buffer
				body = Buffer.from(String(body));
			}

			this[INTERNALS] = {
				body,
				boundary,
				disturbed: false,
				error: null
			};
			this.size = size;

			if (body instanceof Stream) {
				body.on('error', err => {
					const error = err instanceof FetchBaseError ?
						err :
						new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, 'system', err);
					this[INTERNALS].error = error;
				});
			}
		}

		get body() {
			return this[INTERNALS].body;
		}

		get bodyUsed() {
			return this[INTERNALS].disturbed;
		}

		/**
		 * Decode response as ArrayBuffer
		 *
		 * @return  Promise
		 */
		async arrayBuffer() {
			const {buffer, byteOffset, byteLength} = await consumeBody(this);
			return buffer.slice(byteOffset, byteOffset + byteLength);
		}

		/**
		 * Return raw response as Blob
		 *
		 * @return Promise
		 */
		async blob() {
			const ct = (this.headers && this.headers.get('content-type')) || (this[INTERNALS].body && this[INTERNALS].body.type) || '';
			const buf = await this.buffer();

			return new Blob([buf], {
				type: ct
			});
		}

		/**
		 * Decode response as json
		 *
		 * @return  Promise
		 */
		async json() {
			const buffer = await consumeBody(this);
			return JSON.parse(buffer.toString());
		}

		/**
		 * Decode response as text
		 *
		 * @return  Promise
		 */
		async text() {
			const buffer = await consumeBody(this);
			return buffer.toString();
		}

		/**
		 * Decode response as buffer (non-spec api)
		 *
		 * @return  Promise
		 */
		buffer() {
			return consumeBody(this);
		}
	}

	// In browsers, all properties are enumerable.
	Object.defineProperties(Body.prototype, {
		body: {enumerable: true},
		bodyUsed: {enumerable: true},
		arrayBuffer: {enumerable: true},
		blob: {enumerable: true},
		json: {enumerable: true},
		text: {enumerable: true}
	});

	/**
	 * Consume and convert an entire Body to a Buffer.
	 *
	 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
	 *
	 * @return Promise
	 */
	async function consumeBody(data) {
		if (data[INTERNALS].disturbed) {
			throw new TypeError(`body used already for: ${data.url}`);
		}

		data[INTERNALS].disturbed = true;

		if (data[INTERNALS].error) {
			throw data[INTERNALS].error;
		}

		let {body} = data;

		// Body is null
		if (body === null) {
			return Buffer.alloc(0);
		}

		// Body is blob
		if (isBlob(body)) {
			body = body.stream();
		}

		// Body is buffer
		if (Buffer.isBuffer(body)) {
			return body;
		}

		/* c8 ignore next 3 */
		if (!(body instanceof Stream)) {
			return Buffer.alloc(0);
		}

		// Body is stream
		// get ready to actually consume the body
		const accum = [];
		let accumBytes = 0;

		try {
			for await (const chunk of body) {
				if (data.size > 0 && accumBytes + chunk.length > data.size) {
					const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, 'max-size');
					body.destroy(err);
					throw err;
				}

				accumBytes += chunk.length;
				accum.push(chunk);
			}
		} catch (error) {
			if (error instanceof FetchBaseError) {
				throw error;
			} else {
				// Other errors, such as incorrect content-encoding
				throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, 'system', error);
			}
		}

		if (body.readableEnded === true || body._readableState.ended === true) {
			try {
				if (accum.every(c => typeof c === 'string')) {
					return Buffer.from(accum.join(''));
				}

				return Buffer.concat(accum, accumBytes);
			} catch (error) {
				throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, 'system', error);
			}
		} else {
			throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
		}
	}

	/**
	 * Clone body given Res/Req instance
	 *
	 * @param   Mixed   instance       Response or Request instance
	 * @param   String  highWaterMark  highWaterMark for both PassThrough body streams
	 * @return  Mixed
	 */
	const clone = (instance, highWaterMark) => {
		let p1;
		let p2;
		let {body} = instance;

		// Don't allow cloning a used body
		if (instance.bodyUsed) {
			throw new Error('cannot clone body after it is used');
		}

		// Check that body is a stream and not form-data object
		// note: we can't clone the form-data object without having it as a dependency
		if ((body instanceof Stream) && (typeof body.getBoundary !== 'function')) {
			// Tee instance body
			p1 = new Stream.PassThrough({highWaterMark});
			p2 = new Stream.PassThrough({highWaterMark});
			body.pipe(p1);
			body.pipe(p2);
			// Set instance body to teed body and return the other teed body
			instance[INTERNALS].body = p1;
			body = p2;
		}

		return body;
	};

	/**
	 * Performs the operation "extract a `Content-Type` value from |object|" as
	 * specified in the specification:
	 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
	 *
	 * This function assumes that instance.body is present.
	 *
	 * @param {any} body Any options.body input
	 * @returns {string | null}
	 */
	const extractContentType = (body, request) => {
		// Body is null or undefined
		if (body === null) {
			return null;
		}

		// Body is string
		if (typeof body === 'string') {
			return 'text/plain;charset=UTF-8';
		}

		// Body is a URLSearchParams
		if (isURLSearchParameters(body)) {
			return 'application/x-www-form-urlencoded;charset=UTF-8';
		}

		// Body is blob
		if (isBlob(body)) {
			return body.type || null;
		}

		// Body is a Buffer (Buffer, ArrayBuffer or ArrayBufferView)
		if (Buffer.isBuffer(body) || util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
			return null;
		}

		// Detect form data input from form-data module
		if (body && typeof body.getBoundary === 'function') {
			return `multipart/form-data;boundary=${body.getBoundary()}`;
		}

		if (isFormData(body)) {
			return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
		}

		// Body is stream - can't really do much about this
		if (body instanceof Stream) {
			return null;
		}

		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	};

	/**
	 * The Fetch Standard treats this as if "total bytes" is a property on the body.
	 * For us, we have to explicitly get it with a function.
	 *
	 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
	 *
	 * @param {any} obj.body Body object from the Body instance.
	 * @returns {number | null}
	 */
	const getTotalBytes = request => {
		const {body} = request;

		// Body is null or undefined
		if (body === null) {
			return 0;
		}

		// Body is Blob
		if (isBlob(body)) {
			return body.size;
		}

		// Body is Buffer
		if (Buffer.isBuffer(body)) {
			return body.length;
		}

		// Detect form data input from form-data module
		if (body && typeof body.getLengthSync === 'function') {
			return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
		}

		// Body is a spec-compliant form-data
		if (isFormData(body)) {
			return getFormDataLength(request[INTERNALS].boundary);
		}

		// Body is stream
		return null;
	};

	/**
	 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
	 *
	 * @param {Stream.Writable} dest The stream to write to.
	 * @param obj.body Body object from the Body instance.
	 * @returns {void}
	 */
	const writeToStream = (dest, {body}) => {
		if (body === null) {
			// Body is null
			dest.end();
		} else if (isBlob(body)) {
			// Body is Blob
			body.stream().pipe(dest);
		} else if (Buffer.isBuffer(body)) {
			// Body is buffer
			dest.write(body);
			dest.end();
		} else {
			// Body is stream
			body.pipe(dest);
		}
	};

	/**
	 * Headers.js
	 *
	 * Headers class offers convenient helpers
	 */

	const validateHeaderName = typeof http.validateHeaderName === 'function' ?
		http.validateHeaderName :
		name => {
			if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
				const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
				Object.defineProperty(err, 'code', {value: 'ERR_INVALID_HTTP_TOKEN'});
				throw err;
			}
		};

	const validateHeaderValue = typeof http.validateHeaderValue === 'function' ?
		http.validateHeaderValue :
		(name, value) => {
			if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
				const err = new TypeError(`Invalid character in header content ["${name}"]`);
				Object.defineProperty(err, 'code', {value: 'ERR_INVALID_CHAR'});
				throw err;
			}
		};

	/**
	 * @typedef {Headers | Record<string, string> | Iterable<readonly [string, string]> | Iterable<Iterable<string>>} HeadersInit
	 */

	/**
	 * This Fetch API interface allows you to perform various actions on HTTP request and response headers.
	 * These actions include retrieving, setting, adding to, and removing.
	 * A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.
	 * You can add to this using methods like append() (see Examples.)
	 * In all methods of this interface, header names are matched by case-insensitive byte sequence.
	 *
	 */
	class Headers extends URLSearchParams {
		/**
		 * Headers class
		 *
		 * @constructor
		 * @param {HeadersInit} [init] - Response headers
		 */
		constructor(init) {
			// Validate and normalize init object in [name, value(s)][]
			/** @type {string[][]} */
			let result = [];
			if (init instanceof Headers) {
				const raw = init.raw();
				for (const [name, values] of Object.entries(raw)) {
					result.push(...values.map(value => [name, value]));
				}
			} else if (init == null) ; else if (typeof init === 'object' && !util.types.isBoxedPrimitive(init)) {
				const method = init[Symbol.iterator];
				// eslint-disable-next-line no-eq-null, eqeqeq
				if (method == null) {
					// Record<ByteString, ByteString>
					result.push(...Object.entries(init));
				} else {
					if (typeof method !== 'function') {
						throw new TypeError('Header pairs must be iterable');
					}

					// Sequence<sequence<ByteString>>
					// Note: per spec we have to first exhaust the lists then process them
					result = [...init]
						.map(pair => {
							if (
								typeof pair !== 'object' || util.types.isBoxedPrimitive(pair)
							) {
								throw new TypeError('Each header pair must be an iterable object');
							}

							return [...pair];
						}).map(pair => {
							if (pair.length !== 2) {
								throw new TypeError('Each header pair must be a name/value tuple');
							}

							return [...pair];
						});
				}
			} else {
				throw new TypeError('Failed to construct \'Headers\': The provided value is not of type \'(sequence<sequence<ByteString>> or record<ByteString, ByteString>)');
			}

			// Validate and lowercase
			result =
				result.length > 0 ?
					result.map(([name, value]) => {
						validateHeaderName(name);
						validateHeaderValue(name, String(value));
						return [String(name).toLowerCase(), String(value)];
					}) :
					undefined;

			super(result);

			// Returning a Proxy that will lowercase key names, validate parameters and sort keys
			// eslint-disable-next-line no-constructor-return
			return new Proxy(this, {
				get(target, p, receiver) {
					switch (p) {
						case 'append':
						case 'set':
							return (name, value) => {
								validateHeaderName(name);
								validateHeaderValue(name, String(value));
								return URLSearchParams.prototype[p].call(
									receiver,
									String(name).toLowerCase(),
									String(value)
								);
							};

						case 'delete':
						case 'has':
						case 'getAll':
							return name => {
								validateHeaderName(name);
								return URLSearchParams.prototype[p].call(
									receiver,
									String(name).toLowerCase()
								);
							};

						case 'keys':
							return () => {
								target.sort();
								return new Set(URLSearchParams.prototype.keys.call(target)).keys();
							};

						default:
							return Reflect.get(target, p, receiver);
					}
				}
				/* c8 ignore next */
			});
		}

		get [Symbol.toStringTag]() {
			return this.constructor.name;
		}

		toString() {
			return Object.prototype.toString.call(this);
		}

		get(name) {
			const values = this.getAll(name);
			if (values.length === 0) {
				return null;
			}

			let value = values.join(', ');
			if (/^content-encoding$/i.test(name)) {
				value = value.toLowerCase();
			}

			return value;
		}

		forEach(callback) {
			for (const name of this.keys()) {
				callback(this.get(name), name);
			}
		}

		* values() {
			for (const name of this.keys()) {
				yield this.get(name);
			}
		}

		/**
		 * @type {() => IterableIterator<[string, string]>}
		 */
		* entries() {
			for (const name of this.keys()) {
				yield [name, this.get(name)];
			}
		}

		[Symbol.iterator]() {
			return this.entries();
		}

		/**
		 * Node-fetch non-spec method
		 * returning all headers and their values as array
		 * @returns {Record<string, string[]>}
		 */
		raw() {
			return [...this.keys()].reduce((result, key) => {
				result[key] = this.getAll(key);
				return result;
			}, {});
		}

		/**
		 * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
		 */
		[Symbol.for('nodejs.util.inspect.custom')]() {
			return [...this.keys()].reduce((result, key) => {
				const values = this.getAll(key);
				// Http.request() only supports string as Host header.
				// This hack makes specifying custom Host header possible.
				if (key === 'host') {
					result[key] = values[0];
				} else {
					result[key] = values.length > 1 ? values : values[0];
				}

				return result;
			}, {});
		}
	}

	/**
	 * Re-shaping object for Web IDL tests
	 * Only need to do it for overridden methods
	 */
	Object.defineProperties(
		Headers.prototype,
		['get', 'entries', 'forEach', 'values'].reduce((result, property) => {
			result[property] = {enumerable: true};
			return result;
		}, {})
	);

	/**
	 * Create a Headers object from an http.IncomingMessage.rawHeaders, ignoring those that do
	 * not conform to HTTP grammar productions.
	 * @param {import('http').IncomingMessage['rawHeaders']} headers
	 */
	function fromRawHeaders(headers = []) {
		return new Headers(
			headers
				// Split into pairs
				.reduce((result, value, index, array) => {
					if (index % 2 === 0) {
						result.push(array.slice(index, index + 2));
					}

					return result;
				}, [])
				.filter(([name, value]) => {
					try {
						validateHeaderName(name);
						validateHeaderValue(name, String(value));
						return true;
					} catch {
						return false;
					}
				})

		);
	}

	const redirectStatus = new Set([301, 302, 303, 307, 308]);

	/**
	 * Redirect code matching
	 *
	 * @param {number} code - Status code
	 * @return {boolean}
	 */
	const isRedirect = code => {
		return redirectStatus.has(code);
	};

	/**
	 * Response.js
	 *
	 * Response class provides content decoding
	 */

	const INTERNALS$1 = Symbol('Response internals');

	/**
	 * Response class
	 *
	 * @param   Stream  body  Readable stream
	 * @param   Object  opts  Response options
	 * @return  Void
	 */
	class Response extends Body {
		constructor(body = null, options = {}) {
			super(body, options);

			const status = options.status || 200;
			const headers = new Headers(options.headers);

			if (body !== null && !headers.has('Content-Type')) {
				const contentType = extractContentType(body);
				if (contentType) {
					headers.append('Content-Type', contentType);
				}
			}

			this[INTERNALS$1] = {
				url: options.url,
				status,
				statusText: options.statusText || '',
				headers,
				counter: options.counter,
				highWaterMark: options.highWaterMark
			};
		}

		get url() {
			return this[INTERNALS$1].url || '';
		}

		get status() {
			return this[INTERNALS$1].status;
		}

		/**
		 * Convenience property representing if the request ended normally
		 */
		get ok() {
			return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
		}

		get redirected() {
			return this[INTERNALS$1].counter > 0;
		}

		get statusText() {
			return this[INTERNALS$1].statusText;
		}

		get headers() {
			return this[INTERNALS$1].headers;
		}

		get highWaterMark() {
			return this[INTERNALS$1].highWaterMark;
		}

		/**
		 * Clone this response
		 *
		 * @return  Response
		 */
		clone() {
			return new Response(clone(this, this.highWaterMark), {
				url: this.url,
				status: this.status,
				statusText: this.statusText,
				headers: this.headers,
				ok: this.ok,
				redirected: this.redirected,
				size: this.size
			});
		}

		/**
		 * @param {string} url    The URL that the new response is to originate from.
		 * @param {number} status An optional status code for the response (e.g., 302.)
		 * @returns {Response}    A Response object.
		 */
		static redirect(url, status = 302) {
			if (!isRedirect(status)) {
				throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
			}

			return new Response(null, {
				headers: {
					location: new URL(url).toString()
				},
				status
			});
		}

		get [Symbol.toStringTag]() {
			return 'Response';
		}
	}

	Object.defineProperties(Response.prototype, {
		url: {enumerable: true},
		status: {enumerable: true},
		ok: {enumerable: true},
		redirected: {enumerable: true},
		statusText: {enumerable: true},
		headers: {enumerable: true},
		clone: {enumerable: true}
	});

	const getSearch = parsedURL => {
		if (parsedURL.search) {
			return parsedURL.search;
		}

		const lastOffset = parsedURL.href.length - 1;
		const hash = parsedURL.hash || (parsedURL.href[lastOffset] === '#' ? '#' : '');
		return parsedURL.href[lastOffset - hash.length] === '?' ? '?' : '';
	};

	const INTERNALS$2 = Symbol('Request internals');

	/**
	 * Check if `obj` is an instance of Request.
	 *
	 * @param  {*} obj
	 * @return {boolean}
	 */
	const isRequest = object => {
		return (
			typeof object === 'object' &&
			typeof object[INTERNALS$2] === 'object'
		);
	};

	/**
	 * Request class
	 *
	 * @param   Mixed   input  Url or Request instance
	 * @param   Object  init   Custom options
	 * @return  Void
	 */
	class Request extends Body {
		constructor(input, init = {}) {
			let parsedURL;

			// Normalize input and force URL to be encoded as UTF-8 (https://github.com/node-fetch/node-fetch/issues/245)
			if (isRequest(input)) {
				parsedURL = new URL(input.url);
			} else {
				parsedURL = new URL(input);
				input = {};
			}

			let method = init.method || input.method || 'GET';
			method = method.toUpperCase();

			// eslint-disable-next-line no-eq-null, eqeqeq
			if (((init.body != null || isRequest(input)) && input.body !== null) &&
				(method === 'GET' || method === 'HEAD')) {
				throw new TypeError('Request with GET/HEAD method cannot have body');
			}

			const inputBody = init.body ?
				init.body :
				(isRequest(input) && input.body !== null ?
					clone(input) :
					null);

			super(inputBody, {
				size: init.size || input.size || 0
			});

			const headers = new Headers(init.headers || input.headers || {});

			if (inputBody !== null && !headers.has('Content-Type')) {
				const contentType = extractContentType(inputBody, this);
				if (contentType) {
					headers.append('Content-Type', contentType);
				}
			}

			let signal = isRequest(input) ?
				input.signal :
				null;
			if ('signal' in init) {
				signal = init.signal;
			}

			if (signal !== null && !isAbortSignal(signal)) {
				throw new TypeError('Expected signal to be an instanceof AbortSignal');
			}

			this[INTERNALS$2] = {
				method,
				redirect: init.redirect || input.redirect || 'follow',
				headers,
				parsedURL,
				signal
			};

			// Node-fetch-only options
			this.follow = init.follow === undefined ? (input.follow === undefined ? 20 : input.follow) : init.follow;
			this.compress = init.compress === undefined ? (input.compress === undefined ? true : input.compress) : init.compress;
			this.counter = init.counter || input.counter || 0;
			this.agent = init.agent || input.agent;
			this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
			this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
		}

		get method() {
			return this[INTERNALS$2].method;
		}

		get url() {
			return url.format(this[INTERNALS$2].parsedURL);
		}

		get headers() {
			return this[INTERNALS$2].headers;
		}

		get redirect() {
			return this[INTERNALS$2].redirect;
		}

		get signal() {
			return this[INTERNALS$2].signal;
		}

		/**
		 * Clone this request
		 *
		 * @return  Request
		 */
		clone() {
			return new Request(this);
		}

		get [Symbol.toStringTag]() {
			return 'Request';
		}
	}

	Object.defineProperties(Request.prototype, {
		method: {enumerable: true},
		url: {enumerable: true},
		headers: {enumerable: true},
		redirect: {enumerable: true},
		clone: {enumerable: true},
		signal: {enumerable: true}
	});

	/**
	 * Convert a Request to Node.js http request options.
	 *
	 * @param   Request  A Request instance
	 * @return  Object   The options object to be passed to http.request
	 */
	const getNodeRequestOptions = request => {
		const {parsedURL} = request[INTERNALS$2];
		const headers = new Headers(request[INTERNALS$2].headers);

		// Fetch step 1.3
		if (!headers.has('Accept')) {
			headers.set('Accept', '*/*');
		}

		// HTTP-network-or-cache fetch steps 2.4-2.7
		let contentLengthValue = null;
		if (request.body === null && /^(post|put)$/i.test(request.method)) {
			contentLengthValue = '0';
		}

		if (request.body !== null) {
			const totalBytes = getTotalBytes(request);
			// Set Content-Length if totalBytes is a number (that is not NaN)
			if (typeof totalBytes === 'number' && !Number.isNaN(totalBytes)) {
				contentLengthValue = String(totalBytes);
			}
		}

		if (contentLengthValue) {
			headers.set('Content-Length', contentLengthValue);
		}

		// HTTP-network-or-cache fetch step 2.11
		if (!headers.has('User-Agent')) {
			headers.set('User-Agent', 'node-fetch');
		}

		// HTTP-network-or-cache fetch step 2.15
		if (request.compress && !headers.has('Accept-Encoding')) {
			headers.set('Accept-Encoding', 'gzip,deflate,br');
		}

		let {agent} = request;
		if (typeof agent === 'function') {
			agent = agent(parsedURL);
		}

		if (!headers.has('Connection') && !agent) {
			headers.set('Connection', 'close');
		}

		// HTTP-network fetch step 4.2
		// chunked encoding is handled by Node.js

		const search = getSearch(parsedURL);

		// Manually spread the URL object instead of spread syntax
		const requestOptions = {
			path: parsedURL.pathname + search,
			pathname: parsedURL.pathname,
			hostname: parsedURL.hostname,
			protocol: parsedURL.protocol,
			port: parsedURL.port,
			hash: parsedURL.hash,
			search: parsedURL.search,
			query: parsedURL.query,
			href: parsedURL.href,
			method: request.method,
			headers: headers[Symbol.for('nodejs.util.inspect.custom')](),
			insecureHTTPParser: request.insecureHTTPParser,
			agent
		};

		return requestOptions;
	};

	/**
	 * AbortError interface for cancelled requests
	 */
	class AbortError extends FetchBaseError {
		constructor(message, type = 'aborted') {
			super(message, type);
		}
	}

	/**
	 * Index.js
	 *
	 * a request API compatible with window.fetch
	 *
	 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
	 */

	const supportedSchemas = new Set(['data:', 'http:', 'https:']);

	/**
	 * Fetch function
	 *
	 * @param   {string | URL | import('./request').default} url - Absolute url or Request instance
	 * @param   {*} [options_] - Fetch options
	 * @return  {Promise<import('./response').default>}
	 */
	async function fetch(url, options_) {
		return new Promise((resolve, reject) => {
			// Build request object
			const request = new Request(url, options_);
			const options = getNodeRequestOptions(request);
			if (!supportedSchemas.has(options.protocol)) {
				throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options.protocol.replace(/:$/, '')}" is not supported.`);
			}

			if (options.protocol === 'data:') {
				const data = dataUriToBuffer(request.url);
				const response = new Response(data, {headers: {'Content-Type': data.typeFull}});
				resolve(response);
				return;
			}

			// Wrap http.request into fetch
			const send = (options.protocol === 'https:' ? https : http).request;
			const {signal} = request;
			let response = null;

			const abort = () => {
				const error = new AbortError('The operation was aborted.');
				reject(error);
				if (request.body && request.body instanceof Stream.Readable) {
					request.body.destroy(error);
				}

				if (!response || !response.body) {
					return;
				}

				response.body.emit('error', error);
			};

			if (signal && signal.aborted) {
				abort();
				return;
			}

			const abortAndFinalize = () => {
				abort();
				finalize();
			};

			// Send request
			const request_ = send(options);

			if (signal) {
				signal.addEventListener('abort', abortAndFinalize);
			}

			const finalize = () => {
				request_.abort();
				if (signal) {
					signal.removeEventListener('abort', abortAndFinalize);
				}
			};

			request_.on('error', err => {
				reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
				finalize();
			});

			request_.on('response', response_ => {
				request_.setTimeout(0);
				const headers = fromRawHeaders(response_.rawHeaders);

				// HTTP fetch step 5
				if (isRedirect(response_.statusCode)) {
					// HTTP fetch step 5.2
					const location = headers.get('Location');

					// HTTP fetch step 5.3
					const locationURL = location === null ? null : new URL(location, request.url);

					// HTTP fetch step 5.5
					switch (request.redirect) {
						case 'error':
							reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
							finalize();
							return;
						case 'manual':
							// Node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
							if (locationURL !== null) {
								// Handle corrupted header
								try {
									headers.set('Location', locationURL);
									/* c8 ignore next 3 */
								} catch (error) {
									reject(error);
								}
							}

							break;
						case 'follow': {
							// HTTP-redirect fetch step 2
							if (locationURL === null) {
								break;
							}

							// HTTP-redirect fetch step 5
							if (request.counter >= request.follow) {
								reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
								finalize();
								return;
							}

							// HTTP-redirect fetch step 6 (counter increment)
							// Create a new Request object.
							const requestOptions = {
								headers: new Headers(request.headers),
								follow: request.follow,
								counter: request.counter + 1,
								agent: request.agent,
								compress: request.compress,
								method: request.method,
								body: request.body,
								signal: request.signal,
								size: request.size
							};

							// HTTP-redirect fetch step 9
							if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
								reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
								finalize();
								return;
							}

							// HTTP-redirect fetch step 11
							if (response_.statusCode === 303 || ((response_.statusCode === 301 || response_.statusCode === 302) && request.method === 'POST')) {
								requestOptions.method = 'GET';
								requestOptions.body = undefined;
								requestOptions.headers.delete('content-length');
							}

							// HTTP-redirect fetch step 15
							resolve(fetch(new Request(locationURL, requestOptions)));
							finalize();
							return;
						}
						// Do nothing
					}
				}

				// Prepare response
				response_.once('end', () => {
					if (signal) {
						signal.removeEventListener('abort', abortAndFinalize);
					}
				});

				let body = Stream.pipeline(response_, new Stream.PassThrough(), error => {
					reject(error);
				});
				// see https://github.com/nodejs/node/pull/29376
				if (process.version < 'v12.10') {
					response_.on('aborted', abortAndFinalize);
				}

				const responseOptions = {
					url: request.url,
					status: response_.statusCode,
					statusText: response_.statusMessage,
					headers,
					size: request.size,
					counter: request.counter,
					highWaterMark: request.highWaterMark
				};

				// HTTP-network fetch step 12.1.1.3
				const codings = headers.get('Content-Encoding');

				// HTTP-network fetch step 12.1.1.4: handle content codings

				// in following scenarios we ignore compression support
				// 1. compression support is disabled
				// 2. HEAD request
				// 3. no Content-Encoding header
				// 4. no content response (204)
				// 5. content not modified response (304)
				if (!request.compress || request.method === 'HEAD' || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
					response = new Response(body, responseOptions);
					resolve(response);
					return;
				}

				// For Node v6+
				// Be less strict when decoding compressed responses, since sometimes
				// servers send slightly invalid responses that are still accepted
				// by common browsers.
				// Always using Z_SYNC_FLUSH is what cURL does.
				const zlibOptions = {
					flush: zlib.Z_SYNC_FLUSH,
					finishFlush: zlib.Z_SYNC_FLUSH
				};

				// For gzip
				if (codings === 'gzip' || codings === 'x-gzip') {
					body = Stream.pipeline(body, zlib.createGunzip(zlibOptions), error => {
						reject(error);
					});
					response = new Response(body, responseOptions);
					resolve(response);
					return;
				}

				// For deflate
				if (codings === 'deflate' || codings === 'x-deflate') {
					// Handle the infamous raw deflate response from old servers
					// a hack for old IIS and Apache servers
					const raw = Stream.pipeline(response_, new Stream.PassThrough(), error => {
						reject(error);
					});
					raw.once('data', chunk => {
						// See http://stackoverflow.com/questions/37519828
						if ((chunk[0] & 0x0F) === 0x08) {
							body = Stream.pipeline(body, zlib.createInflate(), error => {
								reject(error);
							});
						} else {
							body = Stream.pipeline(body, zlib.createInflateRaw(), error => {
								reject(error);
							});
						}

						response = new Response(body, responseOptions);
						resolve(response);
					});
					return;
				}

				// For br
				if (codings === 'br') {
					body = Stream.pipeline(body, zlib.createBrotliDecompress(), error => {
						reject(error);
					});
					response = new Response(body, responseOptions);
					resolve(response);
					return;
				}

				// Otherwise, use response as-is
				response = new Response(body, responseOptions);
				resolve(response);
			});

			writeToStream(request_, request);
		});
	}

	exports.AbortError = AbortError;
	exports.FetchError = FetchError;
	exports.Headers = Headers;
	exports.Request = Request;
	exports.Response = Response;
	exports.default = fetch;
	exports.isRedirect = isRedirect;
	
} (dist, dist.exports));

var distExports = dist.exports;

/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
/**
 * @typedef {object} PrivateData
 * @property {EventTarget} eventTarget The event target.
 * @property {{type:string}} event The original event object.
 * @property {number} eventPhase The current event phase.
 * @property {EventTarget|null} currentTarget The current event target.
 * @property {boolean} canceled The flag to prevent default.
 * @property {boolean} stopped The flag to stop propagation.
 * @property {boolean} immediateStopped The flag to stop propagation immediately.
 * @property {Function|null} passiveListener The listener if the current listener is passive. Otherwise this is null.
 * @property {number} timeStamp The unix time.
 * @private
 */

/**
 * Private data for event wrappers.
 * @type {WeakMap<Event, PrivateData>}
 * @private
 */
const privateData = new WeakMap();

/**
 * Cache for wrapper classes.
 * @type {WeakMap<Object, Function>}
 * @private
 */
const wrappers = new WeakMap();

/**
 * Get private data.
 * @param {Event} event The event object to get private data.
 * @returns {PrivateData} The private data of the event.
 * @private
 */
function pd(event) {
    const retv = privateData.get(event);
    console.assert(
        retv != null,
        "'this' is expected an Event object, but got",
        event
    );
    return retv
}

/**
 * https://dom.spec.whatwg.org/#set-the-canceled-flag
 * @param data {PrivateData} private data.
 */
function setCancelFlag(data) {
    if (data.passiveListener != null) {
        if (
            typeof console !== "undefined" &&
            typeof console.error === "function"
        ) {
            console.error(
                "Unable to preventDefault inside passive event listener invocation.",
                data.passiveListener
            );
        }
        return
    }
    if (!data.event.cancelable) {
        return
    }

    data.canceled = true;
    if (typeof data.event.preventDefault === "function") {
        data.event.preventDefault();
    }
}

/**
 * @see https://dom.spec.whatwg.org/#interface-event
 * @private
 */
/**
 * The event wrapper.
 * @constructor
 * @param {EventTarget} eventTarget The event target of this dispatching.
 * @param {Event|{type:string}} event The original event to wrap.
 */
function Event(eventTarget, event) {
    privateData.set(this, {
        eventTarget,
        event,
        eventPhase: 2,
        currentTarget: eventTarget,
        canceled: false,
        stopped: false,
        immediateStopped: false,
        passiveListener: null,
        timeStamp: event.timeStamp || Date.now(),
    });

    // https://heycam.github.io/webidl/#Unforgeable
    Object.defineProperty(this, "isTrusted", { value: false, enumerable: true });

    // Define accessors
    const keys = Object.keys(event);
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in this)) {
            Object.defineProperty(this, key, defineRedirectDescriptor(key));
        }
    }
}

// Should be enumerable, but class methods are not enumerable.
Event.prototype = {
    /**
     * The type of this event.
     * @type {string}
     */
    get type() {
        return pd(this).event.type
    },

    /**
     * The target of this event.
     * @type {EventTarget}
     */
    get target() {
        return pd(this).eventTarget
    },

    /**
     * The target of this event.
     * @type {EventTarget}
     */
    get currentTarget() {
        return pd(this).currentTarget
    },

    /**
     * @returns {EventTarget[]} The composed path of this event.
     */
    composedPath() {
        const currentTarget = pd(this).currentTarget;
        if (currentTarget == null) {
            return []
        }
        return [currentTarget]
    },

    /**
     * Constant of NONE.
     * @type {number}
     */
    get NONE() {
        return 0
    },

    /**
     * Constant of CAPTURING_PHASE.
     * @type {number}
     */
    get CAPTURING_PHASE() {
        return 1
    },

    /**
     * Constant of AT_TARGET.
     * @type {number}
     */
    get AT_TARGET() {
        return 2
    },

    /**
     * Constant of BUBBLING_PHASE.
     * @type {number}
     */
    get BUBBLING_PHASE() {
        return 3
    },

    /**
     * The target of this event.
     * @type {number}
     */
    get eventPhase() {
        return pd(this).eventPhase
    },

    /**
     * Stop event bubbling.
     * @returns {void}
     */
    stopPropagation() {
        const data = pd(this);

        data.stopped = true;
        if (typeof data.event.stopPropagation === "function") {
            data.event.stopPropagation();
        }
    },

    /**
     * Stop event bubbling.
     * @returns {void}
     */
    stopImmediatePropagation() {
        const data = pd(this);

        data.stopped = true;
        data.immediateStopped = true;
        if (typeof data.event.stopImmediatePropagation === "function") {
            data.event.stopImmediatePropagation();
        }
    },

    /**
     * The flag to be bubbling.
     * @type {boolean}
     */
    get bubbles() {
        return Boolean(pd(this).event.bubbles)
    },

    /**
     * The flag to be cancelable.
     * @type {boolean}
     */
    get cancelable() {
        return Boolean(pd(this).event.cancelable)
    },

    /**
     * Cancel this event.
     * @returns {void}
     */
    preventDefault() {
        setCancelFlag(pd(this));
    },

    /**
     * The flag to indicate cancellation state.
     * @type {boolean}
     */
    get defaultPrevented() {
        return pd(this).canceled
    },

    /**
     * The flag to be composed.
     * @type {boolean}
     */
    get composed() {
        return Boolean(pd(this).event.composed)
    },

    /**
     * The unix time of this event.
     * @type {number}
     */
    get timeStamp() {
        return pd(this).timeStamp
    },

    /**
     * The target of this event.
     * @type {EventTarget}
     * @deprecated
     */
    get srcElement() {
        return pd(this).eventTarget
    },

    /**
     * The flag to stop event bubbling.
     * @type {boolean}
     * @deprecated
     */
    get cancelBubble() {
        return pd(this).stopped
    },
    set cancelBubble(value) {
        if (!value) {
            return
        }
        const data = pd(this);

        data.stopped = true;
        if (typeof data.event.cancelBubble === "boolean") {
            data.event.cancelBubble = true;
        }
    },

    /**
     * The flag to indicate cancellation state.
     * @type {boolean}
     * @deprecated
     */
    get returnValue() {
        return !pd(this).canceled
    },
    set returnValue(value) {
        if (!value) {
            setCancelFlag(pd(this));
        }
    },

    /**
     * Initialize this event object. But do nothing under event dispatching.
     * @param {string} type The event type.
     * @param {boolean} [bubbles=false] The flag to be possible to bubble up.
     * @param {boolean} [cancelable=false] The flag to be possible to cancel.
     * @deprecated
     */
    initEvent() {
        // Do nothing.
    },
};

// `constructor` is not enumerable.
Object.defineProperty(Event.prototype, "constructor", {
    value: Event,
    configurable: true,
    writable: true,
});

// Ensure `event instanceof window.Event` is `true`.
if (typeof window !== "undefined" && typeof window.Event !== "undefined") {
    Object.setPrototypeOf(Event.prototype, window.Event.prototype);

    // Make association for wrappers.
    wrappers.set(window.Event.prototype, Event);
}

/**
 * Get the property descriptor to redirect a given property.
 * @param {string} key Property name to define property descriptor.
 * @returns {PropertyDescriptor} The property descriptor to redirect the property.
 * @private
 */
function defineRedirectDescriptor(key) {
    return {
        get() {
            return pd(this).event[key]
        },
        set(value) {
            pd(this).event[key] = value;
        },
        configurable: true,
        enumerable: true,
    }
}

/**
 * Get the property descriptor to call a given method property.
 * @param {string} key Property name to define property descriptor.
 * @returns {PropertyDescriptor} The property descriptor to call the method property.
 * @private
 */
function defineCallDescriptor(key) {
    return {
        value() {
            const event = pd(this).event;
            return event[key].apply(event, arguments)
        },
        configurable: true,
        enumerable: true,
    }
}

/**
 * Define new wrapper class.
 * @param {Function} BaseEvent The base wrapper class.
 * @param {Object} proto The prototype of the original event.
 * @returns {Function} The defined wrapper class.
 * @private
 */
function defineWrapper(BaseEvent, proto) {
    const keys = Object.keys(proto);
    if (keys.length === 0) {
        return BaseEvent
    }

    /** CustomEvent */
    function CustomEvent(eventTarget, event) {
        BaseEvent.call(this, eventTarget, event);
    }

    CustomEvent.prototype = Object.create(BaseEvent.prototype, {
        constructor: { value: CustomEvent, configurable: true, writable: true },
    });

    // Define accessors.
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in BaseEvent.prototype)) {
            const descriptor = Object.getOwnPropertyDescriptor(proto, key);
            const isFunc = typeof descriptor.value === "function";
            Object.defineProperty(
                CustomEvent.prototype,
                key,
                isFunc
                    ? defineCallDescriptor(key)
                    : defineRedirectDescriptor(key)
            );
        }
    }

    return CustomEvent
}

/**
 * Get the wrapper class of a given prototype.
 * @param {Object} proto The prototype of the original event to get its wrapper.
 * @returns {Function} The wrapper class.
 * @private
 */
function getWrapper(proto) {
    if (proto == null || proto === Object.prototype) {
        return Event
    }

    let wrapper = wrappers.get(proto);
    if (wrapper == null) {
        wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
        wrappers.set(proto, wrapper);
    }
    return wrapper
}

/**
 * Wrap a given event to management a dispatching.
 * @param {EventTarget} eventTarget The event target of this dispatching.
 * @param {Object} event The event to wrap.
 * @returns {Event} The wrapper instance.
 * @private
 */
function wrapEvent(eventTarget, event) {
    const Wrapper = getWrapper(Object.getPrototypeOf(event));
    return new Wrapper(eventTarget, event)
}

/**
 * Get the immediateStopped flag of a given event.
 * @param {Event} event The event to get.
 * @returns {boolean} The flag to stop propagation immediately.
 * @private
 */
function isStopped(event) {
    return pd(event).immediateStopped
}

/**
 * Set the current event phase of a given event.
 * @param {Event} event The event to set current target.
 * @param {number} eventPhase New event phase.
 * @returns {void}
 * @private
 */
function setEventPhase(event, eventPhase) {
    pd(event).eventPhase = eventPhase;
}

/**
 * Set the current target of a given event.
 * @param {Event} event The event to set current target.
 * @param {EventTarget|null} currentTarget New current target.
 * @returns {void}
 * @private
 */
function setCurrentTarget(event, currentTarget) {
    pd(event).currentTarget = currentTarget;
}

/**
 * Set a passive listener of a given event.
 * @param {Event} event The event to set current target.
 * @param {Function|null} passiveListener New passive listener.
 * @returns {void}
 * @private
 */
function setPassiveListener(event, passiveListener) {
    pd(event).passiveListener = passiveListener;
}

/**
 * @typedef {object} ListenerNode
 * @property {Function} listener
 * @property {1|2|3} listenerType
 * @property {boolean} passive
 * @property {boolean} once
 * @property {ListenerNode|null} next
 * @private
 */

/**
 * @type {WeakMap<object, Map<string, ListenerNode>>}
 * @private
 */
const listenersMap = new WeakMap();

// Listener types
const CAPTURE = 1;
const BUBBLE = 2;
const ATTRIBUTE = 3;

/**
 * Check whether a given value is an object or not.
 * @param {any} x The value to check.
 * @returns {boolean} `true` if the value is an object.
 */
function isObject(x) {
    return x !== null && typeof x === "object" //eslint-disable-line no-restricted-syntax
}

/**
 * Get listeners.
 * @param {EventTarget} eventTarget The event target to get.
 * @returns {Map<string, ListenerNode>} The listeners.
 * @private
 */
function getListeners(eventTarget) {
    const listeners = listenersMap.get(eventTarget);
    if (listeners == null) {
        throw new TypeError(
            "'this' is expected an EventTarget object, but got another value."
        )
    }
    return listeners
}

/**
 * Get the property descriptor for the event attribute of a given event.
 * @param {string} eventName The event name to get property descriptor.
 * @returns {PropertyDescriptor} The property descriptor.
 * @private
 */
function defineEventAttributeDescriptor(eventName) {
    return {
        get() {
            const listeners = getListeners(this);
            let node = listeners.get(eventName);
            while (node != null) {
                if (node.listenerType === ATTRIBUTE) {
                    return node.listener
                }
                node = node.next;
            }
            return null
        },

        set(listener) {
            if (typeof listener !== "function" && !isObject(listener)) {
                listener = null; // eslint-disable-line no-param-reassign
            }
            const listeners = getListeners(this);

            // Traverse to the tail while removing old value.
            let prev = null;
            let node = listeners.get(eventName);
            while (node != null) {
                if (node.listenerType === ATTRIBUTE) {
                    // Remove old value.
                    if (prev !== null) {
                        prev.next = node.next;
                    } else if (node.next !== null) {
                        listeners.set(eventName, node.next);
                    } else {
                        listeners.delete(eventName);
                    }
                } else {
                    prev = node;
                }

                node = node.next;
            }

            // Add new value.
            if (listener !== null) {
                const newNode = {
                    listener,
                    listenerType: ATTRIBUTE,
                    passive: false,
                    once: false,
                    next: null,
                };
                if (prev === null) {
                    listeners.set(eventName, newNode);
                } else {
                    prev.next = newNode;
                }
            }
        },
        configurable: true,
        enumerable: true,
    }
}

/**
 * Define an event attribute (e.g. `eventTarget.onclick`).
 * @param {Object} eventTargetPrototype The event target prototype to define an event attrbite.
 * @param {string} eventName The event name to define.
 * @returns {void}
 */
function defineEventAttribute(eventTargetPrototype, eventName) {
    Object.defineProperty(
        eventTargetPrototype,
        `on${eventName}`,
        defineEventAttributeDescriptor(eventName)
    );
}

/**
 * Define a custom EventTarget with event attributes.
 * @param {string[]} eventNames Event names for event attributes.
 * @returns {EventTarget} The custom EventTarget.
 * @private
 */
function defineCustomEventTarget(eventNames) {
    /** CustomEventTarget */
    function CustomEventTarget() {
        EventTarget.call(this);
    }

    CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
        constructor: {
            value: CustomEventTarget,
            configurable: true,
            writable: true,
        },
    });

    for (let i = 0; i < eventNames.length; ++i) {
        defineEventAttribute(CustomEventTarget.prototype, eventNames[i]);
    }

    return CustomEventTarget
}

/**
 * EventTarget.
 *
 * - This is constructor if no arguments.
 * - This is a function which returns a CustomEventTarget constructor if there are arguments.
 *
 * For example:
 *
 *     class A extends EventTarget {}
 *     class B extends EventTarget("message") {}
 *     class C extends EventTarget("message", "error") {}
 *     class D extends EventTarget(["message", "error"]) {}
 */
function EventTarget() {
    /*eslint-disable consistent-return */
    if (this instanceof EventTarget) {
        listenersMap.set(this, new Map());
        return
    }
    if (arguments.length === 1 && Array.isArray(arguments[0])) {
        return defineCustomEventTarget(arguments[0])
    }
    if (arguments.length > 0) {
        const types = new Array(arguments.length);
        for (let i = 0; i < arguments.length; ++i) {
            types[i] = arguments[i];
        }
        return defineCustomEventTarget(types)
    }
    throw new TypeError("Cannot call a class as a function")
    /*eslint-enable consistent-return */
}

// Should be enumerable, but class methods are not enumerable.
EventTarget.prototype = {
    /**
     * Add a given listener to this event target.
     * @param {string} eventName The event name to add.
     * @param {Function} listener The listener to add.
     * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
     * @returns {void}
     */
    addEventListener(eventName, listener, options) {
        if (listener == null) {
            return
        }
        if (typeof listener !== "function" && !isObject(listener)) {
            throw new TypeError("'listener' should be a function or an object.")
        }

        const listeners = getListeners(this);
        const optionsIsObj = isObject(options);
        const capture = optionsIsObj
            ? Boolean(options.capture)
            : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        const newNode = {
            listener,
            listenerType,
            passive: optionsIsObj && Boolean(options.passive),
            once: optionsIsObj && Boolean(options.once),
            next: null,
        };

        // Set it as the first node if the first node is null.
        let node = listeners.get(eventName);
        if (node === undefined) {
            listeners.set(eventName, newNode);
            return
        }

        // Traverse to the tail while checking duplication..
        let prev = null;
        while (node != null) {
            if (
                node.listener === listener &&
                node.listenerType === listenerType
            ) {
                // Should ignore duplication.
                return
            }
            prev = node;
            node = node.next;
        }

        // Add it.
        prev.next = newNode;
    },

    /**
     * Remove a given listener from this event target.
     * @param {string} eventName The event name to remove.
     * @param {Function} listener The listener to remove.
     * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
     * @returns {void}
     */
    removeEventListener(eventName, listener, options) {
        if (listener == null) {
            return
        }

        const listeners = getListeners(this);
        const capture = isObject(options)
            ? Boolean(options.capture)
            : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;

        let prev = null;
        let node = listeners.get(eventName);
        while (node != null) {
            if (
                node.listener === listener &&
                node.listenerType === listenerType
            ) {
                if (prev !== null) {
                    prev.next = node.next;
                } else if (node.next !== null) {
                    listeners.set(eventName, node.next);
                } else {
                    listeners.delete(eventName);
                }
                return
            }

            prev = node;
            node = node.next;
        }
    },

    /**
     * Dispatch a given event.
     * @param {Event|{type:string}} event The event to dispatch.
     * @returns {boolean} `false` if canceled.
     */
    dispatchEvent(event) {
        if (event == null || typeof event.type !== "string") {
            throw new TypeError('"event.type" should be a string.')
        }

        // If listeners aren't registered, terminate.
        const listeners = getListeners(this);
        const eventName = event.type;
        let node = listeners.get(eventName);
        if (node == null) {
            return true
        }

        // Since we cannot rewrite several properties, so wrap object.
        const wrappedEvent = wrapEvent(this, event);

        // This doesn't process capturing phase and bubbling phase.
        // This isn't participating in a tree.
        let prev = null;
        while (node != null) {
            // Remove this listener if it's once
            if (node.once) {
                if (prev !== null) {
                    prev.next = node.next;
                } else if (node.next !== null) {
                    listeners.set(eventName, node.next);
                } else {
                    listeners.delete(eventName);
                }
            } else {
                prev = node;
            }

            // Call this listener
            setPassiveListener(
                wrappedEvent,
                node.passive ? node.listener : null
            );
            if (typeof node.listener === "function") {
                try {
                    node.listener.call(this, wrappedEvent);
                } catch (err) {
                    if (
                        typeof console !== "undefined" &&
                        typeof console.error === "function"
                    ) {
                        console.error(err);
                    }
                }
            } else if (
                node.listenerType !== ATTRIBUTE &&
                typeof node.listener.handleEvent === "function"
            ) {
                node.listener.handleEvent(wrappedEvent);
            }

            // Break if `event.stopImmediatePropagation` was called.
            if (isStopped(wrappedEvent)) {
                break
            }

            node = node.next;
        }
        setPassiveListener(wrappedEvent, null);
        setEventPhase(wrappedEvent, 0);
        setCurrentTarget(wrappedEvent, null);

        return !wrappedEvent.defaultPrevented
    },
};

// `constructor` is not enumerable.
Object.defineProperty(EventTarget.prototype, "constructor", {
    value: EventTarget,
    configurable: true,
    writable: true,
});

// Ensure `eventTarget instanceof window.EventTarget` is `true`.
if (
    typeof window !== "undefined" &&
    typeof window.EventTarget !== "undefined"
) {
    Object.setPrototypeOf(EventTarget.prototype, window.EventTarget.prototype);
}

/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

/**
 * The signal class.
 * @see https://dom.spec.whatwg.org/#abortsignal
 */
class AbortSignal extends EventTarget {
    /**
     * AbortSignal cannot be constructed directly.
     */
    constructor() {
        super();
        throw new TypeError("AbortSignal cannot be constructed directly");
    }
    /**
     * Returns `true` if this `AbortSignal`'s `AbortController` has signaled to abort, and `false` otherwise.
     */
    get aborted() {
        const aborted = abortedFlags.get(this);
        if (typeof aborted !== "boolean") {
            throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
        }
        return aborted;
    }
}
defineEventAttribute(AbortSignal.prototype, "abort");
/**
 * Create an AbortSignal object.
 */
function createAbortSignal() {
    const signal = Object.create(AbortSignal.prototype);
    EventTarget.call(signal);
    abortedFlags.set(signal, false);
    return signal;
}
/**
 * Abort a given signal.
 */
function abortSignal(signal) {
    if (abortedFlags.get(signal) !== false) {
        return;
    }
    abortedFlags.set(signal, true);
    signal.dispatchEvent({ type: "abort" });
}
/**
 * Aborted flag for each instances.
 */
const abortedFlags = new WeakMap();
// Properties should be enumerable.
Object.defineProperties(AbortSignal.prototype, {
    aborted: { enumerable: true },
});
// `toString()` should return `"[object AbortSignal]"`
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
    Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortSignal",
    });
}

/**
 * The AbortController.
 * @see https://dom.spec.whatwg.org/#abortcontroller
 */
let AbortController$1 = class AbortController {
    /**
     * Initialize this controller.
     */
    constructor() {
        signals.set(this, createAbortSignal());
    }
    /**
     * Returns the `AbortSignal` object associated with this object.
     */
    get signal() {
        return getSignal(this);
    }
    /**
     * Abort and signal to any observers that the associated activity is to be aborted.
     */
    abort() {
        abortSignal(getSignal(this));
    }
};
/**
 * Associated signals.
 */
const signals = new WeakMap();
/**
 * Get the associated signal of a given controller.
 */
function getSignal(controller) {
    const signal = signals.get(controller);
    if (signal == null) {
        throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${controller === null ? "null" : typeof controller}`);
    }
    return signal;
}
// Properties should be enumerable.
Object.defineProperties(AbortController$1.prototype, {
    signal: { enumerable: true },
    abort: { enumerable: true },
});
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
    Object.defineProperty(AbortController$1.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortController",
    });
}

var abortController = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AbortController: AbortController$1,
  AbortSignal: AbortSignal,
  default: AbortController$1
});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(abortController);

var umd = {exports: {}};

var hasRequiredUmd;

function requireUmd () {
	if (hasRequiredUmd) return umd.exports;
	hasRequiredUmd = 1;
	(function (module, exports) {
		(function (global, factory) {
			module.exports = factory() ;
		}(commonjsGlobal, (function () {
			/*! MIT License © Sindre Sorhus */

			const globals = {};

			const getGlobal = property => {
				/* istanbul ignore next */
				if (typeof self !== 'undefined' && self && property in self) {
					return self;
				}

				/* istanbul ignore next */
				if (typeof window !== 'undefined' && window && property in window) {
					return window;
				}

				if (typeof commonjsGlobal !== 'undefined' && commonjsGlobal && property in commonjsGlobal) {
					return commonjsGlobal;
				}

				/* istanbul ignore next */
				if (typeof globalThis !== 'undefined' && globalThis) {
					return globalThis;
				}
			};

			const globalProperties = [
				'Headers',
				'Request',
				'Response',
				'ReadableStream',
				'fetch',
				'AbortController',
				'FormData'
			];

			for (const property of globalProperties) {
				Object.defineProperty(globals, property, {
					get() {
						const globalObject = getGlobal(property);
						const value = globalObject && globalObject[property];
						return typeof value === 'function' ? value.bind(globalObject) : value;
					}
				});
			}

			const isObject = value => value !== null && typeof value === 'object';
			const supportsAbortController = typeof globals.AbortController === 'function';
			const supportsStreams = typeof globals.ReadableStream === 'function';
			const supportsFormData = typeof globals.FormData === 'function';

			const mergeHeaders = (source1, source2) => {
				const result = new globals.Headers(source1 || {});
				const isHeadersInstance = source2 instanceof globals.Headers;
				const source = new globals.Headers(source2 || {});

				for (const [key, value] of source) {
					if ((isHeadersInstance && value === 'undefined') || value === undefined) {
						result.delete(key);
					} else {
						result.set(key, value);
					}
				}

				return result;
			};

			const deepMerge = (...sources) => {
				let returnValue = {};
				let headers = {};

				for (const source of sources) {
					if (Array.isArray(source)) {
						if (!(Array.isArray(returnValue))) {
							returnValue = [];
						}

						returnValue = [...returnValue, ...source];
					} else if (isObject(source)) {
						for (let [key, value] of Object.entries(source)) {
							if (isObject(value) && (key in returnValue)) {
								value = deepMerge(returnValue[key], value);
							}

							returnValue = {...returnValue, [key]: value};
						}

						if (isObject(source.headers)) {
							headers = mergeHeaders(headers, source.headers);
						}
					}

					returnValue.headers = headers;
				}

				return returnValue;
			};

			const requestMethods = [
				'get',
				'post',
				'put',
				'patch',
				'head',
				'delete'
			];

			const responseTypes = {
				json: 'application/json',
				text: 'text/*',
				formData: 'multipart/form-data',
				arrayBuffer: '*/*',
				blob: '*/*'
			};

			const retryMethods = [
				'get',
				'put',
				'head',
				'delete',
				'options',
				'trace'
			];

			const retryStatusCodes = [
				408,
				413,
				429,
				500,
				502,
				503,
				504
			];

			const retryAfterStatusCodes = [
				413,
				429,
				503
			];

			const stop = Symbol('stop');

			class HTTPError extends Error {
				constructor(response) {
					// Set the message to the status text, such as Unauthorized,
					// with some fallbacks. This message should never be undefined.
					super(
						response.statusText ||
						String(
							(response.status === 0 || response.status) ?
								response.status : 'Unknown response error'
						)
					);
					this.name = 'HTTPError';
					this.response = response;
				}
			}

			class TimeoutError extends Error {
				constructor(request) {
					super('Request timed out');
					this.name = 'TimeoutError';
					this.request = request;
				}
			}

			const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

			// `Promise.race()` workaround (#91)
			const timeout = (request, abortController, options) =>
				new Promise((resolve, reject) => {
					const timeoutID = setTimeout(() => {
						if (abortController) {
							abortController.abort();
						}

						reject(new TimeoutError(request));
					}, options.timeout);

					/* eslint-disable promise/prefer-await-to-then */
					options.fetch(request)
						.then(resolve)
						.catch(reject)
						.then(() => {
							clearTimeout(timeoutID);
						});
					/* eslint-enable promise/prefer-await-to-then */
				});

			const normalizeRequestMethod = input => requestMethods.includes(input) ? input.toUpperCase() : input;

			const defaultRetryOptions = {
				limit: 2,
				methods: retryMethods,
				statusCodes: retryStatusCodes,
				afterStatusCodes: retryAfterStatusCodes
			};

			const normalizeRetryOptions = (retry = {}) => {
				if (typeof retry === 'number') {
					return {
						...defaultRetryOptions,
						limit: retry
					};
				}

				if (retry.methods && !Array.isArray(retry.methods)) {
					throw new Error('retry.methods must be an array');
				}

				if (retry.statusCodes && !Array.isArray(retry.statusCodes)) {
					throw new Error('retry.statusCodes must be an array');
				}

				return {
					...defaultRetryOptions,
					...retry,
					afterStatusCodes: retryAfterStatusCodes
				};
			};

			// The maximum value of a 32bit int (see issue #117)
			const maxSafeTimeout = 2147483647;

			class Ky {
				constructor(input, options = {}) {
					this._retryCount = 0;
					this._input = input;
					this._options = {
						// TODO: credentials can be removed when the spec change is implemented in all browsers. Context: https://www.chromestatus.com/feature/4539473312350208
						credentials: this._input.credentials || 'same-origin',
						...options,
						headers: mergeHeaders(this._input.headers, options.headers),
						hooks: deepMerge({
							beforeRequest: [],
							beforeRetry: [],
							afterResponse: []
						}, options.hooks),
						method: normalizeRequestMethod(options.method || this._input.method),
						prefixUrl: String(options.prefixUrl || ''),
						retry: normalizeRetryOptions(options.retry),
						throwHttpErrors: options.throwHttpErrors !== false,
						timeout: typeof options.timeout === 'undefined' ? 10000 : options.timeout,
						fetch: options.fetch || globals.fetch
					};

					if (typeof this._input !== 'string' && !(this._input instanceof URL || this._input instanceof globals.Request)) {
						throw new TypeError('`input` must be a string, URL, or Request');
					}

					if (this._options.prefixUrl && typeof this._input === 'string') {
						if (this._input.startsWith('/')) {
							throw new Error('`input` must not begin with a slash when using `prefixUrl`');
						}

						if (!this._options.prefixUrl.endsWith('/')) {
							this._options.prefixUrl += '/';
						}

						this._input = this._options.prefixUrl + this._input;
					}

					if (supportsAbortController) {
						this.abortController = new globals.AbortController();
						if (this._options.signal) {
							this._options.signal.addEventListener('abort', () => {
								this.abortController.abort();
							});
						}

						this._options.signal = this.abortController.signal;
					}

					this.request = new globals.Request(this._input, this._options);

					if (this._options.searchParams) {
						const searchParams = '?' + new URLSearchParams(this._options.searchParams).toString();
						const url = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, searchParams);

						// To provide correct form boundary, Content-Type header should be deleted each time when new Request instantiated from another one
						if (((supportsFormData && this._options.body instanceof globals.FormData) || this._options.body instanceof URLSearchParams) && !(this._options.headers && this._options.headers['content-type'])) {
							this.request.headers.delete('content-type');
						}

						this.request = new globals.Request(new globals.Request(url, this.request), this._options);
					}

					if (this._options.json !== undefined) {
						this._options.body = JSON.stringify(this._options.json);
						this.request.headers.set('content-type', 'application/json');
						this.request = new globals.Request(this.request, {body: this._options.body});
					}

					const fn = async () => {
						if (this._options.timeout > maxSafeTimeout) {
							throw new RangeError(`The \`timeout\` option cannot be greater than ${maxSafeTimeout}`);
						}

						await delay(1);
						let response = await this._fetch();

						for (const hook of this._options.hooks.afterResponse) {
							// eslint-disable-next-line no-await-in-loop
							const modifiedResponse = await hook(
								this.request,
								this._options,
								this._decorateResponse(response.clone())
							);

							if (modifiedResponse instanceof globals.Response) {
								response = modifiedResponse;
							}
						}

						this._decorateResponse(response);

						if (!response.ok && this._options.throwHttpErrors) {
							throw new HTTPError(response);
						}

						// If `onDownloadProgress` is passed, it uses the stream API internally
						/* istanbul ignore next */
						if (this._options.onDownloadProgress) {
							if (typeof this._options.onDownloadProgress !== 'function') {
								throw new TypeError('The `onDownloadProgress` option must be a function');
							}

							if (!supportsStreams) {
								throw new Error('Streams are not supported in your environment. `ReadableStream` is missing.');
							}

							return this._stream(response.clone(), this._options.onDownloadProgress);
						}

						return response;
					};

					const isRetriableMethod = this._options.retry.methods.includes(this.request.method.toLowerCase());
					const result = isRetriableMethod ? this._retry(fn) : fn();

					for (const [type, mimeType] of Object.entries(responseTypes)) {
						result[type] = async () => {
							this.request.headers.set('accept', this.request.headers.get('accept') || mimeType);

							const response = (await result).clone();

							if (type === 'json') {
								if (response.status === 204) {
									return '';
								}

								if (options.parseJson) {
									return options.parseJson(await response.text());
								}
							}

							return response[type]();
						};
					}

					return result;
				}

				_calculateRetryDelay(error) {
					this._retryCount++;

					if (this._retryCount < this._options.retry.limit && !(error instanceof TimeoutError)) {
						if (error instanceof HTTPError) {
							if (!this._options.retry.statusCodes.includes(error.response.status)) {
								return 0;
							}

							const retryAfter = error.response.headers.get('Retry-After');
							if (retryAfter && this._options.retry.afterStatusCodes.includes(error.response.status)) {
								let after = Number(retryAfter);
								if (Number.isNaN(after)) {
									after = Date.parse(retryAfter) - Date.now();
								} else {
									after *= 1000;
								}

								if (typeof this._options.retry.maxRetryAfter !== 'undefined' && after > this._options.retry.maxRetryAfter) {
									return 0;
								}

								return after;
							}

							if (error.response.status === 413) {
								return 0;
							}
						}

						const BACKOFF_FACTOR = 0.3;
						return BACKOFF_FACTOR * (2 ** (this._retryCount - 1)) * 1000;
					}

					return 0;
				}

				_decorateResponse(response) {
					if (this._options.parseJson) {
						response.json = async () => {
							return this._options.parseJson(await response.text());
						};
					}

					return response;
				}

				async _retry(fn) {
					try {
						return await fn();
					} catch (error) {
						const ms = Math.min(this._calculateRetryDelay(error), maxSafeTimeout);
						if (ms !== 0 && this._retryCount > 0) {
							await delay(ms);

							for (const hook of this._options.hooks.beforeRetry) {
								// eslint-disable-next-line no-await-in-loop
								const hookResult = await hook({
									request: this.request,
									options: this._options,
									error,
									retryCount: this._retryCount
								});

								// If `stop` is returned from the hook, the retry process is stopped
								if (hookResult === stop) {
									return;
								}
							}

							return this._retry(fn);
						}

						if (this._options.throwHttpErrors) {
							throw error;
						}
					}
				}

				async _fetch() {
					for (const hook of this._options.hooks.beforeRequest) {
						// eslint-disable-next-line no-await-in-loop
						const result = await hook(this.request, this._options);

						if (result instanceof Request) {
							this.request = result;
							break;
						}

						if (result instanceof Response) {
							return result;
						}
					}

					if (this._options.timeout === false) {
						return this._options.fetch(this.request.clone());
					}

					return timeout(this.request.clone(), this.abortController, this._options);
				}

				/* istanbul ignore next */
				_stream(response, onDownloadProgress) {
					const totalBytes = Number(response.headers.get('content-length')) || 0;
					let transferredBytes = 0;

					return new globals.Response(
						new globals.ReadableStream({
							start(controller) {
								const reader = response.body.getReader();

								if (onDownloadProgress) {
									onDownloadProgress({percent: 0, transferredBytes: 0, totalBytes}, new Uint8Array());
								}

								async function read() {
									const {done, value} = await reader.read();
									if (done) {
										controller.close();
										return;
									}

									if (onDownloadProgress) {
										transferredBytes += value.byteLength;
										const percent = totalBytes === 0 ? 0 : transferredBytes / totalBytes;
										onDownloadProgress({percent, transferredBytes, totalBytes}, value);
									}

									controller.enqueue(value);
									read();
								}

								read();
							}
						})
					);
				}
			}

			const validateAndMerge = (...sources) => {
				for (const source of sources) {
					if ((!isObject(source) || Array.isArray(source)) && typeof source !== 'undefined') {
						throw new TypeError('The `options` argument must be an object');
					}
				}

				return deepMerge({}, ...sources);
			};

			const createInstance = defaults => {
				const ky = (input, options) => new Ky(input, validateAndMerge(defaults, options));

				for (const method of requestMethods) {
					ky[method] = (input, options) => new Ky(input, validateAndMerge(defaults, options, {method}));
				}

				ky.HTTPError = HTTPError;
				ky.TimeoutError = TimeoutError;
				ky.create = newDefaults => createInstance(validateAndMerge(newDefaults));
				ky.extend = newDefaults => createInstance(validateAndMerge(defaults, newDefaults));
				ky.stop = stop;

				return ky;
			};

			var index = createInstance();

			return index;

		}))); 
	} (umd));
	return umd.exports;
}

const fetch$1 = distExports;
const AbortController = require$$1;

const TEN_MEGABYTES = 1000 * 1000 * 10;

if (!commonjsGlobal.fetch) {
	commonjsGlobal.fetch = (url, options) => fetch$1(url, {highWaterMark: TEN_MEGABYTES, ...options});
}

if (!commonjsGlobal.Headers) {
	commonjsGlobal.Headers = fetch$1.Headers;
}

if (!commonjsGlobal.Request) {
	commonjsGlobal.Request = fetch$1.Request;
}

if (!commonjsGlobal.Response) {
	commonjsGlobal.Response = fetch$1.Response;
}

if (!commonjsGlobal.AbortController) {
	commonjsGlobal.AbortController = AbortController;
}

if (!commonjsGlobal.ReadableStream) {
	try {
		commonjsGlobal.ReadableStream = require('web-streams-polyfill/ponyfill/es2018');
	} catch (_) {}
}

var kyUniversal = requireUmd();

const fs = require$$0$3;

const apiConstants = api;

const ky = kyUniversal.create({
  prefixUrl: apiConstants.HOST,
});

let Transport$1 = class Transport {
  constructor(authToken) {
    this.authToken = authToken;
  }

  get(endpoint, params) {
    return ky(endpoint, {
      headers: this._getHeaders(),
      searchParams: params,
    }).json();
  }

  upload(fileName, filePath, requestTimeout) {
    return ky
      .post('v1/uploads', {
        headers: {
          'Content-Type': 'application/octet-stream',
          Authorization: `Bearer ${this.authToken}`,
          'X-Goog-Upload-File-Name': fileName,
          'X-Goog-Upload-Protocol': 'raw',
        },
        body: fs.readFileSync(filePath),
        timeout: requestTimeout,
      })
      .text();
  }

  post(endpoint, params) {
    return ky
      .post(endpoint, {
        headers: this._getHeaders(),
        json: params,
      })
      .json();
  }

  _getHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    };
  }
};

var transport = Transport$1;

/**
 * Read more about scopes here:
 *   https://developers.google.com/photos/library/guides/authentication-authorization
 */
const SCOPES$1 = {
  READ_ONLY: 'https://www.googleapis.com/auth/photoslibrary.readonly',
  APPEND_ONLY: 'https://www.googleapis.com/auth/photoslibrary.appendonly',
  READ_DEV_DATA: 'https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata',
  READ_AND_APPEND: 'https://www.googleapis.com/auth/photoslibrary',
  SHARING: 'https://www.googleapis.com/auth/photoslibrary.sharing',
};

var scopes = SCOPES$1;

let GDate$2 = class GDate {
  constructor(year, month, day) {
    Object.assign(this, {year, month, day});
  }

  static fromDate(date) {
    if (!(date instanceof Date)) {
      throw Error('Not a valid date object');
    }
    return new GDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  static fromMoment(moment) {
    if (!moment || !moment.isMoment || !moment.isMoment()) {
      throw Error('not a valid moment');
    }
    return new GDate(moment.year(), moment.month() + 1, moment.date());
  }

  static newDate(d) {
    if (d instanceof GDate) {
      return d;
    }
    if (d instanceof Date) {
      return GDate.fromDate(d);
    }
    if (d && d.isMoment && d.isMoment()) {
      return GDate.fromMoment(d);
    }
    if (d.year && d.month && d.day) {
      return new GDate(d.year, d.month, d.day);
    }
    return new GDate();
  }

  toJSON() {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
    };
  }
};

var gdate = GDate$2;

const GDate$1 = gdate;

let DateRange$1 = class DateRange {
  constructor(startDate, endDate) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  toJSON() {
    let startJson = {};
    let endJson = {};

    if (this.startDate.year && this.startDate.month && this.startDate.day) {
      startJson = {
        year: this.startDate.year,
        month: this.startDate.month,
        day: this.startDate.day,
      };
    } else {
      startJson = GDate$1.newDate(this.startDate).toJSON();
    }

    if (this.endDate.year && this.endDate.month && this.endDate.day) {
      endJson = {
        year: this.endDate.year,
        month: this.endDate.month,
        day: this.endDate.day,
      };
    } else {
      endJson = GDate$1.newDate(this.endDate).toJSON();
    }

    return {
      startDate: startJson,
      endDate: endJson,
    };
  }
};

var date_range = DateRange$1;

const GDate = gdate;
const DateRange = date_range;

let DateFilter$2 = class DateFilter {
  constructor() {
    this.dates = [];
    this.ranges = [];
  }

  addDate(date) {
    this.dates.push(GDate.newDate(date));
  }

  addRange(startDate, endDate) {
    this.ranges.push(new DateRange(startDate, endDate));
  }

  toJSON() {
    const obj = {};
    obj.dates = this.dates.map((d) => d.toJSON());
    obj.ranges = this.ranges.map((r) => r.toJSON());
    return obj;
  }
};

var date_filter = DateFilter$2;

let ContentFilter$2 = class ContentFilter {
  constructor() {
    this.includedContentCategories = [];
    this.excludedContentCategories = [];
  }

  addIncludedContentCategories(cat) {
    this.includedContentCategories.push(cat);
  }

  addExcludedContentCategories(cat) {
    this.excludedContentCategories.push(cat);
  }

  toJSON() {
    return {
      includedContentCategories: this.includedContentCategories,
      excludedContentCategories: this.excludedContentCategories,
    };
  }
};

var content_filter = ContentFilter$2;

const {MEDIA_TYPE: MEDIA_TYPE$1} = media_items$1;

let MediaTypeFilter$2 = class MediaTypeFilter {
  constructor(type = MEDIA_TYPE$1.ALL_MEDIA) {
    this.mediaTypes = [type];
  }

  setType(type) {
    this.mediaTypes = [type];
  }

  toJSON() {
    return {
      mediaTypes: this.mediaTypes,
    };
  }
};

var media_type_filter = MediaTypeFilter$2;

const DateFilter$1 = date_filter;
const MediaTypeFilter$1 = media_type_filter;
const ContentFilter$1 = content_filter;

let Filters$1 = class Filters {
  constructor(includeArchivedMedia = false) {
    this.includeArchivedMedia = includeArchivedMedia;
  }

  setDateFilter(dateFilter) {
    this.dateFilter = dateFilter;
    return this;
  }

  setContentFilter(contentFilter) {
    this.contentFilter = contentFilter;
    return this;
  }

  setMediaTypeFilter(mediaTypeFilter) {
    this.mediaTypeFilter = mediaTypeFilter;
    return this;
  }

  setIncludeArchivedMedia(includeArchivedMedia) {
    this.includeArchivedMedia = includeArchivedMedia;
    return this;
  }

  toJSON() {
    return {
      dateFilter:
        this.dateFilter instanceof DateFilter$1 ? this.dateFilter.toJSON() : this.dateFilter,
      mediaTypeFilter:
        this.mediaTypeFilter instanceof MediaTypeFilter$1
          ? this.mediaTypeFilter.toJSON()
          : this.mediaTypeFilter,
      contentFilter:
        this.contentFilter instanceof ContentFilter$1
          ? this.contentFilter.toJSON()
          : this.contentFilter,
      includeArchivedMedia: this.includeArchivedMedia,
    };
  }
};

var filters = Filters$1;

const Albums = albums;
const SharedAlbums = shared_albums;
const MediaItems = media_items;

const TextEnrichment = text_enrichment;
const MapEnrichment = map_enrichment;
const LocationEnrichment = location_enrichment;
const Location = location;
const AlbumPosition = album_position;
const Transport = transport;

const {CONTENT_CATEGORY, MEDIA_TYPE} = media_items$1;
const SCOPES = scopes;
const DateFilter = date_filter;
const ContentFilter = content_filter;
const MediaTypeFilter = media_type_filter;
const Filters = filters;

class Photos {
  constructor(authToken) {
    this.transport = new Transport(authToken);
    this.albums = new Albums(this.transport);
    this.sharedAlbums = new SharedAlbums(this.transport);
    this.mediaItems = new MediaItems(this.transport);

    this.Location = Location;
    this.TextEnrichment = TextEnrichment;
    this.MapEnrichment = MapEnrichment;
    this.LocationEnrichment = LocationEnrichment;
    this.AlbumPosition = AlbumPosition;

    this.ContentCategory = CONTENT_CATEGORY;
    this.MediaType = MEDIA_TYPE;
    this.DateFilter = DateFilter;
    this.ContentFilter = ContentFilter;
    this.MediaTypeFilter = MediaTypeFilter;
    this.Filters = Filters;
  }
}

Photos.Scopes = SCOPES;

var lib = Photos;

var Photos$1 = /*@__PURE__*/getDefaultExportFromCjs(lib);

class WebpEncoder {
  constructor() {
    this.size = 960;
    this._init();
  }
  
  async _init() {
    await importScript('./third-party/webp/enc/webp_enc.js');
    
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
    this.size = size;
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

const webpEncoder = new WebpEncoder();

var ImageMixin = mixin => class ImageMixin extends mixin {
  constructor() {
    super();
  }
  
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
  }
  
  /**
   * encode image and resize 
   * @return <Promise(img)>
   */
  encodeAndResize(img, size, quality, enc = 'webp') {
    if (enc === 'webp') return webpEncoder.encode(img, size, quality)
  }
  
  /**
   * add image to ipfs and save it's path to firebase
   */  
  async addImage(key, name, img, size, quality) {
    new Photos$1(user.getToken());
    img = await this.encodeAndResize(img, size, quality);

    const value = await ipfs.add(img);
    const hash = value.cid.toString();
    if (name === 0) await firebase.database().ref(`images/${key}/timestamp`).set(new Date().getTime());
    
    await firebase.database().ref(`images/${key}/${name}`).set(hash);
  }
};

class ProductEditorMixin extends ImageMixin(ElementBase) {
  get actionBar() {
    return this.shadowRoot.querySelector('shop-admin-action-bar')
  }
  get publicIcon() {
    return this.actionBar.shadowRoot.querySelector('[icon="public"]');
  }
  get deleteButton() {
    return this.actionBar.shadowRoot.querySelector('[icon="delete"]');
  }
  get saveButton() {
    return this.actionBar.shadowRoot.querySelector('[icon="save"]');
  }
  get nails() {
    return this.shadowRoot.querySelector('image-nails');
  }
  set value(value) {
    this._value = value;
    if (this.rendered) this.stamp();
  }
  
  isOnline() {
    return navigator.onLine;
  }

  constructor(ref = 'products') {
    super();
    this._onNailUpload = this._onNailUpload.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onPublic = this._onPublic.bind(this);
    // this._onSave = this._onSave.bind(this);
    this._onImageSwiped = this._onImageSwiped.bind(this);
    this.runJobQue = this.runJobQue.bind(this);
    this.ref = ref;
    this.jobs = [];
    
    
    window.addEventListener('online', this.runJobQue, false);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (this._value) this.stamp();
    this.nails.addEventListener('nail-upload', this._onNailUpload);
    this.nails.addEventListener('image-swiped', this._onImageSwiped);
    
    this.publicIcon.addEventListener('click', this._onPublic);
    // this.saveButton.addEventListener('click', this._onSave);
    this.deleteButton.addEventListener('click', this._onDelete);
  }
  
  async runJobQue() {
    if (this.jobs.length > 0 && this.isOnline()) {
      const [url, options, name] = this.jobs.shift();
      await fetch(url, options);
      // notificationManager()
      new Notification(name + ' updated in background', {tag: 'updated in background'});
    }
    if (this.jobs.length > 0 && this.isOnline()) this.runJobQue();
  }
  
  async _onImageSwiped ({detail}) {
    this.saving = true;
    
    const key = detail.getAttribute('key');
    
    let image = Array.from(this.nails.querySelectorAll('img'));
    if (image.length === 0 || image.length === 1 && image[0].getAttribute('key') === '0') {
      await firebase.database().ref(`images/${this._value}`).remove();
    } else {
      await firebase.database().ref(`images/${this._value}/${key}`).remove();
      if (key === '0') {
        await firebase.database().ref(`images/${this._value}/thumb`).remove();
        await firebase.database().ref(`images/${this._value}/thumbm`).remove();
        await firebase.database().ref(`images/${this._value}/placeholder`).remove();
        image = Array.from(this.nails.querySelectorAll('img'));
        // image[0]
        const hash = image[0].src.replace(`https://guldentopveldwinkel.be/ipfs/`, '');
        if (hash.length !== 94) {
          await this.addImage(this._value, 0, hash, 960, 95);
          await this.addImage(this._value, 'thumbm', hash, 320, 95);
          await this.addImage(this._value, 'thumb', hash, 120, 85);
          await this.addImage(this._value, 'placeholder', hash, 5, 25);
        }
        const timestamp = new Date().getTime();
        await firebase.database().ref(`images/${this._value}/${timestamp}`).set(timestamp);  
      }
      await firebase.database().ref(`images/${this._value}/${key}`).remove();  
    }
    this.saving = false;
  }

//   async _onSave() {
//     console.log('save');
//     const value  = {};
//     const inputs = Array.from(this.querySelectorAll('custom-input'));
//     let image = Array.from(this.nails.querySelectorAll('img'));
//     value.image = {};
//     image = image.map((img, i) => {
//       let src;
//       if (img.src.indexOf('base64') !== -1) src = img.src.split(',')[1];
//       else src = img.src.replace(`https://guldentopveldwinkel.be/ipfs/`, '');
// console.log(img.getAttribute('key'));
//       return [image[img.getAttribute('key')], src];
//     })
//     inputs.forEach((input) => value[input.getAttribute('name')] = input.value);
//     const pub = this.publicIcon.hasAttribute('public');
//     const timestamp = new Date().getTime()
//     const {name, price } = value
//     if (this.ref === 'products') await firebase.database().ref(`${this.ref}/${key}`).set({...value, timestamp})
//     else {
// 
//       delete value.name
//       delete value.price
//       // TODO: more images
//       for (const key of Object.keys(value.image)) {
//         if (!isNaN(Number(key))) await firebase.database().ref(`images/${this._value}/${key}`).set(value.image[key])  
//       }
// 
//       delete value.image
//       await firebase.database().ref(`offerDisplay/${this._value}`).set({name, price, public: pub})      
//       await firebase.database().ref(`${this.ref}/${this._value}`).set({...value, timestamp})
//     }
//     globalThis.pubsub.publish(`event.${this.ref}`, { type: 'change', key: this._value, value: {name, image, public: pub, timestamp, ...value, price}})
//     history.back();
//   }

  async _onNailUpload({ detail }) {
    this.saving = true;
    
    const key = this.nails.children.length > 0 ? this.nails.children.length - 1 : 0;
    console.log(key);
    if (key === 0) {
      await this.addImage(this._value, 'thumbm', detail, 320, 95);
      await this.addImage(this._value, 'thumb', detail, 120, 85);
      await this.addImage(this._value, 'placeholder', detail, 5, 25);  
    }
    await this.addImage(this._value, key, detail, 960, 95);
    
    this.nails.add({ src: detail, key });
    
    this.saving = false;
  }

  async _onPublic() {
    if (this.publicIcon.hasAttribute('public')) this.publicIcon.removeAttribute('public');
    else this.publicIcon.setAttribute('public', '');
    
    await firebase.database().ref(`offerDisplay/${this._value}/public`).set(this.publicIcon.hasAttribute('public'));
    
    globalThis.pubsub.publish(`event.${this.ref}`, { type: 'public', key: this._value, value: this.publicIcon.hasAttribute('public')});
    const timestamp = new Date().getTime();
    await firebase.database().ref(`offerDisplay/${this._value}/timestamp`).set(timestamp);
    history.back();
  }

  async _onDelete() {
    const answer = await confirm('are you sure you want to remove this product?');
    if (!answer) return
    console.log(`${this.ref}/${this._value}`);
    firebase.database().ref(`${this.ref}/${this._value}`).remove();
    if (this.ref === 'offers') {
      firebase.database().ref(`offerDisplay/${this._value}`).remove();
      firebase.database().ref(`images/${this._value}`).remove();
    }
    
    history.back();
    globalThis.pubsub.publish(`event.${this.ref}`, { type: 'delete', key: this._value });
    // }
  }
}

customElements.define('image-nails', class ImageNails extends HTMLElement {
  get input() {
    return this.shadowRoot.querySelector('input');
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.template;

    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._ondragover = this._ondragover.bind(this);
    this._ondrop = this._ondrop.bind(this);
    this._addToPhotos = this._addToPhotos.bind(this);
    // this.reset = this.reset.bind(this);
    this.targetBCR = null;
    this.target = null;
    this.startY = 0;
    this.currentY = 0;
    this.screenY = 0;
    this.targetY = 0;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.addEventListener('touchstart', this._onTouchStart, { passive: true });

    this.addEventListener('touchend', this._onTouchEnd, { passive: true });
    this.addEventListener('mousedown', this._onTouchStart, { passive: true });

    this.addEventListener('mouseup', this._onTouchEnd, { passive: true });

    this.addEventListener('drop', this._ondrop);
    this.addEventListener('dragover', this._ondragover);
    this.shadowRoot.querySelector('[icon="add-to-photos"]').addEventListener('click', this._addToPhotos);

    this.input.onchange = () => {
      for (let i = 0; i < this.input.files.length; ++i) {
        this._readFile(this.input.files[i]);
      }
    };
  }

  set currentY(value) {
    this._currentY = value;
    requestAnimationFrame(() => {
      if (this.dragging === false && this.lastDragging === false) return;
      if (this.boundingClientRect) {
        const height = this.boundingClientRect.height;
        let y = this.screenY || 0;
        if (this.dragging && this.currentY) {
          y = this.currentY - this.startY;
        } else {
          y += (this.y - y) / 2;
        }
        const normalizedDistance = (Math.abs(y) / height);
        const opacity = 1 - Math.pow(normalizedDistance, 1.8);
        this.selected.style.transform = `translateY(${y}px)`;
        this.selected.style.opacity = opacity;
        this.screenY = y;
        if (this.dragging) return this.selected.classList.add('dragging');
        const isNearlyInvisible = (opacity < 0.50);
        if (isNearlyInvisible) {
          this.selected.classList.add('swiped');
          const detail = this.selected;
          this.dispatchEvent(new CustomEvent('image-swiped', { detail }));
          this.removeChild(this.selected);
          this.reset();
        }	else {
          this.reset();
        }
      }
      this.lastDragging = this.dragging;
    });
  }

  get currentY() {
    return this._currentY;
  }

  /**
    * @param {boolean} value
    */
  set dragging(value) {
    this._dragging = value;
  }
  /**
    * @param {object} value
    */
  set boundingClientRect(value) {
    this._boundingClientRect = value;
  }
  /**
    * @return {boolean}
    * @default false
    */
  get dragging() {
    return this._dragging || false;
  }
  /**
    * @return {object}
    */
  get boundingClientRect() {
    return this._boundingClientRect;
  }
  /**
    * @return {number}
    */
  get threshold() {
    return this.boundingClientRect.height * 0.35;
  }
  /**
    * @param {object} event
    */
  _onTouchStart(event) {
    this.selected = event.path[0];
    if (this.selected.localName !== 'img') return;
    this.reset();

    this.addEventListener('touchmove', this._onTouchMove, { passive: true });
    this.addEventListener('mousemove', this._onTouchMove, { passive: true });
    this.boundingClientRect = this.getBoundingClientRect();
    this.startY = event.pageY || event.touches[0].pageY;
    this.currentY = this.startY;
    this.selected.style.willChange = 'transform';
    this.dragging = true;
  }
  /**
    * @param {object} event
    */
  _onTouchMove(event) {
    if (this.dragging) this.currentY = event.pageY || event.touches[0].pageY;
  }
  /**
    * @param {object} event
    */
  _onTouchEnd(event) {
    if (!this.selected) return;
    const y = this.currentY - this.startY;
    const height = this.boundingClientRect.height;
    this.y = 0;
    if (Math.abs(y) > this.threshold) {
      this.y = (y > 0) ? height : -height;
    }
    this.currentY = 0;
    this.lastDragging = this.dragging;
    this.dragging = false;
    this.removeEventListener('touchmove', this._onTouchMove, { passive: true });
    this.removeEventListener('mousemove', this._onTouchMove, { passive: true });
  }

  reset() {
    this.dragging = false;
    this.selected.style.willChange = 'initial';
    this.selected.style.transform = 'none';
    this.selected.style.opacity = 1;
    this.screenY = 0;
    this.currentY = 0;
    this.startY = 0;
    this.y = 0;
    this.selected.classList.remove('dragging');
  }

  add({ key, src }) {
    const img = document.createElement('img');
    img.src = src;
    img.setAttribute('key', key);
    this.appendChild(img);
  }

  _readFile(file) {
    const reader = new FileReader();
    reader.onload = () => this.upload(reader.result);
    reader.readAsDataURL(file);
  }

  _ondragover(event) {
    event.preventDefault();
  }

  _ondrop(event) {
    console.log('File(s) dropped');
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (event.dataTransfer.items[i].kind === 'file') {
          this._readFile(event.dataTransfer.items[i].getAsFile());
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < event.dataTransfer.files.length; i++) {
        this._readFile(event.dataTransfer.files[i]);
      }
    }
  }

  _addToPhotos() {
    this.input.click();
  }

  upload(dataURL) {
    this.dispatchEvent(new CustomEvent('nail-upload', { detail: dataURL }));
  }

  remove() {

  }

  clear() {
    Array.from(this.children).forEach((child) => this.removeChild(child));
  }

  get template() {
    return `
<style>
  :host {
    display: flex;
    flex-direction: row;
    max-height: 176px;
    height: 100%;
    width: 100%;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -2px rgba(0, 0, 0, 0.2);
                
    border: 1px solid #38464e;
    user-select: none;
    padding: 24px;
    box-sizing: border-box;
    min-height: 176px;
    }
  ::slotted(.swiped) {
    display: none;
  }
  ::slotted(.dragging) {
    user-select: none;
    pointer-events: none;
  }
  ::slotted(img) {
    height: 120px;
    width: 120px;
    pointer-events: auto;
    cursor: pointer;
    user-select: none;
    position: initial !important;
    image-rendering: -webkit-optimize-contrast;
  }
  input {
    opacity: 0;
    position: fixed;

  }
</style>
<slot></slot>
<custom-svg-icon icon="add-to-photos"></custom-svg-icon>
<input type="file" accept="image/*"></input>
    `;
  }
});

define(class CustomContainer extends ElementBase$1 {
  constructor() {
    super();
  }

  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 24px 24px 48px;
  }
  :host([row]) {
    flex-direction: column;
  }
  @media (min-width: 720px) {
    ::slotted(*) {
      max-width: 720px;
    }
  }
</style>
<slot></slot>
    `;
  }
});

(() => {
  class CustomInput extends HTMLElement {
    static get observedAttributes() {
      return ['placeholder', 'value', 'type', 'autocomplete', 'name'];
    }
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = this.template;
    }
    set autocomplete(val) {
      this.input.setAttribute('autocomplete', val);
    }
    set name(val) {
      this.input.setAttribute('name', val);
    }
    set type(val) {
      this.input.setAttribute('type', val);
    }
    set placeholder(val) {
      this.input.setAttribute('placeholder', val);
    }
    set value(val) {
      this.input.setAttribute('value', val);
    }
    get autocomplete() {
      return this.input.autocomplete;
    }
    get input() {
      return this.shadowRoot.querySelector('input');
    }
    get value() {
      return this.input.value;
    }
    get name() {
      return this.input.name;
    }
    addListener(name, cb) {
      if(name === 'input' || name === 'change' || name === 'value') {
        this.input.addEventListener(name, cb);
      } else {
        this.addEventListener(name, cb);
      }
    }
    attributeChangedCallback(name, old, value) {
      if (old !== value) this[name] = value;
    }
    get template() {
      return `
        <style>
          :host {
            display: flex;
            align-items: center;
            height: var(--custom-input-height, 48px);
            background: var(--custom-input-background, transparent);
            width: 100%;
            box-shadow: 0px 1px 3px -1px #333;
            min-width: 240px;
            --custom-input-color: #555;
            --custom-input-outline: none;
          }
          input {
            --webkit-visibility: none;
            border: none;
            background: transparent;
            height: var(--custom-input-height, 48px);
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            color: var(--custom-input-color, #555);
            outline: var(--custom-input-outline);
          }

          ::placeholder {
            color: var(--custom-input-placeholder-color, --custom-input-color);
          }
        </style>
        <slot name="before"></slot>
        <input></input>
        <slot name="after"></slot>
      `;
    }
  }  customElements.define('custom-input', CustomInput);
})();

var topProduct = define(class TopProduct extends ProductEditorMixin {
  set value(value) {
    this._value = value;
    if (this.rendered) this.stamp();
  }

  constructor() {
    super();
    this.ref = 'products';
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (this._value) this.stamp();
  }

  stamp() {
    this.innerHTML = '';
    this.nails.innerHTML = '';
    firebase.database().ref(`products/${this._value}`).once('value').then((snap) => {
      const value = snap.val();
      console.log({ value });
      for (const item of Object.keys(value)) {
        console.log(value[item]);
        let val = value[item];
        if (item === 'image') {
          if (typeof val === 'object') val = [...Object.entries(val)];
          if (!Array.isArray(val)) val = [val];
          val.forEach(([key, src]) => {
            console.log(key, src);
            this.nails.add({ key, src: `https://ipfs.io/ipfs/${src}` });
          });
        } else {
          if (item !== 'packageCount') {
            const input = this.shadowRoot.querySelector(`custom-input[name="${item}"]`);
            input.value = val;
          } else {
            this.packageCount = val;
          }
        }

        // this.innerHTML += `${item}: <br>${value[item]}<br><br>`
      }
      // this.innerHTML = JSON.stringify(snap.val());
      this.render({ packageCount: this.packageCount });
    });
  }
  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  custom-input {
    color: #eee;
    /* box-shadow: 0px 1px 3px 1px #eee; */
    border: 1px solid #38464e;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
  custom-container {
    overflow-y: auto;
  }
  .column {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
<custom-container>

<image-nails></image-nails>

<span class="column">
  <h4><translated-string>name</translated-string></h4>
  <custom-input name="name" type="text"></custom-input>
</span>

<span class="column">
  <h4><translated-string>description</translated-string></h4>
  <custom-input name="description" type="text"></custom-input>
</span>

<span class="column">
  <h4><translated-string>portion</translated-string></h4>
  <custom-input name="portion" type="text"></custom-input>
</span>

<span class="column">
  <h4><translated-string>stockCount</translated-string></h4>
  <custom-input name="stockCount" type="number"></custom-input>
</span>
<span class="column">
  <h4><translated-string>packageCount</translated-string></h4>
  <span name="packageCount">${'packageCount'}</span>
</span>
</custom-container>

<shop-admin-action-bar></shop-admin-action-bar>`;
  }
});

export { topProduct as default };
