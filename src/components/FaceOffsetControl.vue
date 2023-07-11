<template>
  <div>
    <div>
      <button @click="changeOffset('X', 1)">Move Right</button>
      <button @click="changeOffset('X', -1)">Move Left</button>
      <div>Current FaceX offset: {{ offsetFaceX }}</div>
    </div>
    <div>
      <button @click="changeOffset('Y', 1)">Move Down</button>
      <button @click="changeOffset('Y', -1)">Move Up</button>
      <div>Current FaceY offset: {{ offsetFaceY }}</div>
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