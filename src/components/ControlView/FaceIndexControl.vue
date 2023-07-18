<template>
  <div>
    <button @click="changeCharacter(-1)">-</button>
    <span>Face index: {{ faceIndex }}</span>
    <button @click="changeCharacter(1)">+</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const faceIndex = computed(() => store.getters.currentBodyState.faceIndex)

    const changeCharacter = (amount: number) => {
      if (amount > 0) {
        store.commit('incrementFaceIndex')
      } else {
        store.commit('decrementFaceIndex')
      }
    }

    return {
      faceIndex,
      changeCharacter
    }
  }
})
</script>
