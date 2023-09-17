<template>
  <div>
    <KomaListControl/>
    <KomaAddRemoveControl/>
    <KomaCopyPasteControl/>
<!--    <MotionIndexControl/>-->
<!--    <EditStateControl/>-->
<!--    <BodyOffsetControl/>-->
<!--    <FaceIndexControl/>-->
<!--    <FaceAngleControl/>-->
<!--    <FaceOffsetControl/>-->
<!--    <FacePriorityControl/>-->
<!--    <ItemAngleControl/>-->
<!--    <ItemOffsetControl/>-->
<!--    <ItemPriorityControl/>-->
<!--    <UndoRedoControl/>-->
<!--    <SaveLoadControl/>-->
  </div>
</template>

<script>
import KomaListControl from "../base-motion/KomaListControl.vue";
import KomaAddRemoveControl from "../base-motion/KomaAddRemoveControl.vue";
import KomaCopyPasteControl from "../base-motion/KomaCopyPasteControl.vue";
// import MotionIndexControl from "../base-motion/BaseMotionIndexControl.vue";
// import EditStateControl from "../chara-cell/EditStateControl.vue";
// import BodyOffsetControl from "../chara-cell/BodyOffsetControl.vue";
// import FaceIndexControl from "../chara-cell/FaceIndexControl.vue";
// import FaceAngleControl from "../chara-cell/FaceAngleControl.vue";
// import FaceOffsetControl from "../chara-cell/FaceOffsetControl.vue";
// import FacePriorityControl from "../chara-cell/FacePriorityControl.vue";
// import ItemAngleControl from "../chara-cell/ItemAngleControl.vue";
// import ItemOffsetControl from "../chara-cell/ItemOffsetControl.vue";
// import ItemPriorityControl from "../chara-cell/ItemPriorityControl.vue";
// import UndoRedoControl from "../chara-cell/UndoRedoControl.vue";
// import SaveLoadControl from "../chara-cell/SaveLoadControl.vue";

export default {
  name: 'BaseMotionControlView',
  components: {
    KomaListControl,
    KomaAddRemoveControl,
    KomaCopyPasteControl,
    // MotionIndexControl,
    // EditStateControl,
    // BodyOffsetControl,
    // FaceIndexControl,
    // FaceAngleControl,
    // FaceOffsetControl,
    // FacePriorityControl,
    // ItemAngleControl,
    // ItemOffsetControl,
    // ItemPriorityControl,
    // UndoRedoControl,
    // SaveLoadControl,
  }
}
</script>