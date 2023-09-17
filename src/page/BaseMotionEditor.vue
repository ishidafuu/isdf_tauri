<template>
  <div class="base-motion-container">
    <div class="character-view">
      <CharacterView :activeCellIndex="activeCellIndex" :offsetX="offsetX" :offsetY="offsetY"/>
      <BaseMotionListControl/>
    </div>
    <div class="control-view">
      <BaseMotionControlView/>
    </div>
  </div>
</template>

<script>
import CharacterView from "../components/common/CharacterView.vue";
import BaseMotionControlView from "../components/base-motion/BaseMotionController.vue";
import BaseMotionListControl from "../components/base-motion/BaseMotionListControl.vue";
import {mapState} from "vuex";


export default {
  name: 'BaseMotionEditor',
  components: {
    CharacterView,
    BaseMotionListControl,
    BaseMotionControlView,
  },
  computed: {
    ...mapState({
      activeCellIndex: state => state.baseMotion.baseMotions[state.baseMotion.activeMotionIndex].komas[state.baseMotion.activeKomaIndex].cellNo,
      offsetX: state => state.baseMotion.baseMotions[state.baseMotion.activeMotionIndex].komas[state.baseMotion.activeKomaIndex].offsetX,
      offsetY: state => state.baseMotion.baseMotions[state.baseMotion.activeMotionIndex].komas[state.baseMotion.activeKomaIndex].offsetY,
    }),
  }
}
</script>

<style scoped>
.base-motion-container {
  display: flex; /* Flexboxを有効に */
}

.character-view {
  flex: 1; /* 左側の領域を均等に占める */
  min-width: 400px;
}

.control-view {
  flex: 1; /* 右側の領域を均等に占める */
  min-width: 600px;
}
</style>