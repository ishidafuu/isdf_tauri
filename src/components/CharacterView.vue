<template>
  <CharacterContainer>
    <BodyView />
  </CharacterContainer>
</template>

<script>
import CharacterContainer from './CharacterContainer.vue'
import BodyView from './BodyView.vue'

export default {
  name: 'CharacterView',
  components: {
    CharacterContainer,
    BodyView
  }
}
</script>