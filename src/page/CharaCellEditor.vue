<template>
  <div class="base-motion-container">
    <div class="character-view">
      <CharacterView/>
    </div>
    <div class="control-view">
      <ControlView/>
    </div>
  </div>
</template>

<script>
import CharacterView from "../components/CharacterView.vue";
import ControlView from "../components/ControlView.vue";

export default {
  name: 'CharaCellEditor',
  components: {
    CharacterView,
    ControlView,
  }
}
</script>

<style scoped>
.base-motion-container {
  display: flex; /* Flexboxを有効に */
}

.character-view {
  flex: 1; /* 左側の領域を均等に占める */
}

.control-view {
  flex: 1; /* 右側の領域を均等に占める */
  min-width: 600px;
}
</style>