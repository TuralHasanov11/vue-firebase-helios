<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <i @click="closePreview" class="fa-solid fa-square-xmark icon"></i>
      <img :src="coverPhoto" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  
  methods: {
    closePreview() {
      this.$store.commit("posts/openPhotoPreview");
    },
  },
  computed: {
    coverPhoto() {
      return this.$store.state.posts.postPreview.photoFileURL;
    },
  },
};
</script>

<style scoped>
.modal {
  top: 0;
  background-color: #7289da7c;
  z-index: 99;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

}

.modal .modal-content {
    display: flex;
    justify-content: center;
    position: relative;
    border-radius: 0.75em;
    background-color: #fff;
    height: 25em;
    width: 37.5em;
    padding: 3em;
    box-shadow: 0 0.25em 6px -0.1em rgba(0, 0, 0, 0.1), 0 2px 0.25em -0.1em rgba(0, 0, 0, 0.06);
  }

.modal .modal-content .icon {
    width: 1.5em;
    height: auto;
    cursor: pointer;
    font-size: 1.5em;
    position: absolute;
    top: 1em;
    right: 1em;
    color: #7289DA;
}
.modal .modal-content img {
    margin-top: 1em;
    display: block;
    width: auto;
    height: 100%;
    box-shadow: 0 0.25em 6px -0.1em #7289da13, 0 2px 0.25em -0.1em rgba(0, 0, 0, 0.06);
}
</style>