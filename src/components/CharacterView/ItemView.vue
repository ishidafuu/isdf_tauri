<template>
  <div :style="styleData" class="character-item"></div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useImageUtils } from "../../mixins/imageUtils";

export default defineComponent({
  name: "ItemView",
  props: {
    itemAngle: Number,
    itemZ: Number,
    itemX: Number,
    itemY: Number
  },
  setup(props) {
    const imagePath = '/item.png';
    const transparentImagePath = ref<string | null>(null);
    const gridSize = 32;
    const { makeColorTransparent } = useImageUtils();

    const backgroundStyle = computed(() => {
      const bgPosX = -props.itemAngle * gridSize;
      const bgPosY = 0;
      return {
        backgroundImage: `url(${transparentImagePath.value || imagePath})`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`
      };
    });

    const styleData = computed(() => {
      const scale = 4;
      const halfSize = 32 / 2;
      const translateX = props.itemX * scale - halfSize;
      const translateY = -props.itemY * scale - halfSize;
      return {
        ...backgroundStyle.value,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        zIndex: props.itemZ
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
.character-item {
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  transform-origin: center;
  image-rendering: pixelated;
  position: relative;
}
</style>
