<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ postPreview.title }}</h2>
      <img :src="postPreview.coverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="postPreview.text"></div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "PostsPreview",
  computed: {
    postPreview() {
      return this.$store.state.posts.postPreview;
    },
  },
};
</script>

<style>
.post-view {
  min-height: 100%;
}

.post-view .container {
    max-width: 1000px;
    padding: 60px 25px;
}
.post-view .ql-editor {
    padding: 0;
}
.post-view h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
}
.post-view img {
    width: 100%;
    margin-bottom: 32px;
}
</style>