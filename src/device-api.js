export class DeviceApi {
    
    async hasFrontCam() {
      try {
        await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' }
        })
        return true
      } catch (e) {
        return false
      }
    }
    
    async hasBackCam() {
      try {
        await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        })
        return true
      } catch (e) {
        return false
      }
    }
    
    /**
     * @param {string} facingMode ['environment'|'user'] -
     * the desired camera to use
     */
    async _createCameraStream(facingMode = 'environment') {
      if (!this._cameraStream) {
        const gotMedia = (mediaStream) => {
          this._cameraStream = mediaStream;
          const mediaStreamTrack = mediaStream.getVideoTracks()[0];
          this._imageCapture = new ImageCapture(mediaStreamTrack);
        };

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode }
        });
        return gotMedia(stream);
      }
    }
    /**
     * @param {HTMLElement} el
     * @param {string} facingMode ['environment'|'user'] -
     * the desired camera to use
     */
    async _previewCamera(el, facingMode) {
      if (el.srcObject) el.srcObject = null
      if (!el) throw Error('No target HTMLElement defined');
      if (!this._cameraStream) await this._createCameraStream(facingMode);
      el.srcObject = this._cameraStream;
    }

    _close() {
      if (!this._cameraStream) return
      const tracks = this._cameraStream.getTracks()
      
      for (const track of tracks) {
        track.stop()
        this._cameraStream.removeTrack(track)
      }
      
      this._cameraStream = undefined
      this._imageCapture = undefined
    }

    /**
     * @return {object} { preview(), takePhoto(facingMode) } - camera methods
     *
     */
    get camera() {
      return {
        preview: (el, facingMode) => this._previewCamera(el, facingMode),
        takePhoto: async facingMode => {
          if (!this._cameraStream) await this._createCameraStream(facingMode);
          return this._imageCapture.takePhoto();
        },
        close: this._close.bind(this)
      };
    }
  }
  

export default new DeviceApi();