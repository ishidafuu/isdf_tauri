<script setup>
import {ref} from 'vue';
import {invoke} from '@tauri-apps/api/tauri';

const counter = ref(0);

const increment = async () => {
  const result = await invoke('increment_counter', {counter: counter.value});
  counter.value = result.value;
};
</script>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<template>
  <div class="card">
    <button @click="increment">{{ counter }}</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
