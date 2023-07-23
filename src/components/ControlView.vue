<template>
  <div>
    <EditStateControl/>
    <BodyIndexControl/>
    <BodyOffsetControl/>
    <FaceIndexControl/>
    <FacePriorityControl/>
    <FaceAngleControl/>
    <FaceOffsetControl/>
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
    UndoRedoControl,
    SaveLoadControl,
  }
}
</script>