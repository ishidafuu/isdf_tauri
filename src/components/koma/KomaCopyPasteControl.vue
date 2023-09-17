<template>
  <div>
    <button @click="copyKoma()">CopyKoma (Ctrl+C)</button>
    <button @click="pasteKoma()">PasteKoma (Ctrl+V)</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onBeforeUnmount} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const copyKoma = () => {
      store.commit('baseMotion/copyKoma')
    }

    const pasteKoma = () => {
      store.commit('baseMotion/pasteKoma')
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'c') {
        copyKoma()
      }

      if (event.ctrlKey && event.key === 'v') {
        pasteKoma()
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown);
    });

    return {
      copyKoma,
      pasteKoma,
    }
  }
})
</script>

