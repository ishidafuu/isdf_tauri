<template>
  <div>
    <div v-if="activeMotionIndex >= 0">Selected: {{ activeMotionIndex }}: {{baseMotions[activeMotionIndex].name }}
    </div>
    <ul class="list-box">
      <li v-for="(motion, index) in baseMotions" :key="motion.name"
          @click="selectMotion(index)"
          :class="{ 'selected': activeMotionIndex === index }">
        {{ index.toString().padStart(3, '0') }}: {{ motion.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const activeMotionIndex = computed(() => store.state.baseMotion.activeMotionIndex)
    const baseMotions = computed(() => store.state.baseMotion.baseMotions)

    const selectMotion = (index: number) => {
      store.commit('baseMotion/changeMotionIndex', index)
    }

    return {
      baseMotions,
      selectMotion,
      activeMotionIndex,
    }
  }
})
</script>

<style>
.list-box {
  height: 400px;
  width: 275px;
  overflow-y: auto;
  border: 1px solid #ccc;
  text-align: left;
}

.selected {
  background-color: #444;
}
</style>