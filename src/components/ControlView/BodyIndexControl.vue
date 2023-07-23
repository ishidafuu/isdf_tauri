<template>
  <div>
    <button @click="changeCharacter(-1)">-</button>
    <span>Body index: {{ activeBodyIndex }}</span>
    <button @click="changeCharacter(1)">+</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const activeBodyIndex = computed(() => store.state.activeBodyIndex)

    const changeCharacter = (amount: number) => {
      store.commit('changeBodyIndex', amount)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'ArrowLeft') {
        changeCharacter(-1);
      } else if (event.code === 'ArrowRight') {
        changeCharacter(1);
      } else if (event.code === 'ArrowUp') {
        changeCharacter(10);
      } else if (event.code === 'ArrowDown') {
        changeCharacter(-10);
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown);
    });

    return {
      activeBodyIndex,
      changeCharacter
    }
  }
})
</script>