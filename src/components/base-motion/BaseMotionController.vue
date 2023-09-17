<template>
  <div>
    <BaseMotionNameControl/>
    <KomaListControl/>
    <KomaAddRemoveControl/>
    <KomaCopyPasteControl/>
    <KomaCellNoControl/>
    <KomaOffsetControl/>
    <KomaFrameControl/>
    <KomaActionControl/>
    <KomaSeNoControl/>
    <KomaLoopControl/>
  </div>
</template>

<script>
import BaseMotionNameControl from "../base-motion/BaseMotionNameControl.vue";
import KomaListControl from "../base-motion/KomaListControl.vue";
import KomaAddRemoveControl from "../base-motion/KomaAddRemoveControl.vue";
import KomaCopyPasteControl from "../base-motion/KomaCopyPasteControl.vue";
import KomaCellNoControl from "../base-motion/KomaCellNoControl.vue";
import KomaOffsetControl from "../base-motion/KomaOffsetControl.vue";
import KomaFrameControl from "../base-motion/KomaFrameControl.vue";
import KomaActionControl from "../base-motion/KomaActionControl.vue";
import KomaSeNoControl from "../base-motion/KomaSeNoControl.vue";
import KomaLoopControl from "../base-motion/KomaLoopControl.vue";


export default {
  name: 'BaseMotionControlView',
  components: {
    BaseMotionNameControl,
    KomaListControl,
    KomaAddRemoveControl,
    KomaCopyPasteControl,
    KomaCellNoControl,
    KomaOffsetControl,
    KomaFrameControl,
    KomaActionControl,
    KomaSeNoControl,
    KomaLoopControl,
  }
}
</script>