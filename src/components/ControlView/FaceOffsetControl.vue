<template>
  <div>
    <div>
      <button @click="changeOffset('X', 1)">Move Right</button>
      <span>Current FaceX offset: {{ offsetFaceX }}</span>
      <button @click="changeOffset('X', -1)">Move Left</button>
    </div>
    <div>
      <button @click="changeOffset('Y', 1)">Move Down</button>
      <span>Current FaceY offset: {{ offsetFaceY }}</span>
      <button @click="changeOffset('Y', -1)">Move Up</button>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapState(['offsetFaceX', 'offsetFaceY']),
  },
  methods: {
    ...mapMutations(['setOffsetFaceX', 'setOffsetFaceY']),
    changeOffset(axis, amount) {
      if (axis === 'X') {
        this.setOffsetFaceX(this.offsetFaceX + amount);
      } else if (axis === 'Y') {
        this.setOffsetFaceY(this.offsetFaceY + amount);
      }
    },
  }
}
</script>