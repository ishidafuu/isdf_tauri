<template>
  <div>
    <CharacterView/>
    <CharIndexControl/>
    <OffsetControl/>
    <UndoRedoControl/>
  </div>
</template>

<script>
import CharacterView from './components/CharacterView.vue'
import CharIndexControl from './components/CharIndexControl.vue'
import OffsetControl from './components/OffsetControl.vue'
import UndoRedoControl from './components/UndoRedoControl.vue'

export default {
  components: {
    CharacterView,
    CharIndexControl,
    OffsetControl,
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
