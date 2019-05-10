
/**
 *
 */
export default (() => {
  class DeviceApi {
    constructor() {
      window.deviceApi = this;
    }

    async _createCameraStream() {
      if (!this._cameraStream) {
        const gotMedia = mediaStream => {
          this._cameraStream = mediaStream;
          const mediaStreamTrack = mediaStream.getVideoTracks()[0];
          this._imageCapture = new ImageCapture(mediaStreamTrack);
        }

        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        return gotMedia(stream);
      }
    }

    async _previewCamera(el) {
      if (!el) throw 'No target HTMLElement defined';
      if (!this._cameraStream) await this._createCameraStream();
      el.srcObject = this._cameraStream;
    }

    /**
     * @param {string} el - camera methods
     *
     */
    get camera() {
      return {
        preview: el => this._previewCamera(el),
        takePhoto: async (img) => {
          if (!this._cameraStream) await this._createCameraStream();
          const blob = await this._imageCapture.takePhoto();
          const url = URL.createObjectURL(blob);
          if (img) {
            img.src = url;
            img.onload = () => { URL.revokeObjectURL(img.src) };
            return;
          }
          this._cameraStream = null;
          return url;
        }
      }
    }
  }
  new DeviceApi();
})();
