<template>
  <div class="blog-card m-2">
    <div v-if="profile.id == post.user_id" class="icons">
      <div @click="editBlog" class="icon">
        <i class="fa-solid fa-pen-to-square edit"></i>
      </div>
      <div @click="deletePost" class="icon">
        <i class="fa-solid fa-trash-can delete"></i>
      </div>
    </div>
    <img :src="post.coverPhoto" alt="" @click="$router.push({name:'Post', params:{post:post.id}})" />
    <div class="info">
      <h4>{{ post.title }}</h4>
      <h6>Posted on: {{ new Date(post.date).toLocaleString("en-us", { dateStyle: "long" }) }}</h6>
      <router-link class="link" :to="{ name: 'Post', params: { post: post.id } }">
        View The Post <i class="fa-solid fa-chevron-right arrow"></i>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "PostCard",
  props: ["post", "profile"],

  methods: {
    deletePost() {
      this.$store.dispatch("posts/deletePost", this.post.id);
    },
    editBlog() {
      this.$router.push({ name: "PostEdit", params: { post: this.post.id } });
    },

    
  },
};
</script>

<style scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 0.5em;
  background-color: #fff;
  max-height: 25em;
  width: 25em;
  transition: 0.5s ease all;
}

.blog-card:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 0.25em 0.4em -0.1em #7289da19, 0 0.1em 0.25em -0.1em rgba(0, 0, 0, 0.06);
  }

.blog-card .icons {
    display: flex;
    position: absolute;
    top: 0.6em;
    right: 0.6em;
    z-index: 99;
}

.blog-card .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    background-color: #fff;
    transition: 0.5s ease all;
    margin: 0 0.1em;
}

.blog-card .icon:hover {
    background-color: #303030;
}
.blog-card .icon:hover .edit,
.blog-card .icon:hover .delete {
    color: #fff;
}

.blog-card .icon .edit,
.blog-card .icon .delete {
    pointer-events: none;
}

.blog-card img {
    display: block;
    border-radius: 0.5em 0.5em 0 0;
    z-index: 1;
    width: 100%;
    min-height: 13em;
    object-fit: cover;
}
.blog-card .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 2em 1em;
    color: #000;
}

.blog-card .info h4 {
    padding-bottom: 0.5em;
    font-size: 1.25em;
    font-weight: 300;
}
.blog-card .info h6 {
    font-weight: 400;
    font-size: 0.75em;
    padding-bottom: 1em;
}
.blog-card .info .link {
    display: inline-flex;
    align-items: center;
    margin-top: auto;
    font-weight: 500;
    padding-top: 1.25em;
    font-size: 0.75em;
    padding-bottom: 0.25em;
    transition: 0.5s ease-in all;
}

.blog-card .info .link:hover {
    color: rgba(48, 48, 48, 0.8);
}
.blog-card .info .link .arrow {
    width: 0.6em;
}
</style>