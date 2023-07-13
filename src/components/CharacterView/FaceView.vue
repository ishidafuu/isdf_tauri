<template>
  <div :style="styleData" class="character"></div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      imagePath: '/face.png',
      transparentImagePath: null,
      gridSize: 16
    }
  },
  computed: {
    ...mapState(['faceIndex', 'offsetFaceX', 'offsetFaceY', 'facePriority']), // Add 'facePriority' to the state mapping
    backgroundStyle() {
      const col = Math.floor(this.faceIndex / this.gridSize);
      const row = this.faceIndex % this.gridSize;
      const bgPosX = -col * this.gridSize;
      const bgPosY = -row * this.gridSize;
      return {
        backgroundImage: `url(${this.transparentImagePath || this.imagePath})`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`
      };
    },
    styleData() {
      const scale = 4;
      const halfSize = 16 / 2;
      const translateX = -this.offsetFaceX * scale - halfSize;
      const translateY = -this.offsetFaceY * scale - halfSize;
      return {
        ...this.backgroundStyle,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        zIndex: this.facePriority  // Add this line to set the z-index dynamically
      }
    }
  },
  mounted() {
    this.makeColorTransparent(this.imagePath, [255, 0, 255], (transparentImg) => {
      this.transparentImagePath = transparentImg;
    });
  },
  methods: {
    makeColorTransparent(image, color, callback) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          if (data[i] === color[0] && data[i + 1] === color[1] && data[i + 2] === color[2]) {
            // Make the pixel transparent
            data[i + 3] = 0;
          }
        }

        context.putImageData(imageData, 0, 0);

        callback(canvas.toDataURL());
      };

      img.src = image;
    }
  },
}
</script>

<style scoped>
.character {
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  transform-origin: center;
  image-rendering: pixelated;
  position: relative;
}
</style>