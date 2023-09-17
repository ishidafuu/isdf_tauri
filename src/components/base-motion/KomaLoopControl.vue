<template>
  <div>
    <div>
      <button @click="changeLoopPoint(-1)">Decrease Loop Point</button>
      <span>Loop Point (Q,E): {{ loopPoint }}</span>
      <button @click="changeLoopPoint(1)">Increase Loop Point</button>
    </div>
    <div>
      <button @click="changeLoopCount(-1)">Decrease Loop Count</button>
      <span>Loop Count (Z,X): {{ loopCount }}</span>
      <button @click="changeLoopCount(1)">Increase Loop Count</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const loopPoint = computed(() => store.getters['baseMotion/currentKomaState'].loopPoint)
    const loopCount = computed(() => store.getters['baseMotion/currentKomaState'].loopCount)

    const changeLoopPoint = (amount: number) => {
      store.commit('baseMotion/changeLoopPoint', amount)
    }

    const changeLoopCount = (amount: number) => {
      store.commit('baseMotion/changeLoopCount', amount)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        return;
      }

      if (event.code === 'KeyQ') {
        changeLoopPoint(-1);
      } else if (event.code === 'KeyE') {
        changeLoopPoint(1);
      } else if (event.code === 'KeyZ') {
        changeLoopCount(-1);
      } else if (event.code === 'KeyX') {
        changeLoopCount(1);
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
    })

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown);
    })

    return {
      loopPoint,
      loopCount,
      changeLoopPoint,
      changeLoopCount,
    }
  }
})
</script>