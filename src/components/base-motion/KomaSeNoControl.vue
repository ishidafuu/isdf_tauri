<template>
  <div>
    <div>
      <button @click="changeSeNo(-1)">Decrease SeNo</button>
      <span>SeNo (J,L): {{ seNo }}</span>
      <button @click="changeSeNo(1)">Increase SeNo</button>
    </div>
    <div>
      <span>Is Loop Se: {{ isLoopSe }}</span>
      <button @click="toggleLoopSe">Toggle Loop Se</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const seNo = computed(() => store.getters['baseMotion/currentKomaState'].seNo)
    const isLoopSe = computed(() => store.getters['baseMotion/currentKomaState'].isLoopSe)

    const changeSeNo = (amount: number) => {
      store.commit('baseMotion/changeSeNo', amount)
    }

    const toggleLoopSe = () => {
      store.commit('baseMotion/toggleLoopSe')
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        return;
      }

      if (event.code === 'KeyJ') {
        changeSeNo(-1);
      } else if (event.code === 'KeyL') {
        changeSeNo(1);
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
    })

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown);
    })

    return {
      seNo,
      isLoopSe,
      changeSeNo,
      toggleLoopSe,
    }
  }
})
</script>