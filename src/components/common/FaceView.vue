<template>
  <div :style="styleData" class="character-face"></div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useImageUtils } from "../../mixins/imageUtils.ts";

export default defineComponent({
  name: "FaceView",
  props: {
    faceIndex: Number,
    faceAngle: Number,
    faceX: Number,
    faceY: Number,
    faceZ: Number
  },
  setup(props) {
    const imagePath = '/face.png';
    const transparentImagePath = ref<string | null>(null);
    const gridSize = 16;
    const { makeColorTransparent } = useImageUtils();

    const backgroundStyle = computed(() => {
      const col = props.faceIndex;
      const row = props.faceAngle;
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
      const translateX = props.faceX * scale - halfSize;
      const translateY = -props.faceY * scale - halfSize;
      return {
        ...backgroundStyle.value,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        zIndex: props.faceZ
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
