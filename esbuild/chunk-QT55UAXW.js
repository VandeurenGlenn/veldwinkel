import {
  ElementBase as ElementBase2,
  define_default
} from "./chunk-JGNXSNDS.js";
import {
  __async,
  __commonJS,
  __esm,
  __export,
  __require,
  __toCommonJS,
  __toESM
} from "./chunk-DZ5PPEG7.js";

// node_modules/googlephotos/constants/album.js
var require_album = __commonJS({
  "node_modules/googlephotos/constants/album.js"(exports, module) {
    "use strict";
    var ALBUM = {
      BASE_PATH: "v1/albums",
      ENRICHMENTS: {
        TEXT: "text",
        LOCATION: "location",
        MAP: "map"
      },
      POSITION_TYPE: {
        POSITION_TYPE_UNSPECIFIED: "POSITION_TYPE_UNSPECIFIED",
        FIRST_IN_ALBUM: "FIRST_IN_ALBUM",
        LAST_IN_ALBUM: "LAST_IN_ALBUM",
        AFTER_MEDIA_ITEM: "AFTER_MEDIA_ITEM",
        AFTER_ENRICHMENT_ITEM: "AFTER_ENRICHMENT_ITEM"
      }
    };
    module.exports = ALBUM;
  }
});

// node_modules/googlephotos/lib/albums/shared_album_options.js
var require_shared_album_options = __commonJS({
  "node_modules/googlephotos/lib/albums/shared_album_options.js"(exports, module) {
    "use strict";
    var SharedAlbumOptions = class {
      constructor(isCollaborative, isCommentable) {
        this.isCollaborative = isCollaborative;
        this.isCommentable = isCommentable;
      }
      toJson() {
        return {
          isCollaborative: this.isCollaborative,
          isCommentable: this.isCommentable
        };
      }
    };
    module.exports = SharedAlbumOptions;
  }
});

// node_modules/googlephotos/lib/albums/enrichment.js
var require_enrichment = __commonJS({
  "node_modules/googlephotos/lib/albums/enrichment.js"(exports, module) {
    "use strict";
    var constants = require_album();
    var Enrichment = class {
      constructor() {
        if (this.constructor.name === "Enrichment") {
          throw Error("Create either a text, location or map enrichment.");
        }
      }
      getJSON() {
        let key;
        if (this.type === constants.ENRICHMENTS.TEXT) {
          key = "textEnrichment";
        } else if (this.type === constants.ENRICHMENTS.LOCATION) {
          key = "locationEnrichment";
        } else if (this.type === constants.ENRICHMENTS.MAP) {
          key = "mapEnrichment";
        }
        return {
          [key]: this.getEnrichmentJson()
        };
      }
    };
    module.exports = Enrichment;
  }
});

// node_modules/googlephotos/lib/albums/album_position.js
var require_album_position = __commonJS({
  "node_modules/googlephotos/lib/albums/album_position.js"(exports, module) {
    "use strict";
    var { POSITION_TYPE } = require_album();
    var AlbumPosition = class {
      constructor(position) {
        this.position = position;
      }
      setRelativeItemId(itemId) {
        if (this.position === POSITION_TYPE.AFTER_ENRICHMENT_ITEM || this.position === POSITION_TYPE.AFTER_MEDIA_ITEM) {
          this.relativeItemId = itemId;
        } else {
          throw Error("Cannot set relative item for this type");
        }
      }
      getJson() {
        const albumPosition = {
          position: this.position
        };
        if (this.position === POSITION_TYPE.AFTER_ENRICHMENT_ITEM) {
          albumPosition.relativeEnrichmentItemId = this.itemId;
        } else if (this.position === POSITION_TYPE.AFTER_MEDIA_ITEM) {
          albumPosition.relativeMediaItemId = this.itemId;
        }
        return albumPosition;
      }
    };
    AlbumPosition.POSITIONS = POSITION_TYPE;
    module.exports = AlbumPosition;
  }
});

// node_modules/googlephotos/lib/albums/album.js
var require_album2 = __commonJS({
  "node_modules/googlephotos/lib/albums/album.js"(exports, module) {
    "use strict";
    var Album = class {
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
          shareInfo: this.shareInfo
        };
      }
    };
    module.exports = Album;
  }
});

// node_modules/googlephotos/lib/albums/index.js
var require_albums = __commonJS({
  "node_modules/googlephotos/lib/albums/index.js"(exports, module) {
    "use strict";
    var constants = require_album();
    var SharedAlbumOptions = require_shared_album_options();
    var Enrichment = require_enrichment();
    var AlbumPosition = require_album_position();
    var Album = require_album2();
    var Albums = class {
      constructor(transport) {
        this.transport = transport;
      }
      list(pageSize = 50, pageToken) {
        const params = { pageSize };
        if (pageToken) {
          params.pageToken = pageToken;
        }
        return this.transport.get(constants.BASE_PATH, params);
      }
      get(albumId) {
        return this.transport.get(`${constants.BASE_PATH}/${albumId}`);
      }
      create(title) {
        const album = Album.albumForCreation(title);
        return this.transport.post(constants.BASE_PATH, {
          album: album.toJson()
        });
      }
      share(albumId, isCollaborative, isCommentable) {
        const shareOptions = {
          sharedAlbumOptions: new SharedAlbumOptions(isCollaborative, isCommentable).toJson()
        };
        return this.transport.post(`${constants.BASE_PATH}/${albumId}:share`, shareOptions);
      }
      unshare(albumId) {
        return this.transport.post(`${constants.BASE_PATH}/${albumId}:unshare`);
      }
      addEnrichment(albumId, enrichmentItem, albumPosition) {
        const params = {};
        const enrichmentJson = enrichmentItem instanceof Enrichment ? enrichmentItem.getJSON() : enrichmentItem;
        const positionJson = albumPosition instanceof AlbumPosition ? albumPosition.getJson() : albumPosition;
        if (enrichmentItem) {
          params.newEnrichmentItem = enrichmentJson;
        }
        if (albumPosition) {
          params.albumPosition = positionJson;
        }
        return this.transport.post(`${constants.BASE_PATH}/${albumId}:addEnrichment`, params);
      }
      batchAddMediaItems(albumId, mediaItemIds) {
        if (!mediaItemIds || mediaItemIds.length <= 0) {
          throw Error("mediaItems must be passed");
        }
        const params = {
          mediaItemIds
        };
        return this.transport.post(`${constants.BASE_PATH}/${albumId}:batchAddMediaItems`, params);
      }
      batchRemoveMediaItems(albumId, mediaItemIds) {
        if (!mediaItemIds || mediaItemIds.length <= 0) {
          throw Error("mediaItems must be passed");
        }
        const params = {
          mediaItemIds
        };
        return this.transport.post(`${constants.BASE_PATH}/${albumId}:batchRemoveMediaItems`, params);
      }
    };
    module.exports = Albums;
  }
});

