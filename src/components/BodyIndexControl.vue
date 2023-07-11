<template>
  <div>
    <button @click="changeCharacter(-1)">-</button>
    <span>Current character index: {{ bodyIndex }}</span>
    <button @click="changeCharacter(1)">+</button>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapState(['bodyIndex']),
  },
  methods: {
    ...mapMutations(['incrementBodyIndex', 'decrementBodyIndex']),
    changeCharacter(amount) {
      if (amount > 0) {
        this.incrementBodyIndex()
      } else {
        this.decrementBodyIndex()
      }
    },
  }
}
</script>