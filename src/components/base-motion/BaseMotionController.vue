<template>
  <div>
    <BaseMotionNameControl/>
    <KomaListControl/>
    <KomaAddRemoveControl/>
    <KomaCopyPasteControl/>
    <KomaCellNoControl/>
    <KomaOffsetControl/>
  </div>
</template>

<script>
import BaseMotionNameControl from "../base-motion/BaseMotionNameControl.vue";
import KomaListControl from "../base-motion/KomaListControl.vue";
import KomaAddRemoveControl from "../base-motion/KomaAddRemoveControl.vue";
import KomaCopyPasteControl from "../base-motion/KomaCopyPasteControl.vue";
import KomaCellNoControl from "../base-motion/KomaCellNoControl.vue";
import KomaOffsetControl from "../base-motion/KomaOffsetControl.vue";


export default {
  name: 'BaseMotionControlView',
  components: {
    BaseMotionNameControl,
    KomaListControl,
    KomaAddRemoveControl,
    KomaCopyPasteControl,
    KomaCellNoControl,
    KomaOffsetControl,
  }
}
</script>