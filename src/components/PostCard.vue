<template>
  <div class="blog-card">
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
  props: ["post"],

  methods: {
    deletePost() {
      this.$store.dispatch("posts/deletePost", this.post.id);
    },
    editBlog() {
      this.$router.push({ name: "EditBlog", params: { post: this.post.id } });
    },

    profile(){
      console.log(this.$store.state.auth.profile)
      return this.$store.state.auth.profile
    }
  },
};
</script>

<style scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  max-height: 25em;
  width: 25em;
  transition: 0.5s ease all;
}

.blog-card:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

.blog-card .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;
}

.blog-card .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    transition: 0.5s ease all;
}

.blog-card .icon:hover {
    background-color: #303030;
}
.blog-card .icon:hover .edit,
.blog-card .icon:hover .delete {
    fill: #fff;
    color: #fff;
}
.blog-card .icon :nth-child(1) {
    margin-right: 8px;
}
.blog-card .icon .edit,
.blog-card .icon .delete {
    pointer-events: none;
    height: 15px;
    width: auto;
}

.blog-card img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
}
.blog-card .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;
}

.blog-card .info h4 {
    padding-bottom: 8px;
    font-size: 20px;
    font-weight: 300;
}
.blog-card .info h6 {
    font-weight: 400;
    font-size: 12px;
    padding-bottom: 16px;
}
.blog-card .info .link {
    display: inline-flex;
    align-items: center;
    margin-top: auto;
    font-weight: 500;
    padding-top: 20px;
    font-size: 12px;
    padding-bottom: 4px;
    transition: 0.5s ease-in all;
}

.blog-card .info .link:hover {
    color: rgba(48, 48, 48, 0.8);
}
.blog-card .info .link .arrow {
    width: 10px;
}
</style>