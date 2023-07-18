<template>
  <div>
    <div>
      <button @click="changeOffset('X', 1)">Move Right</button>
      <span>BodyX offset: {{ offsetBodyX }}</span>
      <button @click="changeOffset('X', -1)">Move Left</button>
    </div>
    <div>
      <button @click="changeOffset('Y', 1)">Move Down</button>
      <span>BodyY offset: {{ offsetBodyY }}</span>
      <button @click="changeOffset('Y', -1)">Move Up</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const offsetBodyX = computed(() => store.getters.currentBodyState.offsetBodyX)
    const offsetBodyY = computed(() => store.getters.currentBodyState.offsetBodyY)

    const changeOffset = (axis: string, amount: number) => {
      if (axis === 'X') {
        store.commit('setOffsetBodyX', offsetBodyX.value + amount)
      } else if (axis === 'Y') {
        store.commit('setOffsetBodyY', offsetBodyY.value + amount)
      }
    }

    return {
      offsetBodyX,
      offsetBodyY,
      changeOffset
    }
  }
})
</script>
