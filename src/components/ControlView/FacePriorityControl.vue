<template>
  <div>
    <button @click="increasePriority">UP</button>
    <span>Face Priority: {{ facePriority }}</span>
    <button @click="decreasePriority">DOWN</button>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentBodyState']),
    facePriority() {
      return this.currentBodyState.facePriority;
    },
  },
  methods: {
    ...mapMutations(['toggleFacePriority']),
    increasePriority() {
      if (this.facePriority < 0) {
        this.toggleFacePriority();
      }
    },
    decreasePriority() {
      if (this.facePriority >= 0) {
        this.toggleFacePriority();
      }
    },
  }
}
</script>
