<template>
  <div>
    <button @click="changeCharacter(-1)">-</button>
    <span>Face index: {{ faceIndex }}</span>
    <button @click="changeCharacter(1)">+</button>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentBodyState']),
    faceIndex() {
      return this.currentBodyState.faceIndex;
    },
  },
  methods: {
    ...mapMutations(['incrementFaceIndex', 'decrementFaceIndex']),
    changeCharacter(amount) {
      if (amount > 0) {
        this.incrementFaceIndex()
      } else {
        this.decrementFaceIndex()
      }
    },
  }
}
</script>
