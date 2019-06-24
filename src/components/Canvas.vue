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
      last: null,
      elements: []
    };
  },
  computed: {
    ...mapState(["canvas"])
  },
  methods: {
    ...mapActions(["removeFromCanvas"]),
    setLastElement() {
      this.last = this.elements[this.elements.length - 1];
    },
    dragElement(index, event) {
      let newElement = {
        index: index,
        content: event.target,
        positions: {
          v1: 0,
          v2: 0,
          v3: 0,
          v4: 0
        }
      };
      this.elements.push(newElement);
      this.setLastElement();
      this.last.content.style.position = "absolute";
      this.last.content.style.cursor = "grab";
      this.last.content.onmousedown = this.dragMouseDown;
    },
    dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      this.last.positions.v3 = e.clientX;
      this.last.positions.v4 = e.clientY;
      document.onmouseup = this.closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = this.elementDrag;
    },
    elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      this.last.positions.v1 = this.last.positions.v3 - e.clientX;
      this.last.positions.v2 = this.last.positions.v4 - e.clientY;
      this.last.positions.v3 = e.clientX;
      this.last.positions.v4 = e.clientY;
      // set the element's new position:
      this.last.content.style.cursor = "grabbing";
      this.last.content.style.top =
        this.last.content.offsetTop - this.last.positions.v2 + "px";
      this.last.content.style.left =
        this.last.content.offsetLeft - this.last.positions.v1 + "px";
      if (
        parseInt(this.last.content.style.left, 10) < -10 ||
        parseInt(this.last.content.style.left, 10) > 600 ||
        (parseInt(this.last.content.style.top, 10) < -10 ||
          parseInt(this.last.content.style.top, 10) > 600)
      ) {
        this.removeFromCanvas(this.last.index);
      }
    },
    closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
      this.last.content.style.cursor = "grab";
    }
  }
};
</script>
