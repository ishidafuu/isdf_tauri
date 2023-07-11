<template>
  <div class="container">
    <div :style="styleData" class="character"></div>
    <div class="crosshair crosshair-vertical"></div>
    <div class="crosshair crosshair-horizontal"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      imagePath: '/nm2body.png',
      gridSize: 40
    }
  },
  computed: {
    ...mapState(['charIndex', 'offsetX', 'offsetY']),
    backgroundStyle() {
      const col = Math.floor(this.charIndex / this.gridSize);
      const row = this.charIndex % this.gridSize;
      const bgPosX = -col * this.gridSize;
      const bgPosY = -row * this.gridSize;
      return {
        backgroundImage: `url(${this.imagePath})`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`
      };
    },
    styleData() {
      const scale = 4;
      const translateX = -this.offsetX * scale;
      const translateY = -this.offsetY * scale;
      return {
        ...this.backgroundStyle,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
      }
    }
  },
}
</script>

<style scoped>
.container {
  width: 320px;
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.character {
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  transform-origin: center;
  image-rendering: pixelated;
  position: relative;
}

.crosshair {
  position: absolute;
  border-style: dashed;
  border-color: #ff0000;
}

.crosshair-vertical {
  top: 0;
  bottom: 0;
  left: 50%;
  border-left-width: 0px;
}

.crosshair-horizontal {
  left: 0;
  right: 0;
  top: 75%;
  border-top-width: 0px;
}
</style>
