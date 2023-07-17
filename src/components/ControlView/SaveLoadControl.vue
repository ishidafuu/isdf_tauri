<template>
  <div>
    <button @click="saveState">Save State</button>
    <button @click="loadState">Load State</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['saveState', 'loadState']),
  },
  created() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
}
</script>
