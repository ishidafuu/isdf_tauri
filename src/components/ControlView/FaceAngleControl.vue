<template>
  <div>
    <button @click="changeCharacter(-1)">-</button>
    <span>Current Face angle: {{ faceAngle }}</span>
    <button @click="changeCharacter(1)">+</button>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentBodyState']),
    faceAngle() {
      return this.currentBodyState.faceAngle;
    },
  },
  methods: {
    ...mapMutations(['incrementFaceAngle', 'decrementFaceAngle']),
    changeCharacter(amount) {
      if (amount > 0) {
        this.incrementFaceAngle()
      } else {
        this.decrementFaceAngle()
      }
    },
  }
}
</script>
