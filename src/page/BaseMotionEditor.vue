<template>
  <div class="base-motion-container">
    <div class="character-view">
      <CharacterView/>
    </div>
    <div class="control-view">
      <BaseMotionControlView/>
    </div>
  </div>
</template>

<script>
import CharacterView from "../components/common/CharacterView.vue";
import BaseMotionControlView from "../components/base-motion/BaseMotionController.vue";

export default {
  name: 'BaseMotionEditor',
  components: {
    CharacterView,
    BaseMotionControlView,
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