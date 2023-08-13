<template>
  <div>
    <CharacterView/>
  </div>
  <div>
    <ControlView/>
  </div>
</template>

<script>
import CharacterView from "../components/CharacterView.vue";
import ControlView from "../components/ControlView.vue";


export default {
  name: 'BaseMotion',
  components: {
    CharacterView,
    ControlView,
  }
}
</script>