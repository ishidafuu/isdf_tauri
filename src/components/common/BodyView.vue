<template>
  <div style="z-index: 0">
    <div :style="styleData" class="character-body"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useImageUtils } from "../../mixins/imageUtils.ts";

export default defineComponent({
  name: "BodyView",
  props: {
    bodyX: Number,
    bodyY: Number,
    activeCellIndex: Number,
    flipX: Number,  // add this line
    flipY: Number,  // add this line
    rotation: Number  // add this line
  },
  setup(props) {
    const imagePath = '/nm2body.png';
    const transparentImagePath = ref<string | null>(null);
    const gridSize = 40;
    const { makeColorTransparent } = useImageUtils();

    const backgroundStyle = computed(() => {
      const col = Math.floor(props.activeCellIndex / gridSize);
      const row = props.activeCellIndex % gridSize;
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
      const translateX = props.bodyX * scale - halfSize;
      const translateY = -props.bodyY * scale - halfSize;
      // add flip and rotation transformations
      const scaleX = props.flipX ? -1 : 1;
      const scaleY = props.flipY ? -1 : 1;
      const rotationAngle = props.rotation * 90;  // convert enum to degrees

      return {
        ...backgroundStyle.value,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX * scale}, ${scaleY * scale}) rotate(${rotationAngle}deg)`
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
