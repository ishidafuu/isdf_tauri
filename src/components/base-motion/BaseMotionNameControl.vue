<template>
  <span>MotionName </span>
  <input type="text" v-model="currentName" @input="changeMotionName(currentName)"/>
</template>

<script lang="ts">
import {defineComponent, computed, ref} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const activeKomaIndex = computed(() => store.state.baseMotion.activeMotionIndex)
    const name = computed(() => store.state.baseMotion.baseMotions[store.state.baseMotion.activeMotionIndex].name)
    const currentName = ref(name.value)
    const changeMotionName = (newName: string) => {  // update this line
      store.commit('baseMotion/changeMotionName', newName)
    }

    return {
      changeMotionName,
      currentName,
    }
  }
})
</script>