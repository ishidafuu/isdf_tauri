<template>
  <div>
    <button @click="changeCharacter(-1)">-</button>
    <span>Body index: {{ activeBodyIndex }}</span>
    <button @click="changeCharacter(1)">+</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const activeBodyIndex = computed(() => store.state.activeBodyIndex)

    const changeCharacter = (amount: number) => {
      if (amount > 0) {
        store.commit('incrementBodyIndex')
      } else {
        store.commit('decrementBodyIndex')
      }
    }

    return {
      activeBodyIndex,
      changeCharacter
    }
  }
})
</script>