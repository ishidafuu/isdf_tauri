<template>
  <div>
    <button @click="changeFrame(-1)">Decrease Frame</button>
    <span>Frame (Q,E): {{ frame }}</span>
    <button @click="changeFrame(1)">Increase Frame</button>
    <button @click="changeFrameAll">Set All Frames</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, onMounted, onBeforeUnmount} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const frame = computed(() => store.getters['baseMotion/currentKomaState'].frame)

    const changeFrame = (amount: number) => {
      store.commit('baseMotion/changeFrame', amount)
    }

    const changeFrameAll = () => {
      store.commit('baseMotion/changeFrameAll')
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        return;
      }

      if (event.code === 'KeyQ') {
        changeFrame(-1);
      } else if (event.code === 'KeyE') {
        changeFrame(1);
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown);
    });

    return {
      frame,
      changeFrame,
      changeFrameAll,
    }
  }
})
</script>