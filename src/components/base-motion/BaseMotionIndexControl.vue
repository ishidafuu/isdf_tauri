<template>
  <div>
    <button @click="changeMotionIndex(-1)">-</button>
    <span>Motion index (Cursor): {{ activeMotionIndex }}</span>
    <button @click="changeMotionIndex(1)">+</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const activeMotionIndex = computed(() => store.state.baseMotion.activeMotionIndex)

    const changeMotionIndex = (amount: number) => {
      store.commit('baseMotion/changeMotionIndex', amount)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey) {
        return;
      }

      if (event.code === 'ArrowLeft') {
        changeMotionIndex(-1);
      } else if (event.code === 'ArrowRight') {
        changeMotionIndex(1);
      } else if (event.code === 'ArrowUp') {
        changeMotionIndex(10);
      } else if (event.code === 'ArrowDown') {
        changeMotionIndex(-10);
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown);
    });

    return {
      activeMotionIndex,
      changeMotionIndex
    }
  }
})
</script>