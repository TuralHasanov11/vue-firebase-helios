<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ this.modalMessage }}</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name:"ModalItem",
  props: ["modalMessage"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: #7289dab3;
}

.modal .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.5em;
    width: 19em;
    padding: 2.5em 2em;
    background-color: #fff;
}

.modal .modal-content p {
    text-align: center;
}
.modal .modal-content button {
    align-self: center;
}
</style>