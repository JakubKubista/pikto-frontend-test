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
                class="btn btn-primary">Add Text</button>
      </div>
      <div class="image">
        <h4>Images</h4>
        <ul class="list-unstyled">
          <li v-for="(image, index) in images"
              :key="index">
            <img :src="image"
                 class="img-rounded" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import Api from "@/config/api";

export default {
  name: "SidePane",
  data() {
    return {
      file: null
    };
  },
  computed: {
    ...mapState(["images"])
  },
  methods: {
    ...mapMutations(["updateImages"]),
    changeFile(event) {
      this.file = event.target.files[0];
    },
    uploadFile() {
      Api.callService({
        method: "post",
        service: "uploads",
        file: this.file
      }).then(response => {
        this.getImages();
      });
    },
    getImages() {
      Api.callService({ method: "get", service: "images" }).then(response => {
        this.updateImages(response.data);
      });
    }
  },
  mounted() {
    this.getImages();
  }
};
</script>
