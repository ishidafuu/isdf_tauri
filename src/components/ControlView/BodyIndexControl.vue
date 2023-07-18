<template>
  <div>
    <button @click="changeCharacter(-1)">-</button>
    <span>Body index: {{ activeBodyIndex }}</span>
    <button @click="changeCharacter(1)">+</button>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapState(['activeBodyIndex']),
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