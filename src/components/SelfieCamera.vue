<template>
  <div class="card p-1" style="max-width: 500px">
    <div v-if="!isCameraOpen && !isFileSelected && !isImageLoaded" class="p-2">
      <p style="text-align: left">
        Um beim J🌰 Memory-Spiel mitbachen zu können brauchen wir ein Bild und
        deinen Namen.<br /><br />
        Dazu musst du nur die Kamera deines Handys aktivieren, oder ein Bild
        hochladen. Deinen Vor- und Nachnamen eingeben und abschicken.<br />
        Dann ist dein Bild auch im nächsten Memory mit dabei.
      </p>
    </div>

    <div
      class="camera-button mt-2 mb-2 p-2"
      v-if="!isFileSelected && !isImageLoaded"
    >
      <button
        class="btn btn-primary w-100"
        :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }"
        @click="toggleCamera"
      >
        <span v-if="!isCameraOpen">Kamera öffnen</span>
        <span v-else>Kamera schließen</span>
      </button>

      <input
        id="fileUpload"
        type="file"
        @change="loadFile"
        accept="image/jpeg, image/png"
        hidden
      />
      <button
        class="btn mt-2 btn-primary w-100"
        @click="chooseFile()"
        v-show="!isCameraOpen"
      >
        Vorhandenes Bild hochladen
      </button>
    </div>

    <div
      v-if="(!isCameraOpen && isImageFinished) || isImageLoaded"
      class="mb-2 p-2"
    >
      <button class="btn mt-2 btn-primary w-100" @click="restart()">
        Zurück
      </button>
    </div>

    <div v-if="!isCameraOpen">
      <vue-avatar-editor
        v-show="!isImageFinished && isImageLoaded"
        :width="300"
        :height="300"
        ref="vueavatar"
        finishText="Bild zuschneiden"
        @select-file="onSelectFile($event)"
        @finished="imageFinshed($event)"
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
      >
      </vue-avatar-editor>
      <canvas
        v-show="isImageFinished"
        id="imageFinished"
        ref="canvas2"
        :width="300"
        :height="300"
      ></canvas>
    </div>

    <div
      v-if="isCameraOpen"
      v-show="!isLoading"
      class="camera-box"
      :class="{ flash: isShotPhoto }"
    >
      <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div>

      <div id="videobox" class="p-2">
        <video
          v-show="!isPhotoTaken"
          ref="camera"
          :width="300"
          :height="300"
          autoplay
        ></video>

        <canvas
          v-show="isPhotoTaken"
          id="photoTaken"
          ref="canvas"
          :width="300"
          :height="300"
        ></canvas>
      </div>
    </div>

    <div v-show="isCameraOpen && isLoading" class="camera-loading"></div>

    <div v-if="isCameraOpen && !isLoading" class="camera-shoot mt-2 mb-2">
      <button type="button" class="btn btn-primary" @click="takePhoto">
        <img
          src="https://img.icons8.com/material-outlined/40/ffffff/camera--v2.png"
        />
      </button>
    </div>

    <!-- v-if="isPhotoTaken && isCameraOpen"  -->
    <div
      v-if="(isCameraOpen && !isLoading) || isImageFinished"
      class="camera-upload p-2"
    >
      <div class="mt-2 lowerform">
        <div class="input-group mb-3">
          <div class="input-group-prepend  w-25">
            <span class="input-group-text" id="basic-addon1">Vorname</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Vorname"
            aria-label="Vorname"
            aria-describedby="basic-addon1"
            v-model="vorName"
          />
        </div>
      </div>

      <div class="mt-2 lowerform">
        <div class="input-group mb-3">
          <div class="input-group-prepend w-25">
            <span class="input-group-text" id="basic-addon2">Nachname</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Nachname"
            aria-label="Nachname"
            aria-describedby="basic-addon2"
            v-model="nachName"
          />
        </div>
      </div>

      <div class="mt-2 lowerform">
        <div class="input-group mb-3">
          <div class="input-group-prepend w-25">
            <span class="input-group-text" id="basic-addon3">Stimmgruppe</span>
          </div>
          <select
            type="text"
            class="form-control"
            aria-label="Stimmgruppe"
            aria-describedby="basic-addon3"
            v-model="stimmGruppe"
          >
          <option value="Sopran" >Sopran</option>
          <option value="Alt" >Alt</option>
          <option value="Tenor" >Tenor</option>
          <option value="Bass" >Bass</option>
          </select>
        </div>
      </div>



      <button
        type="submit"
        class="btn btn-primary lowerform mb-3 w-100"
        @click="sendData"
        :disabled="
          isSendDisabled ||
          (!(isPhotoTaken && isCameraOpen) && !isImageFinished) ||
          vorName.length == 0 ||
          nachName.length == 0 ||
          stimmGruppe.length == 0
        "
      >
        Abschicken
      </button>

      <div class="alert alert-success" role="alert" v-if="isOk">
        Daten erfolgreich hochgeladen.
      </div>
      <div class="alert alert-danger" role="alert" v-if="isError">
        Probleme beim Upload. Bitte nochmal probieren.
      </div>
    </div>
  </div>
</template>

<script>
import { VueAvatarEditor } from "vue-avatar-editor-improved";

