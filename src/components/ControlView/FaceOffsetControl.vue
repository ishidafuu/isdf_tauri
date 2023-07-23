<template>
  <div>
    <div>
      <button @click="changeOffsetX(-1)">Move Left</button>
      <span>FaceX offset: {{ offsetFaceX }}</span>
      <button @click="changeOffsetX(1)">Move Right</button>
    </div>
    <div>
      <button @click="changeOffsetY(-1)">Move Down</button>
      <span>FaceY offset: {{ offsetFaceY }}</span>
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

    const offsetFaceX = computed(() => store.getters.currentBodyState.offsetFaceX)
    const offsetFaceY = computed(() => store.getters.currentBodyState.offsetFaceY)

    const changeOffsetX = (amount: number) => {
      store.commit('changeOffsetFaceX', amount)
    }

    const changeOffsetY = (amount: number) => {
      store.commit('changeOffsetFaceY', amount)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.shiftKey) {
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
      offsetFaceX,
      offsetFaceY,
      changeOffsetX,
      changeOffsetY,
    }
  }
})
</script>
