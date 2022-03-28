<template>
  <div class="blog-card-wrap">
    <Loading v-if="loading"/>
    <div v-else class="blog-cards d-flex flex-wrap justify-content-center">
      <PostCard :post="post" v-for="(post, index) in posts" :key="index" :profile="profile" />
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import Loading from "@/components/Loading.vue";
export default {
    name: "PostsIndexView",
    computed: {
        posts() {
          return this.$store.state.posts.posts;
        },

        profile(){
          return this.$store.state.auth.profile
        },

        loading(){
          return !this.$store.state.posts.postLoaded
        }
    },
  
    components: { PostCard, Loading }
};
</script>