export default {
  components: {
    VueAvatarEditor,
  },
  data() {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      isFileSelected: false,

      isImageLoaded: false,
      isImageFinished: false,

      isOk: false,
      isError: false,

      isSendDisabled: false,

      vorName: "",
      nachName: "",
      stimmGruppe: "",

      link: "#",
      rotation: 0,
      scale: 1,

      imageBlob: undefined,
    };
  },

  methods: {
    chooseFile() {
      document.getElementById("fileUpload").click();
    },

    restart() {
      this.isCameraOpen = false;
      this.isPhotoTaken = false;
      this.isShotPhoto = false;
      this.isLoading = false;
      this.isFileSelected = false;

      this.isImageLoaded = false;
      this.isImageFinished = false;
    },

    loadFile(event) {
      const testfile = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(testfile);
      reader.onload = (e) => {
        this.$refs.vueavatar.$el.classList.add("p-2");
        const ch = this.$refs.vueavatar.$el.children;
        const b = ch[ch.length - 1];
        b.classList.add("btn", "btn-primary", "w-100", "mb-1");
        console.log(b);
        this.isImageLoaded = true;
        this.$refs.vueavatar.$refs.vueavatar.loadImage(e.target.result);
      };
    },

    imageFinshed(new_canvas) {
      this.isImageFinished = true;
      let canvas = this.$refs.canvas2;
      canvas.getContext("2d").drawImage(new_canvas, 0, 0);

      this.isSendDisabled = false;
      this.vorName = "";
      this.nachName = "";
      this.stimmGruppe = "";
      this.isOk = false;
      this.isError = false;
    },
    onSelectFile() {
      this.isFileSelected = true;
    },

    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },

    createCameraElement() {
      this.isLoading = true;

      const constraints = (window.constraints = {
        audio: false,
        video: {
          width: 300,
          height: 300,
          facingMode: "user",
        },
      });

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.isLoading = false;
          this.$refs.camera.srcObject = stream;
        })
        .catch((error) => {
          this.isLoading = false;
          alert("May the browser didn't support or there is some errors.");
          console.log(error);
        });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    },

    takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      } else {
      this.vorName = "";
      this.nachName = "";
      this.stimmGruppe = "";

      }

      this.isPhotoTaken = !this.isPhotoTaken;

      let canvas = this.$refs.canvas;
      let video = this.$refs.camera;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      canvas.getContext("2d").drawImage(video, 0, 0);
      this.isSendDisabled = false;

      this.isOk = false;
      this.isError = false;
    },

    async internalSendData(sendData) {
      try{
      const response = await fetch("https://jazznuts.krueckl.de/memory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      return response.ok;
      } catch {
        return false;
      }
    },
    sendData() {
      this.isSendDisabled = true;

      if (
        this.vorName.length == 0 ||
        this.nachName.length == 0 ||
        this.stimmGruppe.length == 0
      ) {
        this.isOk = false;
        this.isError = true;
        return;
      }

      let sendData = {
        vorName: this.vorName,
        nachName: this.nachName,
        stimmGruppe: this.stimmGruppe,
      };

      if (this.isImageFinished) {
        sendData["img"] = this.$refs.canvas2.toDataURL();
      } else {
        sendData["img"] = this.$refs.canvas.toDataURL();
      }

      this.internalSendData(sendData).then((res) => {
        this.isOk = res;
        this.isError = !res;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  display: flex;
  justify-content: center;
}
.web-camera-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 500px;
}
.web-camera-container .camera-button {
  margin-bottom: 2rem;
}
.web-camera-container .camera-box .camera-shutter {
  opacity: 0;
  width: 300px;
  height: 300px;
  background-color: #fff;
  position: absolute;
}

.camera-box {
  margin-left: auto;
  margin-right: auto;
}

.card {
  margin-left: auto;
  margin-right: auto;
}

#videobox {
  width: 300px;
  height: 300px;
  position: relative;
}

#videobox video {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

#videobox canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1100;
}

.web-camera-container .camera-box .camera-shutter.flash {
  opacity: 1;
}
.web-camera-container .camera-shoot {
  margin: 1rem 0;
}
.web-camera-container .camera-shoot {
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}
.web-camera-container .camera-shoot img {
  height: 35px;
  object-fit: cover;
}
.web-camera-container .camera-loading {
  overflow: hidden;
  height: 100%;
  position: absolute;
  width: 100%;
  min-height: 150px;
  margin: 3rem 0 0 -1.2rem;
}
.web-camera-container .camera-loading ul {
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 999999;
  margin: 0;
}
.web-camera-container .camera-loading .loader-circle {
  display: block;
  height: 14px;
  margin: 0 auto;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  position: absolute;
  width: 100%;
  padding: 0;
}
.web-camera-container .camera-loading .loader-circle li {
  display: block;
  float: left;
  width: 10px;
  height: 10px;
  line-height: 10px;
  padding: 0;
  position: relative;
  margin: 0 0 0 4px;
  background: #999;
  animation: preload 1s infinite;
  top: -50%;
  border-radius: 100%;
}
.web-camera-container .camera-loading .loader-circle li:nth-child(2) {
  animation-delay: 0.2s;
}
.web-camera-container .camera-loading .loader-circle li:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes preload {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

.lowerform {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
</style>

