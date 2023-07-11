<template>
  <div>
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