<template>
  <CrossLineView>
    <div class="cross-line-view">
      <BodyView :bodyX="bodyX" :bodyY="bodyY2" :activeBodyIndex="activeBodyIndex"/>
      <FaceView :faceIndex="faceIndex" :faceAngle="faceAngle" :faceX="faceX" :faceY="faceY"
                :facePriority="faceZ"/>
      <ItemView :itemAngle="itemAngle" :itemZ="itemZ" :itemX="itemX" :itemY="itemY"/>
    </div>
  </CrossLineView>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
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
    ...mapGetters(
        (["currentBodyState"]),
    ),
    ...mapState({
      activeBodyIndex: state => state.charaCell.activeBodyIndex,
      bodyX: state => state.charaCell.bodyStates[state.charaCell.activeBodyIndex].bodyX,
      bodyY: state => state.charaCell.bodyStates[state.charaCell.activeBodyIndex].bodyY,
      faceIndex: state => state.charaCell.bodyStates[state.charaCell.activeBodyIndex].faceIndex,
      faceAngle: state => state.charaCell.bodyStates[state.charaCell.activeBodyIndex].faceAngle,
      faceX: state => state.charaCell.bodyStates[state.charaCell.activeBodyIndex].faceX,
      faceY: state => state.charaCell.bodyStates[state.charaCell.activeBodyIndex].faceY,
      faceZ: state => state.charaCell.bodyStates[state.charaCell.activeBodyIndex].faceZ,
      itemAngle: state => state.charaCell.bodyStates[state.charaCell.activeBodyIndex].itemAngle,
      itemZ: state => state.charaCell.bodyStates[state.charaCell.activeBodyIndex].itemZ,
      itemX: state => state.charaCell.bodyStates[state.charaCell.activeBodyIndex].itemX,
      itemY: state => state.charaCell.bodyStates[state.charaCell.activeBodyIndex].itemY,
    }),
    bodyY2() {
      return this.currentBodyState.bodyY;
    },
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