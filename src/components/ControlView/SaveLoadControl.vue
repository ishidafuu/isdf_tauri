<template>
  <div>
    <button @click="saveState">Save State</button>
    <button @click="loadState">Load State</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const saveState = () => {
      store.dispatch('saveState')
    }

    const loadState = () => {
      store.dispatch('loadState')
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 's') {
        saveState()
      } else if (event.key === 'l') {
        loadState()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return {
      saveState,
      loadState
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', handleKeydown)
  },
})
</script>
