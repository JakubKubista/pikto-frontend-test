<template>
  <div class="sidepane col-sm-12 col-md-12 col-lg-3">
    <div class="form">
      <h3>Form</h3>
        <input type="file" class="form-control" placeholder="Upload Your Images" name="upload">
        <button id="submit" class="btn btn-primary">upload</button>
      <!-- Upload Form here -->
    </div>
    <hr />
    <div class="assets">
      <h3>Assets</h3>
      <div class="text">
          <h4>Text</h4>
          <button id="addText" class="btn btn-primary">Add Text</button>
      </div>
      <div class="image">
          <h4>Images</h4>
          <ul class="list-unstyled">
              <!-- List of images here -->
              <!-- <li><img src="images/sample.jpeg" class="img-rounded" /></li> -->
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidePane'
}
</script>
