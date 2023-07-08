<script setup>
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/tauri';

const counter = ref(0);

const increment = async () => {
  const result = await invoke('increment_counter', { counter: counter.value });
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
  <h1>{{ msg }}</h1>

  <div class="card">
    <button @click="increment">{{ counter }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
