<template>
  <div>
    <CharacterView/>
    <BodyIndexControl/>
    <BodyOffsetControl/>
    <UndoRedoControl/>
  </div>
</template>

<script>
import BodyView from './components/BodyView.vue'
import BodyIndexControl from './components/BodyIndexControl.vue'
import BodyOffsetControl from './components/BodyOffsetControl.vue'
import UndoRedoControl from './components/UndoRedoControl.vue'
import CharacterContainer from "./components/CharacterContainer.vue";
import CharacterView from "./components/CharacterView.vue";

export default {
  components: {
    CharacterView,
    CharacterContainer,
    BodyView,
    BodyIndexControl,
    BodyOffsetControl,
    UndoRedoControl
  },
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
