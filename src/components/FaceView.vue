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
    ...mapState(['faceIndex', 'offsetXFace', 'offsetYFace']),  // change here
    backgroundStyle() {
      const col = Math.floor(this.faceIndex / this.gridSize);  // change here
      const row = this.faceIndex % this.gridSize;              // change here
      const bgPosX = -col * this.gridSize;
      const bgPosY = -row * this.gridSize;
      return {
        backgroundImage: `url(${this.imagePath})`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`
      };
    },
    styleData() {
      const scale = 4;
      const translateX = -this.offsetXFace * scale;  // change here
      const translateY = -this.offsetYFace * scale;  // change here
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