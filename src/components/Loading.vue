<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {
  name: "LoadingItem",
};
</script>

<style>
.loading {
  top: 0;
  z-index: 101;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}


.loading span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 3px solid transparent;
    border-top-color: #fff;
    border-bottom-color: #fff;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
}

@keyframes spin {
    to {
        transform: rotateZ(360deg);
    }
}
</style>