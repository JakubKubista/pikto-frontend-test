<template>
  <div class="canvas col-md-auto">
    <div class="block">
      <div class="row">
        <div v-for="(element, index) in canvas"
             :key="index"
             @mouseover="dragElement(element.index, $event)"
             class="grab">
          <img v-if="element.index > -1"
               :src="element.src"
               class="canvas-element" />
          <div v-else
               class="canvas-element">
            <h4>
              {{ element.text }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Canvas from "@/config/canvas";

export default {
  name: "Canvas",
  data() {
    return {
      last: null
    };
  },
  computed: {
    ...mapState(["canvas"])
  },
  methods: {
    ...mapActions(["removeFromCanvas", "setCanvasElementContent"]),
    setLastElement() {
      this.last = this.canvas[this.canvas.length - 1];
    },
    dragElement(index, event) {
      this.setCanvasElementContent(event.target);
      this.setLastElement();
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
      this.last.content.style.cursor = 'grabbing'
      this.last = Canvas.getNewCursorPosition(this.last, e);
      this.last = Canvas.setNewElementPosition(this.last);
      if (Canvas.checkCanvasEdges(this.last.content))
        this.removeFromCanvas(this.last.index);
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
