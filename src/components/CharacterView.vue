<template>
  <CrossLineView>
    <div class="cross-line-view">
      <BodyView />
      <FaceView />
    </div>
  </CrossLineView>
</template>

<script>
import CrossLineView from './CharacterView/CrossLineView.vue'
import BodyView from './CharacterView/BodyView.vue'
import FaceView from './CharacterView/FaceView.vue'

export default {
  name: 'CharacterView',
  components: {
    CrossLineView,
    BodyView,
    FaceView
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