<template>
  <CrossLineView>
    <div class="cross-line-view">
      <BodyView :bodyX="bodyX" :bodyY="bodyY" :activeBodyIndex="activeBodyIndex"/>
      <FaceView/>
      <ItemView/>
    </div>
  </CrossLineView>
</template>

<script>
import {mapState} from 'vuex';
import CrossLineView from './CharacterView/CrossLineView.vue'
import BodyView from './CharacterView/BodyView.vue'
import FaceView from './CharacterView/FaceView.vue'
import ItemView from './CharacterView/ItemView.vue'

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
      bodyY: state => state.bodyStates[state.activeBodyIndex].bodyY
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