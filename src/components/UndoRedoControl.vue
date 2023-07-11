<template>
  <div>
    <button @click="$store.commit('undo')">Undo</button>
    <button @click="$store.commit('redo')">Redo</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleKeydown(event) {
      if (event.ctrlKey) {
        if (event.key.toLowerCase() === 'z') {
          if (event.shiftKey) {
            this.$store.commit('redo');
          } else {
            this.$store.commit('undo');
          }
          event.preventDefault();
        }
      }
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