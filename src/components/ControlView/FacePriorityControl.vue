<template>
  <div :class="{ highlight: editMode === 'Face' }">
    <button @click="changePriority('up')">UP</button>
    <span>Face Priority (F): {{ facePriority }}</span>
    <button @click="changePriority('down')">DOWN</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const facePriority = computed(() => store.getters.currentBodyState.facePriority)
    const editMode = computed(() => store.state.editMode)

    const changePriority = (direction: string) => {
      if ((direction === 'up' && facePriority.value < 0) || (direction === 'down' && facePriority.value >= 0)) {
        store.commit('toggleFacePriority')
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (editMode.value !== 'Face') {
        return;
      }

      if (event.code === 'KeyF') {
        changePriority(facePriority.value >= 0 ? 'down' : 'up');
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown);
    });

    return {
      facePriority,
      changePriority,
      editMode
    }
  }
})
</script>

<style scoped>
.highlight {
  color: yellow;
}
</style>
