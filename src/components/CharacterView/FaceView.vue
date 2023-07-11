<template>
  <div :style="styleData" class="character"></div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      imagePath: '/face.png',
      gridSize: 16
    }
  },
  computed: {
    ...mapState(['faceIndex', 'offsetFaceX', 'offsetFaceY']),
    backgroundStyle() {
      const col = Math.floor(this.faceIndex / this.gridSize);
      const row = this.faceIndex % this.gridSize;
      const bgPosX = -col * this.gridSize;
      const bgPosY = -row * this.gridSize;
      return {
        backgroundImage: `url(${this.imagePath})`,
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
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
      }
    }
  }
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