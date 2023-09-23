<template>
  <div class="hitbox-editor" @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp">
    <div class="hitbox-rect" :style="hitboxStyle"></div>
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

    const currentX = ref(0); // 追加：現在のX座標
    const currentY = ref(0); // 追加：現在のY座標

    // setup内に以下の計算プロパティを追加
    const hitboxStyle = computed(() => {
      return {
        left: `${initialX.value}px`,
        top: `${initialY.value}px`,
        width: `${Math.abs(initialX.value - (isDragging.value ? currentX.value : initialX.value))}px`,
        height: `${Math.abs(initialY.value - (isDragging.value ? currentY.value : initialY.value))}px`,
      };
    });

    const handleMouseDown = (e: MouseEvent) => {
      console.log("Mouse Move")
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
      console.log("Mouse Up");
      if (!isDragging.value) return;
      currentX.value = e.clientX; // 追加：現在のX座標を更新
      currentY.value = e.clientY; // 追加：現在のY座標を更新

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
      hitboxStyle,
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

.hitbox-rect {
  position: absolute;
  border: 2px solid red;
}
</style>