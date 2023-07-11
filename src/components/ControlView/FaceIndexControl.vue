<template>
  <div>
    <button @click="changeCharacter(-1)">-</button>
    <span>Current Face index: {{ faceIndex }}</span>
    <button @click="changeCharacter(1)">+</button>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapState(['faceIndex']),
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