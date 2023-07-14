<template>
  <div>
    <button @click="saveState">Save State</button>
    <button @click="loadState">Load State</button>
  </div>
</template>

<script>
export default {
  methods: {
    saveState() {
      this.$store.dispatch('saveState');
    },
    loadState() {
      this.$store.dispatch('loadState');
    }
  },
  created() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
}
</script>