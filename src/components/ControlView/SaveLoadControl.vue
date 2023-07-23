<template>
  <div>
    <button @click="saveState">Save State</button>
    <div v-if="fileStatus === 'SaveComplete'">Save Complete</div>
    <button @click="loadState">Load State</button>
    <div v-if="fileStatus === 'LoadComplete'">Load Complete</div>
    <button @click="openSaveDirectory">Open Save Directory</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { invoke } from '@tauri-apps/api/tauri'

export default defineComponent({
  setup() {
    const store = useStore()
    const fileStatus = ref('')

    const saveState = async () => {  // add 'async' here
      await store.dispatch('saveState')
      fileStatus.value = 'SaveComplete'
      setTimeout(() => fileStatus.value = '', 1000)
    }

    const loadState = () => {
      store.dispatch('loadState')
      fileStatus.value = 'LoadComplete'
      setTimeout(() => fileStatus.value = '', 1000)
    }

    const openSaveDirectory = async () => {
      const savePath = await store.dispatch('getSavePath')
      await invoke('open_save_directory', { path: savePath })  // modify this line
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
      loadState,
      fileStatus,
      openSaveDirectory,
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', handleKeydown)
  },
})
</script>
