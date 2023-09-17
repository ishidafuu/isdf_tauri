<template>
  <div class="koma-list-container">
    <ul class="koma-list-box">
      <li v-for="(koma, index) in komas" :key="koma.cellNo"
          @click="selectKoma(index)"
          :class="{ 'selected': activeKomaIndex === index }">
        {{ index.toString().padStart(2, '0') }}: {{ koma.cellNo.toString().padStart(3, '0') }} {{ koma.frame }}f {{
          getLoopPointName(koma.loopPoint)
        }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import {useStore} from 'vuex'
import {LoopPoint} from '../../types/enum';

export default defineComponent({
  setup() {
    const store = useStore()
    const activeKomaIndex = computed(() => store.state.baseMotion.activeKomaIndex)
    const komas = computed(() => store.state.baseMotion.baseMotions[store.state.baseMotion.activeMotionIndex].komas)
    const selectKoma = (index: number) => {
      store.commit('baseMotion/changeKomaIndex', index)
    }

    const getLoopPointName = (value: number) => {
      if (value > 0 && value < LoopPoint.LoopPointCount) {
        return LoopPoint[value];
      } else {
        return "";
      }
    };

    return {
      komas,
      selectKoma,
      activeKomaIndex,
      getLoopPointName,
    }
  }
})
</script>


<style>
.koma-list-container {
  display: flex;
  justify-content: center;
}

.koma-list-box {
  height: 200px;
  width: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  text-align: left;
}

.selected {
  background-color: #444;
}
</style>