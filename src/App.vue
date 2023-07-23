<template>
  <div class="parent-component">
    <CharacterView/>
    <ControlView/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import CharacterView from './components/CharacterView.vue'
import ControlView from "./components/ControlView.vue";

export default defineComponent({
  components: {
    CharacterView,
    ControlView,
  },
  setup() {
    const store = useStore()

    onMounted(async () => {
      await store.dispatch('loadState')
    })
  }
})
</script>

<style scoped>
.parent-component {
  display: flex;
}
</style>