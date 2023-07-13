<template>
  <div>
    <button @click="increasePriority">UP</button>
    <span>Face Priority: {{ facePriority }}</span>
    <button @click="decreasePriority">DOWN</button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const facePriority = computed(() => store.state.facePriority);
    const increasePriority = () => {
      if (store.state.facePriority < 0) {
        store.commit("toggleFacePriority");
      }
    };
    const decreasePriority = () => {
      if (store.state.facePriority >= 0) {
        store.commit("toggleFacePriority");
      }
    };
    return { facePriority, increasePriority, decreasePriority };  // Update this line
  },
};
</script>