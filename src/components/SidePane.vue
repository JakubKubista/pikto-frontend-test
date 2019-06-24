<template>
  <div class="sidepane col-sm-12 col-md-12 col-lg-3">
    <div class="form">
      <h3>Form</h3>
      <input type="file"
             class="form-control"
             placeholder="Upload Your Images"
             name="upload"
             @change="changeFile($event)">
      <button id="submit"
              class="btn btn-primary"
              @click="uploadFile">Upload</button>
    </div>
    <hr />
    <div class="assets">
      <h3>Assets</h3>
      <div class="text">
        <h4>Text</h4>
        <button id="addText"
                class="btn btn-primary"
                @click="addTextToCanvas()">Add Text</button>
      </div>
      <div class="image">
        <h4>Images</h4>
        <ul class="list-unstyled">
          <li v-for="(image, index) in images"
              :key="index"
              class="pointer"
              @click="addImageToCanvas(index, $event)">
            <img :src="image"
                 class="img-rounded" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Api from "@/config/api";

export default {
  name: "SidePane",
  data() {
    return {
      file: null,
      textIndex: -1
    };
  },
  computed: {
    ...mapState(["images"])
  },
  methods: {
    ...mapActions(["updateImages", "addToCanvas"]),
    getImages() {
      Api.callService({ method: "get", service: "images" }).then(response => {
        this.updateImages(response.data);
      });
    },
    changeFile(event) {
      this.file = event.target.files[0];
    },
    uploadFile() {
      if (this.file) {
        Api.callService({
          method: "post",
          service: "uploads",
          file: this.file
        }).then(response => {
          this.getImages();
        });
      }
    },
    addTextToCanvas() {
      let content = prompt("Please add text", "Example");
      this.addToCanvas({ index: this.textIndex, content });
      this.textIndex--;
    },
    addImageToCanvas(index, event) {
      this.addToCanvas({ index, content: event.target.src });
    }
  },
  mounted() {
    this.getImages();
  }
};
</script>
