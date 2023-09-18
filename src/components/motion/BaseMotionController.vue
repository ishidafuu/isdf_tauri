<template>
  <div>
    <MotionNameControl :storeName="'baseMotion'"/>
    <KomaListControl :storeName="'baseMotion'"/>
    <KomaAddRemoveControl :storeName="'baseMotion'"/>
    <KomaCopyPasteControl :storeName="'baseMotion'"/>
    <KomaCellNoControl :storeName="'baseMotion'"/>
    <KomaOffsetControl :storeName="'baseMotion'"/>
    <KomaFlipRotationControl :storeName="'baseMotion'"/>
    <KomaFrameControl :storeName="'baseMotion'"/>
    <KomaActionControl :storeName="'baseMotion'"/>
    <KomaSeNoControl :storeName="'baseMotion'"/>
    <KomaLoopControl :storeName="'baseMotion'"/>
  </div>
</template>

<script>
import MotionNameControl from "./MotionNameControl.vue";
import KomaListControl from "../koma/KomaListControl.vue";
import KomaAddRemoveControl from "../koma/KomaAddRemoveControl.vue";
import KomaCopyPasteControl from "../koma/KomaCopyPasteControl.vue";
import KomaCellNoControl from "../koma/KomaCellNoControl.vue";
import KomaOffsetControl from "../koma/KomaOffsetControl.vue";
import KomaFlipRotationControl from "../koma/KomaFlipRotationControl.vue";
import KomaFrameControl from "../koma/KomaFrameControl.vue";
import KomaActionControl from "../koma/KomaActionControl.vue";
import KomaSeNoControl from "../koma/KomaSeNoControl.vue";
import KomaLoopControl from "../koma/KomaLoopControl.vue";

export default {
  name: 'BaseMotionController',
  components: {
    MotionNameControl,
    KomaListControl,
    KomaAddRemoveControl,
    KomaCopyPasteControl,
    KomaCellNoControl,
    KomaOffsetControl,
    KomaFlipRotationControl,
    KomaFrameControl,
    KomaActionControl,
    KomaSeNoControl,
    KomaLoopControl,
  }
}
</script>