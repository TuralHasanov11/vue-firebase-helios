<template>
  <div>
     <Loading v-if="loading"/>
     <div v-else class="post-view container">
       <div v-if="profile.id && profile.id == post.user_id" class="blog-actions">
        <router-link class="router-button" :to="{ name: 'PostEdit', params:{post: post.id} }">Edit Post</router-link>
      </div>
      <div class="quillWrapper">
        <h2>{{ post.title }}</h2>
        <h4>Posted on: {{ new Date(post.date).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
        <img class="coverPhoto" :src="post.coverPhoto" alt="" />
        <div class="post-content ql-editor" v-html="post.text"></div>
      </div>
     </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
export default {
    name: "PostView",
    async created() {
        await this.$store.dispatch("posts/getPost", this.$route.params.post);
    },
    computed: {
        post() {
            return this.$store.state.posts.post;
        },
        profile() {
            return this.$store.state.auth.profile;
        },

        loading(){
          return !this.$store.state.posts.postLoaded
        }
    },
    components: { Loading }
};
</script>

<style>
.post-view h4 {
    font-weight: 400;
    font-size: 0.8em;
    margin-bottom: 1.5em;
}

.post-view img.coverPhoto{
  max-height: 30em;
  max-width: 80%;
}

.post-view .quillWrapper img:not(.coverPhoto){
  max-height: 25em;
  max-width: 30em;
}

.blog-actions {
  margin: 2em auto;
}

.blog-actions button {
    margin-right: 1em;
}

.router-button {
    text-decoration: none;
    color: #fff;
}

.router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 0.8em;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 1.5em;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
}

.router-button:hover {
    background-color: rgba(48, 48, 48, 0.7);
}

</style>