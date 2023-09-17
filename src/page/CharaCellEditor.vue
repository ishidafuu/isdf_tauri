<template>
  <div class="base-motion-container">
    <div class="character-view">
      <CharacterView :activeCellIndex="activeCellIndex" />
    </div>
    <div class="control-view">
      <CharaCellControlView/>
    </div>
  </div>
</template>

<script>
import CharacterView from "../components/common/CharacterView.vue";
import CharaCellControlView from "../components/chara-cell/CharaCellController.vue";
import CrossLineView from "../components/common/CrossLineView.vue";
import BodyView from "../components/common/BodyView.vue";
import FaceView from "../components/common/FaceView.vue";
import ItemView from "../components/common/ItemView.vue";
import {mapGetters, mapState} from "vuex";

export default {
  name: 'CharaCellEditor',
  components: {
    CharacterView,
    CharaCellControlView,
  },
  computed: {
    ...mapState({
      activeCellIndex: state => state.charaCell.activeCellIndex,
    }),
  }
}
</script>

<style scoped>
.base-motion-container {
  display: flex; /* Flexboxを有効に */
}

.character-view {
  flex: 1; /* 左側の領域を均等に占める */
}

.control-view {
  flex: 1; /* 右側の領域を均等に占める */
  min-width: 600px;
}
</style>