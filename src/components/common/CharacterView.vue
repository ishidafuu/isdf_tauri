<template>
  <CrossLineView>
    <div class="cross-line-view">
      <BodyView :bodyX="bodyX" :bodyY="bodyY" :activeBodyIndex="activeBodyIndex"/>
      <FaceView :faceIndex="faceIndex" :faceAngle="faceAngle" :faceX="faceX" :faceY="faceY"
                :facePriority="faceZ"/>
      <ItemView :itemAngle="itemAngle" :itemZ="itemZ" :itemX="itemX" :itemY="itemY"/>
    </div>
  </CrossLineView>
</template>

<script>
import {mapState} from 'vuex';
import CrossLineView from './CrossLineView.vue'
import BodyView from './BodyView.vue'
import FaceView from './FaceView.vue'
import ItemView from './ItemView.vue'

export default {
  name: 'CharacterView',
  components: {
    CrossLineView,
    BodyView,
    FaceView,
    ItemView,
  },
  computed: {
    ...mapState({
      activeBodyIndex: state => state.activeBodyIndex,
      bodyX: state => state.bodyStates[state.activeBodyIndex].bodyX,
      bodyY: state => state.bodyStates[state.activeBodyIndex].bodyY,
      faceIndex: state => state.bodyStates[state.activeBodyIndex].faceIndex,
      faceAngle: state => state.bodyStates[state.activeBodyIndex].faceAngle,
      faceX: state => state.bodyStates[state.activeBodyIndex].faceX,
      faceY: state => state.bodyStates[state.activeBodyIndex].faceY,
      faceZ: state => state.bodyStates[state.activeBodyIndex].faceZ,
      itemAngle: state => state.bodyStates[state.activeBodyIndex].itemAngle,
      itemZ: state => state.bodyStates[state.activeBodyIndex].itemZ,
      itemX: state => state.bodyStates[state.activeBodyIndex].itemX,
      itemY: state => state.bodyStates[state.activeBodyIndex].itemY,
    })
  }
}
</script>

<style scoped>
.cross-line-view {
  position: relative;
}

.cross-line-view > * {
  position: absolute;
  top: 0;
  left: 0;
}
</style>