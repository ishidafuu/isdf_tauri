<template>
  <div class="hitbox-editor" @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext, computed } from "vue";
import { useStore } from 'vuex';

export default defineComponent({
  name: "HitBoxEditor",
  props: {
    storeName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const isDragging = ref(false);
    const initialX = ref(0);
    const initialY = ref(0);

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.value = true;
      initialX.value = e.clientX;
      initialY.value = e.clientY;

      const hitX = initialX.value;
      const hitY = initialY.value;

      // Storeにデータを保存
      store.commit(`${props.storeName}/changeHitX`, hitX);
      store.commit(`${props.storeName}/changeHitY`, hitY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.value) return;

      const hitW = e.clientX - initialX.value;
      const hitH = e.clientY - initialY.value;

      // Storeにデータを保存
      store.commit(`${props.storeName}/changeHitW`, hitW);
      store.commit(`${props.storeName}/changeHitH`, hitH);
    };

    const handleMouseUp = () => {
      isDragging.value = false;
    };

    return {
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
    };
  },
});
</script>

<style scoped>
.hitbox-editor {
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: crosshair;
}
</style>