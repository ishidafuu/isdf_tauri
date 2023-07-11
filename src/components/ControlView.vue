<template>
  <BodyIndexControl/>
  <BodyOffsetControl/>
  <UndoRedoControl/>
</template>

<script>
import UndoRedoControl from "./ControlView/UndoRedoControl.vue";
import BodyOffsetControl from "./ControlView/BodyOffsetControl.vue";
import BodyIndexControl from "./ControlView/BodyIndexControl.vue";

export default {
  name: 'ControlView',
  components: {
    BodyIndexControl,
    BodyOffsetControl,
    UndoRedoControl,
  }
}
</script>