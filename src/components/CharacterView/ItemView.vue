<template>
  <div :style="styleData" class="character-item"></div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useImageUtils } from "../../mixins/imageUtils";

export default defineComponent({
  name: "ItemView",
  setup() {
    const store = useStore();
    const imagePath = '/item.png';
    const transparentImagePath = ref<string | null>(null);
    const gridSize = 32;
    const { makeColorTransparent } = useImageUtils();

    const itemAngle = computed(() => store.getters.currentBodyState.itemAngle);
    const itemPriority = computed(() => store.getters.currentBodyState.itemPriority);
    const itemX = computed(() => store.getters.currentBodyState.itemX);
    const itemY = computed(() => store.getters.currentBodyState.itemY);

    const backgroundStyle = computed(() => {
      const col = itemAngle.value;
      const row = 0;
      const bgPosX = -col * gridSize;
      const bgPosY = -row * gridSize;
      return {
        backgroundImage: `url(${transparentImagePath.value || imagePath})`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`
      };
    });

    const styleData = computed(() => {
      const scale = 4;
      const halfSize = 32 / 2;
      const translateX = itemX.value * scale - halfSize;
      const translateY = -itemY.value * scale - halfSize;
      return {
        ...backgroundStyle.value,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        zIndex: itemPriority.value
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