// node_modules/googlephotos/constants/shared_albums.js
var require_shared_albums = __commonJS({
  "node_modules/googlephotos/constants/shared_albums.js"(exports, module) {
    "use strict";
    var SHARED_ALBUMS = {
      BASE_PATH: "v1/sharedAlbums"
    };
    module.exports = SHARED_ALBUMS;
  }
});

// node_modules/googlephotos/lib/shared_albums/index.js
var require_shared_albums2 = __commonJS({
  "node_modules/googlephotos/lib/shared_albums/index.js"(exports, module) {
    "use strict";
    var constants = require_shared_albums();
    var SharedAlbums = class {
      constructor(transport) {
        this.transport = transport;
      }
      get(shareToken) {
        return this.transport.get(`${constants.BASE_PATH}/${shareToken}`);
      }
      join(shareToken) {
        return this.transport.post(`${constants.BASE_PATH}:join`, { shareToken });
      }
      leave(shareToken) {
        return this.transport.post(`${constants.BASE_PATH}:leave`, { shareToken });
      }
      list(pageSize = 50, pageToken) {
        return this.transport.get(constants.BASE_PATH, { pageSize, pageToken });
      }
    };
    module.exports = SharedAlbums;
  }
});

// node_modules/lodash.chunk/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.chunk/index.js"(exports, module) {
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeCeil = Math.ceil;
    var nativeMax = Math.max;
    function baseSlice(array, start, end) {
      var index = -1, length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isIterateeCall(value, index, object) {
      if (!isObject2(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    function chunk(array, size, guard) {
      if (guard ? isIterateeCall(array, size, guard) : size === void 0) {
        size = 1;
      } else {
        size = nativeMax(toInteger(size), 0);
      }
      var length = array ? array.length : 0;
      if (!length || size < 1) {
        return [];
      }
      var index = 0, resIndex = 0, result = Array(nativeCeil(length / size));
      while (index < length) {
        result[resIndex++] = baseSlice(array, index, index += size);
      }
      return result;
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isFunction(value) {
      var tag = isObject2(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject2(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject2(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject2(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = chunk;
  }
});

// node_modules/googlephotos/constants/media_items.js
var require_media_items = __commonJS({
  "node_modules/googlephotos/constants/media_items.js"(exports, module) {
    "use strict";
    var MEDIA_ITEMS = {
      BASE_PATH: "v1/mediaItems",
      VIDEO_PROCESSING_STATUS: {
        UNSPECIFIED: "UNSPECIFIED",
        PROCESSING: "PROCESSING",
        READY: "READY",
        FAILED: "FAILED"
      },
      CONTENT_CATEGORY: {
        NONE: "NONE",
        LANDSCAPES: "LANDSCAPES",
        RECEIPTS: "RECEIPTS",
        CITYSCAPES: "CITYSCAPES",
        LANDMARKS: "LANDMARKS",
        SELFIES: "SELFIES",
        PEOPLE: "PEOPLE",
        PETS: "PETS",
        WEDDINGS: "WEDDINGS",
        BIRTHDAYS: "BIRTHDAYS",
        DOCUMENTS: "DOCUMENTS",
        TRAVEL: "TRAVEL",
        ANIMALS: "ANIMALS",
        FOOD: "FOOD",
        SPORT: "SPORT",
        NIGHT: "NIGHT",
        PERFORMANCES: "PERFORMANCES",
        WHITEBOARDS: "WHITEBOARDS",
        SCREENSHOTS: "SCREENSHOTS",
        UTILITY: "UTILITY"
      },
      MEDIA_TYPE: {
        ALL_MEDIA: "ALL_MEDIA",
        PHOTO: "PHOTO",
        VIDEO: "VIDEO"
      }
    };
    module.exports = MEDIA_ITEMS;
  }
});

// node_modules/googlephotos/lib/media_items/index.js
var require_media_items2 = __commonJS({
  "node_modules/googlephotos/lib/media_items/index.js"(exports, module) {
    "use strict";
    var path = __require("path");
    var chunk = require_lodash();
    var constants = require_media_items();
    var MediaItems = class {
      constructor(transport) {
        this.transport = transport;
      }
      list(pageSize = 50, pageToken) {
        const params = { pageSize };
        if (pageToken) {
          params.pageToken = pageToken;
        }
        return this.transport.get(constants.BASE_PATH, params);
      }
      get(mediaItemId) {
        return this.transport.get(`${constants.BASE_PATH}/${mediaItemId}`);
      }
      batchGet(mediaItemIds) {
        return this.transport.get(`${constants.BASE_PATH}/:batchGet`, mediaItemIds.map((el) => {
          return ["mediaItemIds", el];
        }));
      }
      async upload(albumId, fileName, filePath, description, requestTimeout = 1e4) {
        const url = `${constants.BASE_PATH}/:batchCreate`;
        const token = await this.transport.upload(
          fileName,
          filePath,
          requestTimeout
        );
        return this.transport.post(url, {
          albumId: albumId || "",
          newMediaItems: [
            {
              description: description || "",
              simpleMediaItem: {
                uploadToken: token
              }
            }
          ]
        });
      }
      async uploadMultiple(albumId, files, directoryPath, requestDelay = 1e4, requestTimeout = 1e4) {
        const url = `${constants.BASE_PATH}/:batchCreate`;
        const batchedFiles = chunk(files, 50);
        for (const batch of batchedFiles) {
          const newMediaItems = await Promise.all(
            batch.map(async (file) => {
              const token = await this.transport.upload(
                file.name,
                path.join(directoryPath, file.name),
                requestTimeout
              );
              return {
                description: file.description || "",
                simpleMediaItem: {
                  uploadToken: token
                }
              };
            })
          );
          this.transport.post(url, {
            albumId: albumId || "",
            newMediaItems
          });
          await new Promise((resolve) => setTimeout(resolve, requestDelay));
        }
      }
      search(albumIdOrFilters, pageSize = 50, pageToken) {
        const postBody = { pageSize, pageToken };
        if (typeof albumIdOrFilters === "string" || albumIdOrFilters instanceof String) {
          postBody.albumId = albumIdOrFilters;
        } else {
          postBody.filters = albumIdOrFilters.toJSON();
        }
        return this.transport.post(`${constants.BASE_PATH}:search`, postBody);
      }
    };
    module.exports = MediaItems;
  }
});

// node_modules/googlephotos/lib/albums/text_enrichment.js
var require_text_enrichment = __commonJS({
  "node_modules/googlephotos/lib/albums/text_enrichment.js"(exports, module) {
    "use strict";
    var constants = require_album();
    var Enrichment = require_enrichment();
    var TextEnrichment = class extends Enrichment {
      constructor(content) {
        super();
        this.type = constants.ENRICHMENTS.TEXT;
        this.content = content;
      }
      setContent(content) {
        this.content = content;
      }
      getEnrichmentJson() {
        return {
          text: this.content
        };
      }
    };
    module.exports = TextEnrichment;
  }
});

// node_modules/googlephotos/lib/albums/location.js
var require_location = __commonJS({
  "node_modules/googlephotos/lib/albums/location.js"(exports, module) {
    "use strict";
    var Location = class {
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
            longitude: this.longitude
          }
        };
      }
    };
    module.exports = Location;
  }
});

// node_modules/googlephotos/lib/albums/map_enrichment.js
var require_map_enrichment = __commonJS({
  "node_modules/googlephotos/lib/albums/map_enrichment.js"(exports, module) {
    "use strict";
    var constants = require_album();
    var Location = require_location();
    var Enrichment = require_enrichment();
    var MapEnrichment = class extends Enrichment {
      constructor(origin, destination) {
        super();
        this.type = constants.ENRICHMENTS.MAP;
        if (!(origin instanceof Location) || !(destination instanceof Location)) {
          throw Error("origin and destination are not location");
        }
        this.origin = origin;
        this.destination = destination;
      }
      setContent(origin, destination) {
        this.origin = origin;
        this.destination = destination;
      }
      setOrigin(locationName, latitude, longitude) {
        this.origin = new Location(locationName, latitude, longitude);
        return this;
      }
      setDestination(locationName, latitude, longitude) {
        this.destination = new Location(locationName, latitude, longitude);
        return this;
      }
      getEnrichmentJson() {
        const originJson = this.origin && this.origin.getLocation ? this.origin.getLocation() : {};
        const destinationJson = this.destination && this.destination.getLocation ? this.destination.getLocation() : {};
        return {
          origin: originJson,
          destination: destinationJson
        };
      }
    };
    module.exports = MapEnrichment;
  }
});

// node_modules/googlephotos/lib/albums/location_enrichment.js
var require_location_enrichment = __commonJS({
  "node_modules/googlephotos/lib/albums/location_enrichment.js"(exports, module) {
    "use strict";
    var constants = require_album();
    var Location = require_location();
    var Enrichment = require_enrichment();
    var LocationEnrichment = class extends Enrichment {
      constructor(locationName, latitude, longitude) {
        super();
        this.type = constants.ENRICHMENTS.LOCATION;
        this.location = new Location(locationName, latitude, longitude);
      }
      setContent(locationName, latitude, longitude) {
        this.location.setLocation(locationName, latitude, longitude);
      }
      getEnrichmentJson() {
        return {
          location: this.location.getLocation()
        };
      }
    };
    module.exports = LocationEnrichment;
  }
});

// node_modules/googlephotos/constants/api.js
var require_api = __commonJS({
  "node_modules/googlephotos/constants/api.js"(exports, module) {
    "use strict";
    var API = {
      HOST: "https://photoslibrary.googleapis.com/"
    };
    module.exports = API;
  }
});

// node_modules/ky/index.js
var globals, getGlobal, globalProperties, isObject, supportsAbortController, supportsStreams, supportsFormData, mergeHeaders, deepMerge, requestMethods, responseTypes, retryMethods, retryStatusCodes, retryAfterStatusCodes, stop, HTTPError, TimeoutError, delay, timeout, normalizeRequestMethod, defaultRetryOptions, normalizeRetryOptions, maxSafeTimeout, Ky, validateAndMerge, createInstance, ky_default;
var init_ky = __esm({
  "node_modules/ky/index.js"() {
    globals = {};
    getGlobal = (property) => {
      if (typeof self !== "undefined" && self && property in self) {
        return self;
      }
      if (typeof window !== "undefined" && window && property in window) {
        return window;
      }
      if (typeof global !== "undefined" && global && property in global) {
        return global;
      }
      if (typeof globalThis !== "undefined" && globalThis) {
        return globalThis;
      }
    };
    globalProperties = [
      "Headers",
      "Request",
      "Response",
      "ReadableStream",
      "fetch",
      "AbortController",
      "FormData"
    ];
    for (const property of globalProperties) {
      Object.defineProperty(globals, property, {
        get() {
          const globalObject = getGlobal(property);
          const value = globalObject && globalObject[property];
          return typeof value === "function" ? value.bind(globalObject) : value;
        }
      });
    }
    isObject = (value) => value !== null && typeof value === "object";
    supportsAbortController = typeof globals.AbortController === "function";
    supportsStreams = typeof globals.ReadableStream === "function";
    supportsFormData = typeof globals.FormData === "function";
    mergeHeaders = (source1, source2) => {
      const result = new globals.Headers(source1 || {});
      const isHeadersInstance = source2 instanceof globals.Headers;
      const source = new globals.Headers(source2 || {});
      for (const [key, value] of source) {
        if (isHeadersInstance && value === "undefined" || value === void 0) {
          result.delete(key);
        } else {
          result.set(key, value);
        }
      }
      return result;
    };
    deepMerge = (...sources) => {
      let returnValue = {};
      let headers = {};
      for (const source of sources) {
        if (Array.isArray(source)) {
          if (!Array.isArray(returnValue)) {
            returnValue = [];
          }
          returnValue = [...returnValue, ...source];
        } else if (isObject(source)) {
          for (let [key, value] of Object.entries(source)) {
            if (isObject(value) && key in returnValue) {
              value = deepMerge(returnValue[key], value);
            }
            returnValue = { ...returnValue, [key]: value };
          }
          if (isObject(source.headers)) {
            headers = mergeHeaders(headers, source.headers);
          }
        }
        returnValue.headers = headers;
      }
      return returnValue;
    };
    requestMethods = [
      "get",
      "post",
      "put",
      "patch",
      "head",
      "delete"
    ];
    responseTypes = {
      json: "application/json",
      text: "text/*",
      formData: "multipart/form-data",
      arrayBuffer: "*/*",
      blob: "*/*"
    };
    retryMethods = [
      "get",
      "put",
      "head",
      "delete",
      "options",
      "trace"
    ];
    retryStatusCodes = [
      408,
      413,
      429,
      500,
      502,
      503,
      504
    ];
    retryAfterStatusCodes = [
      413,
      429,
      503
    ];
    stop = Symbol("stop");
    HTTPError = class extends Error {
      constructor(response) {
        super(
          response.statusText || String(
            response.status === 0 || response.status ? response.status : "Unknown response error"
          )
        );
        this.name = "HTTPError";
        this.response = response;
      }
    };
    TimeoutError = class extends Error {
      constructor(request) {
        super("Request timed out");
        this.name = "TimeoutError";
        this.request = request;
      }
    };
    delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    timeout = (request, abortController, options) => new Promise((resolve, reject) => {
      const timeoutID = setTimeout(() => {
        if (abortController) {
          abortController.abort();
        }
        reject(new TimeoutError(request));
      }, options.timeout);
      options.fetch(request).then(resolve).catch(reject).then(() => {
        clearTimeout(timeoutID);
      });
    });
    normalizeRequestMethod = (input) => requestMethods.includes(input) ? input.toUpperCase() : input;
    defaultRetryOptions = {
      limit: 2,
      methods: retryMethods,
      statusCodes: retryStatusCodes,
      afterStatusCodes: retryAfterStatusCodes
    };
    normalizeRetryOptions = (retry = {}) => {
      if (typeof retry === "number") {
        return {
          ...defaultRetryOptions,
          limit: retry
        };
      }
      if (retry.methods && !Array.isArray(retry.methods)) {
        throw new Error("retry.methods must be an array");
      }
      if (retry.statusCodes && !Array.isArray(retry.statusCodes)) {
        throw new Error("retry.statusCodes must be an array");
      }
      return {
        ...defaultRetryOptions,
        ...retry,
        afterStatusCodes: retryAfterStatusCodes
      };
    };
    maxSafeTimeout = 2147483647;
    Ky = class {
      constructor(input, options = {}) {
        this._retryCount = 0;
        this._input = input;
        this._options = {
          // TODO: credentials can be removed when the spec change is implemented in all browsers. Context: https://www.chromestatus.com/feature/4539473312350208
          credentials: this._input.credentials || "same-origin",
          ...options,
          headers: mergeHeaders(this._input.headers, options.headers),
          hooks: deepMerge({
            beforeRequest: [],
            beforeRetry: [],
            afterResponse: []
          }, options.hooks),
          method: normalizeRequestMethod(options.method || this._input.method),
          prefixUrl: String(options.prefixUrl || ""),
          retry: normalizeRetryOptions(options.retry),
          throwHttpErrors: options.throwHttpErrors !== false,
          timeout: typeof options.timeout === "undefined" ? 1e4 : options.timeout,
          fetch: options.fetch || globals.fetch
        };
        if (typeof this._input !== "string" && !(this._input instanceof URL || this._input instanceof globals.Request)) {
          throw new TypeError("`input` must be a string, URL, or Request");
        }
        if (this._options.prefixUrl && typeof this._input === "string") {
          if (this._input.startsWith("/")) {
            throw new Error("`input` must not begin with a slash when using `prefixUrl`");
          }
          if (!this._options.prefixUrl.endsWith("/")) {
            this._options.prefixUrl += "/";
          }
          this._input = this._options.prefixUrl + this._input;
        }
        if (supportsAbortController) {
          this.abortController = new globals.AbortController();
          if (this._options.signal) {
            this._options.signal.addEventListener("abort", () => {
              this.abortController.abort();
            });
          }
          this._options.signal = this.abortController.signal;
        }
        this.request = new globals.Request(this._input, this._options);
        if (this._options.searchParams) {
          const searchParams = "?" + new URLSearchParams(this._options.searchParams).toString();
          const url = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, searchParams);
          if ((supportsFormData && this._options.body instanceof globals.FormData || this._options.body instanceof URLSearchParams) && !(this._options.headers && this._options.headers["content-type"])) {
            this.request.headers.delete("content-type");
          }
          this.request = new globals.Request(new globals.Request(url, this.request), this._options);
        }
        if (this._options.json !== void 0) {
          this._options.body = JSON.stringify(this._options.json);
          this.request.headers.set("content-type", "application/json");
          this.request = new globals.Request(this.request, { body: this._options.body });
        }
        const fn = async () => {
          if (this._options.timeout > maxSafeTimeout) {
            throw new RangeError(`The \`timeout\` option cannot be greater than ${maxSafeTimeout}`);
          }
          await delay(1);
          let response = await this._fetch();
          for (const hook of this._options.hooks.afterResponse) {
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
          if (this._options.onDownloadProgress) {
            if (typeof this._options.onDownloadProgress !== "function") {
              throw new TypeError("The `onDownloadProgress` option must be a function");
            }
            if (!supportsStreams) {
              throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");
            }
            return this._stream(response.clone(), this._options.onDownloadProgress);
          }
          return response;
        };
        const isRetriableMethod = this._options.retry.methods.includes(this.request.method.toLowerCase());
        const result = isRetriableMethod ? this._retry(fn) : fn();
        for (const [type, mimeType] of Object.entries(responseTypes)) {
          result[type] = async () => {
            this.request.headers.set("accept", this.request.headers.get("accept") || mimeType);
            const response = (await result).clone();
            if (type === "json") {
              if (response.status === 204) {
                return "";
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
            const retryAfter = error.response.headers.get("Retry-After");
            if (retryAfter && this._options.retry.afterStatusCodes.includes(error.response.status)) {
              let after = Number(retryAfter);
              if (Number.isNaN(after)) {
                after = Date.parse(retryAfter) - Date.now();
              } else {
                after *= 1e3;
              }
              if (typeof this._options.retry.maxRetryAfter !== "undefined" && after > this._options.retry.maxRetryAfter) {
                return 0;
              }
              return after;
            }
            if (error.response.status === 413) {
              return 0;
            }
          }
          const BACKOFF_FACTOR = 0.3;
          return BACKOFF_FACTOR * 2 ** (this._retryCount - 1) * 1e3;
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
              const hookResult = await hook({
                request: this.request,
                options: this._options,
                error,
                retryCount: this._retryCount
              });
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
        const totalBytes = Number(response.headers.get("content-length")) || 0;
        let transferredBytes = 0;
        return new globals.Response(
          new globals.ReadableStream({
            start(controller) {
              const reader = response.body.getReader();
              if (onDownloadProgress) {
                onDownloadProgress({ percent: 0, transferredBytes: 0, totalBytes }, new Uint8Array());
              }
              async function read() {
                const { done, value } = await reader.read();
                if (done) {
                  controller.close();
                  return;
                }
                if (onDownloadProgress) {
                  transferredBytes += value.byteLength;
                  const percent = totalBytes === 0 ? 0 : transferredBytes / totalBytes;
                  onDownloadProgress({ percent, transferredBytes, totalBytes }, value);
                }
                controller.enqueue(value);
                read();
              }
              read();
            }
          })
        );
      }
    };
    validateAndMerge = (...sources) => {
      for (const source of sources) {
        if ((!isObject(source) || Array.isArray(source)) && typeof source !== "undefined") {
          throw new TypeError("The `options` argument must be an object");
        }
      }
      return deepMerge({}, ...sources);
    };
    createInstance = (defaults) => {
      const ky = (input, options) => new Ky(input, validateAndMerge(defaults, options));
      for (const method of requestMethods) {
        ky[method] = (input, options) => new Ky(input, validateAndMerge(defaults, options, { method }));
      }
      ky.HTTPError = HTTPError;
      ky.TimeoutError = TimeoutError;
      ky.create = (newDefaults) => createInstance(validateAndMerge(newDefaults));
      ky.extend = (newDefaults) => createInstance(validateAndMerge(defaults, newDefaults));
      ky.stop = stop;
      return ky;
    };
    ky_default = createInstance();
  }
});

// node_modules/ky-universal/browser.js
var browser_exports = {};
__export(browser_exports, {
  default: () => ky_default
});
var init_browser = __esm({
  "node_modules/ky-universal/browser.js"() {
    init_ky();
  }
});

// node_modules/googlephotos/lib/transport.js
var require_transport = __commonJS({
  "node_modules/googlephotos/lib/transport.js"(exports, module) {
    "use strict";
    var fs = __require("fs");
    var apiConstants = require_api();
    var ky = (init_browser(), __toCommonJS(browser_exports)).create({
      prefixUrl: apiConstants.HOST
    });
    var Transport = class {
      constructor(authToken) {
        this.authToken = authToken;
      }
      get(endpoint, params) {
        return ky(endpoint, {
          headers: this._getHeaders(),
          searchParams: params
        }).json();
      }
      upload(fileName, filePath, requestTimeout) {
        return ky.post("v1/uploads", {
          headers: {
            "Content-Type": "application/octet-stream",
            Authorization: `Bearer ${this.authToken}`,
            "X-Goog-Upload-File-Name": fileName,
            "X-Goog-Upload-Protocol": "raw"
          },
          body: fs.readFileSync(filePath),
          timeout: requestTimeout
        }).text();
      }
      post(endpoint, params) {
        return ky.post(endpoint, {
          headers: this._getHeaders(),
          json: params
        }).json();
      }
      _getHeaders() {
        return {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`
        };
      }
    };
    module.exports = Transport;
  }
});

// node_modules/googlephotos/constants/scopes.js
var require_scopes = __commonJS({
  "node_modules/googlephotos/constants/scopes.js"(exports, module) {
    "use strict";
    var SCOPES = {
      READ_ONLY: "https://www.googleapis.com/auth/photoslibrary.readonly",
      APPEND_ONLY: "https://www.googleapis.com/auth/photoslibrary.appendonly",
      READ_DEV_DATA: "https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata",
      READ_AND_APPEND: "https://www.googleapis.com/auth/photoslibrary",
      SHARING: "https://www.googleapis.com/auth/photoslibrary.sharing"
    };
    module.exports = SCOPES;
  }
});

// node_modules/googlephotos/lib/common/gdate.js
var require_gdate = __commonJS({
  "node_modules/googlephotos/lib/common/gdate.js"(exports, module) {
    "use strict";
    var GDate = class {
      constructor(year, month, day) {
        Object.assign(this, { year, month, day });
      }
      static fromDate(date) {
        if (!(date instanceof Date)) {
          throw Error("Not a valid date object");
        }
        return new GDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
      }
      static fromMoment(moment) {
        if (!moment || !moment.isMoment || !moment.isMoment()) {
          throw Error("not a valid moment");
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
          day: this.day
        };
      }
    };
    module.exports = GDate;
  }
});

// node_modules/googlephotos/lib/common/date_range.js
var require_date_range = __commonJS({
  "node_modules/googlephotos/lib/common/date_range.js"(exports, module) {
    "use strict";
    var GDate = require_gdate();
    var DateRange = class {
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
            day: this.startDate.day
          };
        } else {
          startJson = GDate.newDate(this.startDate).toJSON();
        }
        if (this.endDate.year && this.endDate.month && this.endDate.day) {
          endJson = {
            year: this.endDate.year,
            month: this.endDate.month,
            day: this.endDate.day
          };
        } else {
          endJson = GDate.newDate(this.endDate).toJSON();
        }
        return {
          startDate: startJson,
          endDate: endJson
        };
      }
    };
    module.exports = DateRange;
  }
});

// node_modules/googlephotos/lib/common/date_filter.js
var require_date_filter = __commonJS({
  "node_modules/googlephotos/lib/common/date_filter.js"(exports, module) {
    "use strict";
    var GDate = require_gdate();
    var DateRange = require_date_range();
    var DateFilter = class {
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
    module.exports = DateFilter;
  }
});

// node_modules/googlephotos/lib/media_items/content_filter.js
var require_content_filter = __commonJS({
  "node_modules/googlephotos/lib/media_items/content_filter.js"(exports, module) {
    "use strict";
    var ContentFilter = class {
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
          excludedContentCategories: this.excludedContentCategories
        };
      }
    };
    module.exports = ContentFilter;
  }
});

// node_modules/googlephotos/lib/media_items/media_type_filter.js
var require_media_type_filter = __commonJS({
  "node_modules/googlephotos/lib/media_items/media_type_filter.js"(exports, module) {
    "use strict";
    var { MEDIA_TYPE } = require_media_items();
    var MediaTypeFilter = class {
      constructor(type = MEDIA_TYPE.ALL_MEDIA) {
        this.mediaTypes = [type];
      }
      setType(type) {
        this.mediaTypes = [type];
      }
      toJSON() {
        return {
          mediaTypes: this.mediaTypes
        };
      }
    };
    module.exports = MediaTypeFilter;
  }
});

// node_modules/googlephotos/lib/media_items/filters.js
var require_filters = __commonJS({
  "node_modules/googlephotos/lib/media_items/filters.js"(exports, module) {
    "use strict";
    var DateFilter = require_date_filter();
    var MediaTypeFilter = require_media_type_filter();
    var ContentFilter = require_content_filter();
    var Filters = class {
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
          dateFilter: this.dateFilter instanceof DateFilter ? this.dateFilter.toJSON() : this.dateFilter,
          mediaTypeFilter: this.mediaTypeFilter instanceof MediaTypeFilter ? this.mediaTypeFilter.toJSON() : this.mediaTypeFilter,
          contentFilter: this.contentFilter instanceof ContentFilter ? this.contentFilter.toJSON() : this.contentFilter,
          includeArchivedMedia: this.includeArchivedMedia
        };
      }
    };
    module.exports = Filters;
  }
});

// node_modules/googlephotos/lib/index.js
var require_lib = __commonJS({
  "node_modules/googlephotos/lib/index.js"(exports, module) {
    "use strict";
    var Albums = require_albums();
    var SharedAlbums = require_shared_albums2();
    var MediaItems = require_media_items2();
    var TextEnrichment = require_text_enrichment();
    var MapEnrichment = require_map_enrichment();
    var LocationEnrichment = require_location_enrichment();
    var Location = require_location();
    var AlbumPosition = require_album_position();
    var Transport = require_transport();
    var { CONTENT_CATEGORY, MEDIA_TYPE } = require_media_items();
    var SCOPES = require_scopes();
    var DateFilter = require_date_filter();
    var ContentFilter = require_content_filter();
    var MediaTypeFilter = require_media_type_filter();
    var Filters = require_filters();
    var Photos2 = class {
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
    };
    Photos2.Scopes = SCOPES;
    module.exports = Photos2;
  }
});

// src/shop-admin-action-bar.js
var shop_admin_action_bar_default = customElements.define("shop-admin-action-bar", class ShopAdminActionBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
    `;
  }
});

// src/admin/image-mixin.js
var import_googlephotos = __toESM(require_lib(), 1);

// src/admin/webp-encoder.js
var WebpEncoder = class {
  constructor() {
    this.size = 960;
    this._init();
  }
  _init() {
    return __async(this, null, function* () {
      yield importScript("./third-party/webp/enc/webp_enc.js");
      this.module = webp_enc();
    });
  }
  get height() {
    return this.img.height / this.img.width * this.size;
  }
  get width() {
    return this.img.width / this.img.width * this.size;
  }
  load(src) {
    return __async(this, null, function* () {
      this.img = document.createElement("img");
      this.img.src = src;
      yield new Promise((resolve) => this.img.onload = resolve);
      const canvas = document.createElement("canvas");
      [canvas.width, canvas.height] = [this.width, this.height];
      const ctx = canvas.getContext("2d");
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
      return ctx.getImageData(0, 0, this.width, this.height);
    });
  }
  encode(src, size, quality = 85) {
    return __async(this, null, function* () {
      this.size = size;
      const image = yield this.load(src);
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
        use_sharp_yuv: 0
      });
      console.log("size", result.length);
      this.module.free_result();
      return result;
    });
  }
};

// src/admin/image-mixin.js
var webpEncoder = new WebpEncoder();
var image_mixin_default = (mixin) => class ImageMixin extends mixin {
  constructor() {
    super();
  }
  connectedCallback() {
    if (super.connectedCallback)
      super.connectedCallback();
  }
  /**
   * encode image and resize 
   * @return <Promise(img)>
   */
  encodeAndResize(img, size, quality, enc = "webp") {
    if (enc === "webp")
      return webpEncoder.encode(img, size, quality);
  }
  /**
   * add image to ipfs and save it's path to firebase
   */
  addImage(key, name, img, size, quality) {
    return __async(this, null, function* () {
      const photos = new import_googlephotos.default(user.getToken());
      img = yield this.encodeAndResize(img, size, quality);
      const value = yield ipfs.add(img);
      const hash = value.cid.toString();
      if (name === 0)
        yield firebase.database().ref(`images/${key}/timestamp`).set((/* @__PURE__ */ new Date()).getTime());
      yield firebase.database().ref(`images/${key}/${name}`).set(hash);
    });
  }
};

// src/admin/product-editor-mixin.js
var ProductEditorMixin = class extends image_mixin_default(ElementBase) {
  get actionBar() {
    return this.shadowRoot.querySelector("shop-admin-action-bar");
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
    return this.shadowRoot.querySelector("image-nails");
  }
  set value(value) {
    this._value = value;
    if (this.rendered)
      this.stamp();
  }
  isOnline() {
    return navigator.onLine;
  }
  constructor(ref = "products") {
    super();
    this._onNailUpload = this._onNailUpload.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onPublic = this._onPublic.bind(this);
    this._onImageSwiped = this._onImageSwiped.bind(this);
    this.runJobQue = this.runJobQue.bind(this);
    this.ref = ref;
    this.jobs = [];
    window.addEventListener("online", this.runJobQue, false);
  }
  connectedCallback() {
    if (super.connectedCallback)
      super.connectedCallback();
    if (this._value)
      this.stamp();
    this.nails.addEventListener("nail-upload", this._onNailUpload);
    this.nails.addEventListener("image-swiped", this._onImageSwiped);
    this.publicIcon.addEventListener("click", this._onPublic);
    this.deleteButton.addEventListener("click", this._onDelete);
  }
  runJobQue() {
    return __async(this, null, function* () {
      if (this.jobs.length > 0 && this.isOnline()) {
        const [url, options, name] = this.jobs.shift();
        yield fetch(url, options);
        new Notification(name + " updated in background", { tag: "updated in background" });
      }
      if (this.jobs.length > 0 && this.isOnline())
        this.runJobQue();
    });
  }
  _onImageSwiped(_0) {
    return __async(this, arguments, function* ({ detail }) {
      this.saving = true;
      const key = detail.getAttribute("key");
      let image = Array.from(this.nails.querySelectorAll("img"));
      if (image.length === 0 || image.length === 1 && image[0].getAttribute("key") === "0") {
        yield firebase.database().ref(`images/${this._value}`).remove();
      } else {
        yield firebase.database().ref(`images/${this._value}/${key}`).remove();
        if (key === "0") {
          yield firebase.database().ref(`images/${this._value}/thumb`).remove();
          yield firebase.database().ref(`images/${this._value}/thumbm`).remove();
          yield firebase.database().ref(`images/${this._value}/placeholder`).remove();
          image = Array.from(this.nails.querySelectorAll("img"));
          const hash = image[0].src.replace(`https://guldentopveldwinkel.be/ipfs/`, "");
          if (hash.length !== 94) {
            yield this.addImage(this._value, 0, hash, 960, 95);
            yield this.addImage(this._value, "thumbm", hash, 320, 95);
            yield this.addImage(this._value, "thumb", hash, 120, 85);
            yield this.addImage(this._value, "placeholder", hash, 5, 25);
          } else {
          }
          const timestamp = (/* @__PURE__ */ new Date()).getTime();
          yield firebase.database().ref(`images/${this._value}/${timestamp}`).set(timestamp);
        }
        yield firebase.database().ref(`images/${this._value}/${key}`).remove();
      }
      this.saving = false;
    });
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
  _onNailUpload(_0) {
    return __async(this, arguments, function* ({ detail }) {
      this.saving = true;
      const key = this.nails.children.length > 0 ? this.nails.children.length - 1 : 0;
      console.log(key);
      if (key === 0) {
        yield this.addImage(this._value, "thumbm", detail, 320, 95);
        yield this.addImage(this._value, "thumb", detail, 120, 85);
        yield this.addImage(this._value, "placeholder", detail, 5, 25);
      }
      yield this.addImage(this._value, key, detail, 960, 95);
      this.nails.add({ src: detail, key });
      this.saving = false;
    });
  }
  _onPublic() {
    return __async(this, null, function* () {
      if (this.publicIcon.hasAttribute("public"))
        this.publicIcon.removeAttribute("public");
      else
        this.publicIcon.setAttribute("public", "");
      yield firebase.database().ref(`offerDisplay/${this._value}/public`).set(this.publicIcon.hasAttribute("public"));
      globalThis.pubsub.publish(`event.${this.ref}`, { type: "public", key: this._value, value: this.publicIcon.hasAttribute("public") });
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      yield firebase.database().ref(`offerDisplay/${this._value}/timestamp`).set(timestamp);
      history.back();
    });
  }
  _onDelete() {
    return __async(this, null, function* () {
      const answer = yield confirm("are you sure you want to remove this product?");
      if (!answer)
        return;
      console.log(`${this.ref}/${this._value}`);
      firebase.database().ref(`${this.ref}/${this._value}`).remove();
      if (this.ref === "offers") {
        firebase.database().ref(`offerDisplay/${this._value}`).remove();
        firebase.database().ref(`images/${this._value}`).remove();
      }
      history.back();
      globalThis.pubsub.publish(`event.${this.ref}`, { type: "delete", key: this._value });
    });
  }
};

// src/image-nails.js
var image_nails_default = customElements.define("image-nails", class ImageNails extends HTMLElement {
  get input() {
    return this.shadowRoot.querySelector("input");
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._ondragover = this._ondragover.bind(this);
    this._ondrop = this._ondrop.bind(this);
    this._addToPhotos = this._addToPhotos.bind(this);
    this.targetBCR = null;
    this.target = null;
    this.startY = 0;
    this.currentY = 0;
    this.screenY = 0;
    this.targetY = 0;
  }
  connectedCallback() {
    if (super.connectedCallback)
      super.connectedCallback();
    this.addEventListener("touchstart", this._onTouchStart, { passive: true });
    this.addEventListener("touchend", this._onTouchEnd, { passive: true });
    this.addEventListener("mousedown", this._onTouchStart, { passive: true });
    this.addEventListener("mouseup", this._onTouchEnd, { passive: true });
    this.addEventListener("drop", this._ondrop);
    this.addEventListener("dragover", this._ondragover);
    this.shadowRoot.querySelector('[icon="add-to-photos"]').addEventListener("click", this._addToPhotos);
    this.input.onchange = () => {
      for (let i = 0; i < this.input.files.length; ++i) {
        this._readFile(this.input.files[i]);
      }
    };
  }
  set currentY(value) {
    this._currentY = value;
    requestAnimationFrame(() => {
      if (this.dragging === false && this.lastDragging === false)
        return;
      if (this.boundingClientRect) {
        const height = this.boundingClientRect.height;
        let y = this.screenY || 0;
        if (this.dragging && this.currentY) {
          y = this.currentY - this.startY;
        } else {
          y += (this.y - y) / 2;
        }
        const normalizedDistance = Math.abs(y) / height;
        const opacity = 1 - Math.pow(normalizedDistance, 1.8);
        this.selected.style.transform = `translateY(${y}px)`;
        this.selected.style.opacity = opacity;
        this.screenY = y;
        if (this.dragging)
          return this.selected.classList.add("dragging");
        const isNearlyInvisible = opacity < 0.5;
        if (isNearlyInvisible) {
          this.selected.classList.add("swiped");
          const detail = this.selected;
          this.dispatchEvent(new CustomEvent("image-swiped", { detail }));
          this.removeChild(this.selected);
          this.reset();
        } else {
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
    if (this.selected.localName !== "img")
      return;
    this.reset();
    this.addEventListener("touchmove", this._onTouchMove, { passive: true });
    this.addEventListener("mousemove", this._onTouchMove, { passive: true });
    this.boundingClientRect = this.getBoundingClientRect();
    this.startY = event.pageY || event.touches[0].pageY;
    this.currentY = this.startY;
    this.selected.style.willChange = "transform";
    this.dragging = true;
  }
  /**
    * @param {object} event
    */
  _onTouchMove(event) {
    if (this.dragging)
      this.currentY = event.pageY || event.touches[0].pageY;
  }
  /**
    * @param {object} event
    */
  _onTouchEnd(event) {
    if (!this.selected)
      return;
    const y = this.currentY - this.startY;
    const height = this.boundingClientRect.height;
    this.y = 0;
    if (Math.abs(y) > this.threshold) {
      this.y = y > 0 ? height : -height;
    }
    this.currentY = 0;
    this.lastDragging = this.dragging;
    this.dragging = false;
    this.removeEventListener("touchmove", this._onTouchMove, { passive: true });
    this.removeEventListener("mousemove", this._onTouchMove, { passive: true });
  }
  reset() {
    this.dragging = false;
    this.selected.style.willChange = "initial";
    this.selected.style.transform = "none";
    this.selected.style.opacity = 1;
    this.screenY = 0;
    this.currentY = 0;
    this.startY = 0;
    this.y = 0;
    this.selected.classList.remove("dragging");
  }
  add({ key, src }) {
    const img = document.createElement("img");
    img.src = src;
    img.setAttribute("key", key);
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
    console.log("File(s) dropped");
    event.preventDefault();
    if (event.dataTransfer.items) {
      for (var i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === "file") {
          this._readFile(event.dataTransfer.items[i].getAsFile());
        }
      }
    } else {
      for (var i = 0; i < event.dataTransfer.files.length; i++) {
        this._readFile(event.dataTransfer.files[i]);
      }
    }
  }
  _addToPhotos() {
    this.input.click();
  }
  upload(dataURL) {
    this.dispatchEvent(new CustomEvent("nail-upload", { detail: dataURL }));
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

// src/custom-container.js
var custom_container_default = define_default(class CustomContainer extends ElementBase2 {
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

// node_modules/custom-input/custom-input.js
var custom_input_default = (() => {
  class CustomInput extends HTMLElement {
    static get observedAttributes() {
      return ["placeholder", "value", "type", "autocomplete", "name"];
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = this.template;
    }
    set autocomplete(val) {
      this.input.setAttribute("autocomplete", val);
    }
    set name(val) {
      this.input.setAttribute("name", val);
    }
    set type(val) {
      this.input.setAttribute("type", val);
    }
    set placeholder(val) {
      this.input.setAttribute("placeholder", val);
    }
    set value(val) {
      this.input.setAttribute("value", val);
    }
    get autocomplete() {
      return this.input.autocomplete;
    }
    get input() {
      return this.shadowRoot.querySelector("input");
    }
    get value() {
      return this.input.value;
    }
    get name() {
      return this.input.name;
    }
    addListener(name, cb) {
      if (name === "input" || name === "change" || name === "value") {
        this.input.addEventListener(name, cb);
      } else {
        this.addEventListener(name, cb);
      }
    }
    attributeChangedCallback(name, old, value) {
      if (old !== value)
        this[name] = value;
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
  }
  ;
  customElements.define("custom-input", CustomInput);
})();

export {
  ProductEditorMixin
};
/*! Bundled license information:

ky/index.js:
  (*! MIT License © Sindre Sorhus *)
*/
