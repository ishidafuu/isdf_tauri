<template>
  <BodyIndexControl/>
  <BodyOffsetControl/>
  <FaceIndexControl/>
  <FaceAngleControl/>
  <FaceOffsetControl/>
  <FacePriorityControl/>
  <UndoRedoControl/>
  <SaveLoadControl/>
</template>

<script>
import BodyOffsetControl from "./ControlView/BodyOffsetControl.vue";
import BodyIndexControl from "./ControlView/BodyIndexControl.vue";
import FaceIndexControl from "./ControlView/FaceIndexControl.vue";
import FaceAngleControl from "./ControlView/FaceAngleControl.vue";
import FaceOffsetControl from "./ControlView/FaceOffsetControl.vue";
import FacePriorityControl from "./ControlView/FacePriorityControl.vue";
import UndoRedoControl from "./ControlView/UndoRedoControl.vue";
import SaveLoadControl from "./ControlView/SaveLoadControl.vue";

export default {
  name: 'ControlView',
  components: {
    BodyIndexControl,
    BodyOffsetControl,
    FaceIndexControl,
    FaceAngleControl,
    FaceOffsetControl,
    FacePriorityControl,
    UndoRedoControl,
    SaveLoadControl,
  }
}
</script>