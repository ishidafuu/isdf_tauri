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
import EditStateControl from "./ControlView/EditStateControl.vue";
import BodyIndexControl from "./ControlView/BodyIndexControl.vue";
import BodyOffsetControl from "./ControlView/BodyOffsetControl.vue";
import FaceIndexControl from "./ControlView/FaceIndexControl.vue";
import FaceAngleControl from "./ControlView/FaceAngleControl.vue";
import FaceOffsetControl from "./ControlView/FaceOffsetControl.vue";
import FacePriorityControl from "./ControlView/FacePriorityControl.vue";
import ItemAngleControl from "./ControlView/ItemAngleControl.vue";
import ItemOffsetControl from "./ControlView/ItemOffsetControl.vue";
import ItemPriorityControl from "./ControlView/ItemPriorityControl.vue";
import UndoRedoControl from "./ControlView/UndoRedoControl.vue";
import SaveLoadControl from "./ControlView/SaveLoadControl.vue";

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