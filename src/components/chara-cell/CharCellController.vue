<template>
  <div>
    <EditStateControl/>
    <BodyIndexControl/>
    <BodyOffsetControl/>
    <FaceIndexControl/>
    <FaceAngleControl/>
    <FaceOffsetControl/>
    <FacePriorityControl/>
    <ItemAngleControl/>
    <ItemOffsetControl/>
    <ItemPriorityControl/>
    <UndoRedoControl/>
    <SaveLoadControl/>
  </div>
</template>

<script>
import EditStateControl from "./EditStateControl.vue";
import BodyIndexControl from "./BodyIndexControl.vue";
import BodyOffsetControl from "./BodyOffsetControl.vue";
import FaceIndexControl from "./FaceIndexControl.vue";
import FaceAngleControl from "./FaceAngleControl.vue";
import FaceOffsetControl from "./FaceOffsetControl.vue";
import FacePriorityControl from "./FacePriorityControl.vue";
import ItemAngleControl from "./ItemAngleControl.vue";
import ItemOffsetControl from "./ItemOffsetControl.vue";
import ItemPriorityControl from "./ItemPriorityControl.vue";
import UndoRedoControl from "./UndoRedoControl.vue";
import SaveLoadControl from "./SaveLoadControl.vue";

export default {
  name: 'ControlView',
  components: {
    EditStateControl,
    BodyIndexControl,
    BodyOffsetControl,
    FaceIndexControl,
    FaceAngleControl,
    FaceOffsetControl,
    FacePriorityControl,
    ItemAngleControl,
    ItemOffsetControl,
    ItemPriorityControl,
    UndoRedoControl,
    SaveLoadControl,
  }
}
</script>