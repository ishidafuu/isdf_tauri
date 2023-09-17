<template>
  <div>
    <div v-if="activeMotionIndex >= 0">activeMotionIndex: {{ activeMotionIndex }}
    </div>
    <div v-if="activeKomaIndex >= 0">activeKomaIndex: {{ activeKomaIndex }}
    </div>
    <div v-if="Len >= 0">Len: {{ Len }}
    </div>
    <div v-if="Len2 >= 0">Len: {{ Len2 }}
    </div>
    <ul class="koma-list-box">
      <li v-for="(koma, index) in komas" :key="koma.cellNo"
          @click="selectKoma(index)"
          :class="{ 'selected': activeKomaIndex === index }">
        {{ index.toString().padStart(2, '0') }}: {{ koma.cellNo }} {{ koma.frame }}f
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
    const activeKomaIndex = computed(() => store.state.baseMotion.activeKomaIndex)
    const komas = computed(() => store.state.baseMotion.baseMotions[store.state.baseMotion.activeMotionIndex].komas)
    const Len = computed(() => store.state.baseMotion.baseMotions[store.state.baseMotion.activeMotionIndex].komas.length)
    const Len2 = computed(() => store.state.baseMotion.baseMotions[0].komas.length)

    const selectKoma = (index: number) => {
      store.commit('baseMotion/changeKomaIndex', index)
    }

    return {
      komas,
      selectKoma,
      activeMotionIndex,
      activeKomaIndex,
      Len,
      Len2,
    }
  }
})
</script>

<style>
.koma-list-box {
  height: 200px;
  width: 275px;
  overflow-y: auto;
  border: 1px solid #ccc;
  text-align: left;
}

.selected {
  background-color: #444;
}
</style>