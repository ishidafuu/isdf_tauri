<template>
  <CrossLineView>
    <div class="cross-line-view">
      <BodyView :bodyX="bodyX" :bodyY="bodyY" :activeCellIndex="activeCellIndex"/>
      <FaceView :faceIndex="faceIndex" :faceAngle="faceAngle" :faceX="faceX" :faceY="faceY"
                :facePriority="faceZ"/>
      <ItemView :itemAngle="itemAngle" :itemZ="itemZ" :itemX="itemX" :itemY="itemY"/>
    </div>
  </CrossLineView>
</template>

<script>
import {mapGetters, mapState, useStore} from 'vuex';
import CrossLineView from './CrossLineView.vue'
import BodyView from './BodyView.vue'
import FaceView from './FaceView.vue'
import ItemView from './ItemView.vue'
import {computed} from "vue";

export default {
  name: 'CharacterView',
  props: {
    activeCellIndex: {
      type: Number
    },
    offsetX: {
      type: Number
    },
    offsetY: {
      type: Number
    }
  },
  components: {
    CrossLineView,
    BodyView,
    FaceView,
    ItemView,
  },
  setup(props) {
    const store = useStore()
    const bodyX = computed(() => store.state.charaCell.cells[props.activeCellIndex].bodyX + props.offsetX);
    const bodyY = computed(() => store.state.charaCell.cells[props.activeCellIndex].bodyY + props.offsetY);
    const faceIndex = computed(() => store.state.charaCell.cells[props.activeCellIndex].faceIndex);
    const faceAngle = computed(() => store.state.charaCell.cells[props.activeCellIndex].faceAngle);
    const faceX = computed(() => store.state.charaCell.cells[props.activeCellIndex].faceX + props.offsetX);
    const faceY = computed(() => store.state.charaCell.cells[props.activeCellIndex].faceY + props.offsetY);
    const faceZ = computed(() => store.state.charaCell.cells[props.activeCellIndex].faceZ);
    const itemAngle = computed(() => store.state.charaCell.cells[props.activeCellIndex].itemAngle);
    const itemZ = computed(() => store.state.charaCell.cells[props.activeCellIndex].itemZ);
    const itemX = computed(() => store.state.charaCell.cells[props.activeCellIndex].itemX + props.offsetX);
    const itemY = computed(() => store.state.charaCell.cells[props.activeCellIndex].itemY + props.offsetY);

    return {
      bodyX,
      bodyY,
      faceIndex,
      faceAngle,
      faceX,
      faceY,
      faceZ,
      itemAngle,
      itemZ,
      itemX,
      itemY,
    }
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