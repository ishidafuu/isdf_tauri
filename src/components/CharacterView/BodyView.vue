<template>
  <div :style="styleData" class="character"></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BodyView',
  data() {
    return {
      imagePath: '/nm2body.png',
      gridSize: 40
    }
  },
  computed: {
    ...mapState(['bodyIndex', 'offsetBodyX', 'offsetBodyY']),
    backgroundStyle() {
      const col = Math.floor(this.bodyIndex / this.gridSize);
      const row = this.bodyIndex % this.gridSize;
      const bgPosX = -col * this.gridSize;
      const bgPosY = -row * this.gridSize;
      return {
        backgroundImage: `url(${this.imagePath})`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`
      };
    },
    styleData() {
      const scale = 4;
      const translateX = -this.offsetBodyX * scale;
      const translateY = -this.offsetBodyY * scale;
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
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  transform-origin: center;
  image-rendering: pixelated;
  position: relative;
}
</style>