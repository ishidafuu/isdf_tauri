<template>
  <BodyIndexControl/>
  <BodyOffsetControl/>
  <FaceIndexControl/>
  <FaceOffsetControl/>
  <UndoRedoControl/>
</template>

<script>
import BodyOffsetControl from "./ControlView/BodyOffsetControl.vue";
import BodyIndexControl from "./ControlView/BodyIndexControl.vue";
import FaceIndexControl from "./ControlView/FaceIndexControl.vue";
import FaceOffsetControl from "./ControlView/FaceOffsetControl.vue";
import UndoRedoControl from "./ControlView/UndoRedoControl.vue";

export default {
  name: 'ControlView',
  components: {
    BodyIndexControl,
    BodyOffsetControl,
    FaceIndexControl,
    FaceOffsetControl,
    UndoRedoControl,
  }
}
</script>