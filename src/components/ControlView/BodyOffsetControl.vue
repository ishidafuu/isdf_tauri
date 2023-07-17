<template>
  <div>
    <div>
      <button @click="changeOffset('X', 1)">Move Right</button>
      <span>Current BodyX offset: {{ offsetBodyX }}</span>
      <button @click="changeOffset('X', -1)">Move Left</button>
    </div>
    <div>
      <button @click="changeOffset('Y', 1)">Move Down</button>
      <span>Current BodyY offset: {{ offsetBodyY }}</span>
      <button @click="changeOffset('Y', -1)">Move Up</button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentBodyState']),
    offsetBodyX() {
      return this.currentBodyState.offsetBodyX;
    },
    offsetBodyY() {
      return this.currentBodyState.offsetBodyY;
    },
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