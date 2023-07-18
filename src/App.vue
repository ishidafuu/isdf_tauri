<template>
  <div class="parent-component">
    <CharacterView/>
    <ControlView/>
  </div>
</template>

<script>
import CharacterView from './components/CharacterView.vue'
import ControlView from "./components/ControlView.vue";

export default {
  components: {
    CharacterView,
    ControlView,
  },
}
</script>


<style scoped>
.parent-component {
  display: flex;
}
</style>
