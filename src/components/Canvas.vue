<template>
  <div class="canvas col-md-auto">
    <div class="block">
      <div class="row">
        <div v-for="(element, index) in canvas"
             :key="index"
             @mouseover="dragElement(element.index, $event)"
             class="grab">
          <img v-if="element.index > -1"
               :src="element.content" />
          <div v-else>
            <h4 class="noselect">
              {{ element.content }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Canvas",
  data() {
    return {
      index: null,
      element: null,
      positions: {
        v1: 0,
        v2: 0,
        v3: 0,
        v4: 0
      }
    };
  },
  computed: {
    ...mapState(["canvas"])
  },
  methods: {
    ...mapActions(["removeFromCanvas"]),
    dragElement(index, event) {
      this.index = index;
      this.element = event.target;
      this.element.style.position = "absolute";
      this.element.style.cursor = "grab";
      this.element.onmousedown = this.dragMouseDown;
    },
    dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      this.positions.v3 = e.clientX;
      this.positions.v4 = e.clientY;
      document.onmouseup = this.closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = this.elementDrag;
    },
    elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      this.positions.v1 = this.positions.v3 - e.clientX;
      this.positions.v2 = this.positions.v4 - e.clientY;
      this.positions.v3 = e.clientX;
      this.positions.v4 = e.clientY;
      // set the element's new position:
      this.element.style.cursor = "grabbing";
      this.element.style.top =
        this.element.offsetTop - this.positions.v2 + "px";
      this.element.style.left =
        this.element.offsetLeft - this.positions.v1 + "px";
      console.log(this.element.style.top);
      if (
        parseInt(this.element.style.left, 10) < -10 ||
        parseInt(this.element.style.left, 10) > 600 ||
        (parseInt(this.element.style.top, 10) < -10 ||
          parseInt(this.element.style.top, 10) > 600)
      ) {
        this.removeFromCanvas(this.index);
      }
    },
    closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
      this.element.style.cursor = "grab";
    }
  }
};
</script>
