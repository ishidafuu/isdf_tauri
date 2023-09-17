<template>
  <div>
    <button @click="toggleAction">Toggle Action</button>
    <span>Is Action: {{ isAction }}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const isAction = computed(() => store.getters['baseMotion/currentKomaState'].isAction)

    const toggleAction = () => {
      store.commit('baseMotion/toggleAction')
    }

    return {
      toggleAction,
      isAction
    }
  }
})
</script>