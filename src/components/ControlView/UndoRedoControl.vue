<template>
  <div>
    <button @click="undo">Undo</button>
    <button @click="redo">Redo</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const undo = () => {
      store.commit('undo')
    }

    const redo = () => {
      store.commit('redo')
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        if (event.key.toLowerCase() === 'z') {
          if (event.shiftKey) {
            redo()
          } else {
            undo()
          }
          event.preventDefault()
        }
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return {
      undo,
      redo
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', handleKeydown)
  },
})
</script>
