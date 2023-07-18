<template>
  <div>
    <div>
      <button @click="changeOffset('X', 1)">Move Right</button>
      <span>FaceX offset: {{ offsetFaceX }}</span>
      <button @click="changeOffset('X', -1)">Move Left</button>
    </div>
    <div>
      <button @click="changeOffset('Y', 1)">Move Down</button>
      <span>FaceY offset: {{ offsetFaceY }}</span>
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

    const offsetFaceX = computed(() => store.getters.currentBodyState.offsetFaceX)
    const offsetFaceY = computed(() => store.getters.currentBodyState.offsetFaceY)

    const changeOffset = (axis: string, amount: number) => {
      if (axis === 'X') {
        store.commit('setOffsetFaceX', offsetFaceX.value + amount)
      } else if (axis === 'Y') {
        store.commit('setOffsetFaceY', offsetFaceY.value + amount)
      }
    }

    return {
      offsetFaceX,
      offsetFaceY,
      changeOffset
    }
  }
})
</script>