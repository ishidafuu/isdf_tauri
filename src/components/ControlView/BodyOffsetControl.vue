<template>
  <div>
    <div>
      <button @click="changeOffsetX(-1)">Move Left</button>
      <span>BodyX offset: {{ offsetBodyX }}</span>
      <button @click="changeOffsetX(1)">Move Right</button>
    </div>
    <div>
      <button @click="changeOffsetY(-1)">Move Down</button>
      <span>BodyY offset: {{ offsetBodyY }}</span>
      <button @click="changeOffsetY(1)">Move Up</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const offsetBodyX = computed(() => store.getters.currentBodyState.offsetBodyX)
    const offsetBodyY = computed(() => store.getters.currentBodyState.offsetBodyY)

    const changeOffsetX = (amount: number) => {
      store.commit('changeOffsetBodyX', amount)
    }

    const changeOffsetY = (amount: number) => {
      store.commit('changeOffsetBodyY', amount)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey) {
        return;
      }

      if (event.ctrlKey) {
        return;
      }

      if (event.code === 'KeyA') {
        changeOffsetX(-1);
      } else if (event.code === 'KeyD') {
        changeOffsetX(1);
      } else if (event.code === 'KeyW') {
        changeOffsetY(1);
      } else if (event.code === 'KeyS') {
        changeOffsetY(-1);
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown);
    });

    return {
      offsetBodyX,
      offsetBodyY,
      changeOffsetX,
      changeOffsetY,
    }
  }
})
</script>
