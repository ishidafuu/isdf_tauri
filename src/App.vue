<template>
  <div class="parent-component">
    <nav>
      <router-link to="/base_motion">BaseMotion</router-link>
      <router-link to="/hello_world">HelloWorld</router-link>
    </nav>
    <div>
      <router-view/>
    </div>
  </div>
</template>


<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import BaseMotion from "./components/BaseMotion.vue";
  import ControlView from "./components/ControlView.vue";

  export default defineComponent({
    components: {ControlView, BaseMotion},
    setup() {
      const store = useStore()

      onMounted(async () => {
        await store.dispatch('loadState')
      })
    }
  })
  </script>

  <style scoped>
  .parent-component {
    display: flex;
  }
  </style>