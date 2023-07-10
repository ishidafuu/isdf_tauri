<template>
  <div>
    <div class="character" :style="backgroundStyle"></div>
    <div>
      <button @click="decrement">-</button>
      <span>Current character index: {{ charIndex }}</span>
      <button @click="increment">+</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

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
    ...mapState(['charIndex']),
    backgroundStyle() {
      // Calculate the row number
      const row = Math.floor(this.charIndex / this.gridSize);
      // Calculate the column number
      const col = this.charIndex % this.gridSize;
      // Calculate the background position
      const bgPosX = -col * this.gridSize;
      const bgPosY = -row * this.gridSize;
      // Return the CSS style
      return {
        backgroundImage: `url(${this.imagePath})`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`
      };
    }
  },
  methods: {
    ...mapMutations(['increment', 'decrement'])
  }
}
</script>

<style scoped>
.character {
  /* Set the div size to the grid size */
  width: 40px;
  height: 40px;
  /* Do not repeat the background image */
  background-repeat: no-repeat;
}
</style>