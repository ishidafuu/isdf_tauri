<template>
  <div>
    <div>
      <button @click="changeOffset('X', 1)">Move Right</button>
      <button @click="changeOffset('X', -1)">Move Left</button>
      <div>Current X offset: {{ offsetX }}</div>
    </div>
    <div>
      <button @click="changeOffset('Y', 1)">Move Down</button>
      <button @click="changeOffset('Y', -1)">Move Up</button>
      <div>Current Y offset: {{ offsetY }}</div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapState(['offsetX', 'offsetY']),
  },
  methods: {
    ...mapMutations(['setOffsetX', 'setOffsetY']),
    changeOffset(axis, amount) {
      if (axis === 'X') {
        this.setOffsetX(this.offsetX + amount);
      } else if (axis === 'Y') {
        this.setOffsetY(this.offsetY + amount);
      }
    },
  }
}
</script>