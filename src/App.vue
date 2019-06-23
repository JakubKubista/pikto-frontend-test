<template>
  <div id="app">
    <div class="row vh-100">
      <SidePane />
      <Canvas />
    </div>
  </div>
</template>

<script>
import SidePane from "./components/SidePane.vue";
import Canvas from "./components/Canvas.vue";

export default {
  name: "app",
  components: {
    SidePane,
    Canvas
  }
};
</script>

<style lang="scss">
@import "@/assets/main.scss";
</style>
