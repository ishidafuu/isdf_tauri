<template>
  <div :style="styleData" class="character-face"></div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useImageUtils } from "../../mixins/imageUtils";

export default defineComponent({
  name: "FaceView",
  setup() {
    const store = useStore();
    const imagePath = '/face.png';
    const transparentImagePath = ref<string | null>(null);
    const gridSize = 16;
    const { makeColorTransparent } = useImageUtils();

    const faceIndex = computed(() => store.getters.currentBodyState.faceIndex);
    const faceAngle = computed(() => store.getters.currentBodyState.faceAngle);
    const offsetFaceX = computed(() => store.getters.currentBodyState.offsetFaceX);
    const offsetFaceY = computed(() => store.getters.currentBodyState.offsetFaceY);
    const facePriority = computed(() => store.getters.currentBodyState.facePriority);

    const backgroundStyle = computed(() => {
      const col = faceIndex.value;
      const row = faceAngle.value;
      const bgPosX = -col * gridSize;
      const bgPosY = -row * gridSize;
      return {
        backgroundImage: `url(${transparentImagePath.value || imagePath})`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`
      };
    });

    const styleData = computed(() => {
      const scale = 4;
      const halfSize = 16 / 2;
      const translateX = offsetFaceX.value * scale - halfSize;
      const translateY = -offsetFaceY.value * scale - halfSize;
      return {
        ...backgroundStyle.value,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        zIndex: facePriority.value
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
.character-face {
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  transform-origin: center;
  image-rendering: pixelated;
  position: relative;
}
</style>
