<template>
  <div>
    <button @click="changeCharacter(-1)">-</button>
    <span>Current character index: {{ charIndex }}</span>
    <button @click="changeCharacter(1)">+</button>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapState(['charIndex']),
  },
  methods: {
    ...mapMutations(['increment', 'decrement']),
    changeCharacter(amount) {
      if (amount > 0) {
        this.increment()
      } else {
        this.decrement()
      }
    },
  }
}
</script>