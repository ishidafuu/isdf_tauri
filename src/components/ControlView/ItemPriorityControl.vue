<template>
  <div :class="{ highlight: editMode === 'Item' }">
    <button @click="changePriority('up')">UP</button>
    <span>Item Priority (F): {{ itemPriority }}</span>
    <button @click="changePriority('down')">DOWN</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const itemPriority = computed(() => store.getters.currentBodyState.itemPriority)
    const editMode = computed(() => store.state.editMode)

    const changePriority = (direction: string) => {
      if ((direction === 'up' && itemPriority.value < 0) || (direction === 'down' && itemPriority.value >= 0)) {
        store.commit('toggleItemPriority')
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (editMode.value !== 'Item') {
        return;
      }

      if (event.code === 'KeyF') {
        changePriority(itemPriority.value >= 0 ? 'down' : 'up');
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown);
    });

    return {
      itemPriority,
      changePriority,
      editMode
    }
  }
})
</script>

<style scoped>
.highlight {
  color: yellow;
}
</style>
