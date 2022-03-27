<template>
  <div>
     <Loading v-if="loading"/>
     <div v-else class="post-view container">
       <div v-if="profile.id && profile.id == post.user_id" class="blog-actions">
        <router-link class="router-button" :to="{ name: 'PostEdit', params:{post: post.id} }">Edit Post</router-link>
      </div>
      <div class="quillWrapper">
        <h2>{{ post.title }}</h2>
        <h4>Posted on: {{ new Date(post.created_at).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
        <img :src="post.coverPhoto" alt="" />
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
    font-size: 14px;
    margin-bottom: 24px;
}

.post-view.container {
    padding: 1em 4em;
}


.blog-actions {
  margin: 2em auto;
}

.blog-actions button {
    margin-right: 16px;
}

.router-button {
    text-decoration: none;
    color: #fff;
}

.router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
}

.router-button:hover {
    background-color: rgba(48, 48, 48, 0.7);
}

</style>