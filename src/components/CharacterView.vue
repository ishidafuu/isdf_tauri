<template>
  <div>
    <div class="container">
      <div :style="backgroundStyle" class="character"></div>
    </div>
    <div>
      <button @click="DECREMENT">-</button>
      <span>Current character index: {{ charIndex }}</span>
      <button @click="INCREMENT">+</button>

      <div>
        <button @click="incrementX">Move Right</button>
        <button @click="decrementX">Move Left</button>
        <span>Current X offset: {{ offsetX }}</span>
      </div>
      <div>
        <button @click="incrementY">Move Down</button>
        <button @click="decrementY">Move Up</button>
        <span>Current Y offset: {{ offsetY }}</span>
      </div>

    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  data() {
    return {
      // Image path
      imagePath: '/nm2body.png',
      // Grid size
      gridSize: 40
    }
  },
  computed: {
    ...mapState(['charIndex', 'offsetX', 'offsetY']),
    backgroundStyle() {
      // Calculate the row number
      const col = Math.floor(this.charIndex / this.gridSize);
      // Calculate the column number
      const row = this.charIndex % this.gridSize;
      // Calculate the background position
      const bgPosX = -col * this.gridSize + this.offsetX;
      const bgPosY = -row * this.gridSize + this.offsetY;
      // Return the CSS style
      return {
        backgroundImage: `url(${this.imagePath})`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`
      };
    }
  },
  methods: {
    ...mapMutations(['INCREMENT', 'DECREMENT', 'SET_OFFSET_X', 'SET_OFFSET_Y']),
    incrementX() {
      this.SET_OFFSET_X(this.offsetX + 1);
    },
    decrementX() {
      this.SET_OFFSET_X(this.offsetX - 1);
    },
    incrementY() {
      this.SET_OFFSET_Y(this.offsetY + 1);
    },
    decrementY() {
      this.SET_OFFSET_Y(this.offsetY - 1);
    },
  }
}
</script>

<style scoped>
.container {
  /* Set the div size as needed */
  width: 160px; /* or whatever size you want */
  height: 160px; /* or whatever size you want */
}

.character {
  /* Set the div size to the grid size */
  width: 40px;
  height: 40px;
  /* Do not repeat the background image */
  background-repeat: no-repeat;
  /* Scale the div size by 4 times */
  transform: scale(4);
  /* Ensure the transform origin is top left */
  transform-origin: top left;
  /* Disable smoothing */
  image-rendering: pixelated;
}
</style>
