<template>
  <div>
    <div>
      <button @click="changeOffset('X', 1)">Move Right</button>
      <button @click="changeOffset('X', -1)">Move Left</button>
      <div>Current BodyX offset: {{ offsetBodyX }}</div>
    </div>
    <div>
      <button @click="changeOffset('Y', 1)">Move Down</button>
      <button @click="changeOffset('Y', -1)">Move Up</button>
      <div>Current BodyY offset: {{ offsetBodyY }}</div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapState(['offsetBodyX', 'offsetBodyY']),
  },
  methods: {
    ...mapMutations(['setOffsetBodyX', 'setOffsetBodyY']),
    changeOffset(axis, amount) {
      if (axis === 'X') {
        this.setOffsetBodyX(this.offsetBodyX + amount);
      } else if (axis === 'Y') {
        this.setOffsetBodyY(this.offsetBodyY + amount);
      }
    },
  }
}
</script>