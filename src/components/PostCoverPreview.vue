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
  background-color: rgba(0, 0, 0, 0.5);
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
    border-radius: 12px;
    background-color: #fff;
    height: 400px;
    width: 600px;
    padding: 50px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

.modal .modal-content .icon {
    width: 24px;
    height: auto;
    cursor: pointer;
    font-size: 24px;
    position: absolute;
    top: 15px;
    right: 15px;
    color: #000000;
}
.modal .modal-content img {
    margin-top: 16px;
    display: block;
    width: auto;
    height: 100%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>