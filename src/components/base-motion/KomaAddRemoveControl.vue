<template>
  <button @click="addKoma()">AddKoma</button>
  <button @click="removeKoma()">RemoveKoma</button>
</template>

<script lang="ts">
import {defineComponent, onMounted, onBeforeUnmount} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const addKoma = () => {
      store.commit('baseMotion/addKoma')
    }

    const removeKoma = () => {
      store.commit('baseMotion/removeKoma')
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'KeyN') {
        addKoma();
      }

      if (event.code === 'Delete') {
        removeKoma();
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown);
    });

    return {
      addKoma,
      removeKoma,
    }
  }
})
</script>

