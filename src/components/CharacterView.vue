<template>
  <CrossLineView>
    <BodyView />
  </CrossLineView>
</template>

<script>
import CrossLineView from './CharacterView/CrossLineView.vue'
import BodyView from './CharacterView/BodyView.vue'

export default {
  name: 'CharacterView',
  components: {
    CrossLineView,
    BodyView
  }
}
</script>