<template>
  <div style="z-index: 0">
    <div :style="styleData" class="character-body"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useImageUtils } from "../../mixins/imageUtils";

export default defineComponent({
  name: "BodyView",
  setup() {
    const store = useStore();
    const imagePath = '/nm2body.png';
    const transparentImagePath = ref<string | null>(null);
    const gridSize = 40;
    const { makeColorTransparent } = useImageUtils();

    const currentBodyState = computed(() => store.getters.currentBodyState);

    const backgroundStyle = computed(() => {
      const col = Math.floor(store.state.activeBodyIndex / gridSize);
      const row = store.state.activeBodyIndex % gridSize;
      const bgPosX = -col * gridSize;
      const bgPosY = -row * gridSize;
      return {
        backgroundImage: `url(${transparentImagePath.value || imagePath})`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`
      };
    });

    const styleData = computed(() => {
      const scale = 4;
      const halfSize = 40 / 2;
      const translateX = currentBodyState.value.bodyX * scale - halfSize;
      const translateY = -currentBodyState.value.bodyY * scale - halfSize;
      return {
        ...backgroundStyle.value,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
      };
    });

    onMounted(() => {
      makeColorTransparent(imagePath, [255, 0, 255], (transparentImg) => {
        transparentImagePath.value = transparentImg;
      });
    });

    return {
      styleData
    };
  },
});
</script>

<style scoped>
.character-body {
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  transform-origin: center;
  image-rendering: pixelated;
  position: relative;
}
</style>
