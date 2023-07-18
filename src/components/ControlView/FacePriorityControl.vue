<template>
  <div>
    <button @click="changePriority('up')">UP</button>
    <span>Face Priority: {{ facePriority }}</span>
    <button @click="changePriority('down')">DOWN</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const facePriority = computed(() => store.getters.currentBodyState.facePriority)

    const changePriority = (direction: string) => {
      if ((direction === 'up' && facePriority.value < 0) || (direction === 'down' && facePriority.value >= 0)) {
        store.commit('toggleFacePriority')
      }
    }

    return {
      facePriority,
      changePriority
    }
  }
})
</script>
