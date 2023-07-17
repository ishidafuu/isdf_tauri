<template>
  <div style="z-index: 0">
    <div :style="styleData" class="character"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BodyView',
  data() {
    return {
      imagePath: '/nm2body.png',
      transparentImagePath: null,
      gridSize: 40
    }
  },
  computed: {
    ...mapState(['bodyStates', 'activeBodyIndex']),
    currentBodyState() {
      return this.bodyStates[this.activeBodyIndex];
    },
    backgroundStyle() {
      const col = Math.floor(this.activeBodyIndex / this.gridSize);
      const row = this.activeBodyIndex % this.gridSize;
      const bgPosX = -col * this.gridSize;
      const bgPosY = -row * this.gridSize;
      return {
        backgroundImage: `url(${this.transparentImagePath || this.imagePath})`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`
      };
    },
    styleData() {
      const scale = 4;
      const halfSize = 40 / 2;
      const translateX = -this.currentBodyState.offsetBodyX * scale - halfSize;
      const translateY = -this.currentBodyState.offsetBodyY * scale - halfSize;
      return {
        ...this.backgroundStyle,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
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
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  transform-origin: center;
  image-rendering: pixelated;
  position: relative;
}
</style>
