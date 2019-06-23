<template>
  <div class="canvas col-md-auto">
    <div class="block">
      <div class="row">
        <div v-for="(element, index) in canvas"
             :key="index"
             class="pointer"
             @click="removeFromCanvas(element.index)">
          <img v-if="element.index > -1"
               :src="element.content" />
          <h4 v-else>
            {{ element.content }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Canvas",
  computed: {
    ...mapState(["canvas"])
  },
  methods: {
    ...mapActions(["removeFromCanvas"]),
    removeImageFromCanvas(index) {
      this.removeFromCanvas(index);
    }
  }
};
</script>
