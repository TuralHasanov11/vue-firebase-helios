<template>
  <div class="home">
     <Loading v-if="loading" />
      <template v-else>
        <Banner v-if="!user" />
        <Post :post="post" v-for="(post, index) in postsRecent" :key="index" />
        <div class="blog-card-wrap">
          <div class="container">
            <h3>View More Recent Blogs</h3>
            <div class="blog-cards d-flex flex-wrap justify-content-center">
              <PostCard :post="post" v-for="(post, index) in posts" :key="index" :profile="profile" />
            </div>
          </div>
        </div>
        <div v-if="!user" class="updates">
          <div class="container text-center">
            <h2>Register for your free account!</h2>
            <router-link class="router-button" :to="{name:'Register'}"> Register for FireBlogs <i class="fa-solid fa-arrow-right-long-to-line"></i> </router-link>
          </div>
        </div>
      </template>
  </div>
</template>

<script>
import Post from "@/components/Post";
import Banner from "@/components/Banner.vue";
import PostCard from "@/components/PostCard.vue";
import Loading from "@/components/Loading.vue";
export default {
  name: "HomeView",
  components: { Post, Banner, PostCard, Loading },
 
  computed: {
    postsRecent() {
      return this.$store.state.posts.posts.slice(0, 2);
    },
    posts() {
      return this.$store.getters['posts/posts'];
    },
    user() {
      return this.$store.state.auth.user;
    },

    loading(){
      return !this.$store.state.posts.postLoaded
    },

    profile(){
      return this.$store.state.auth.profile
    }
  },
};
</script>

<style scoped>
.blog-card-wrap h3{
    font-weight: 300;
    font-size: 1.5em;
    margin-bottom: 2em;
}

.updates .container .router-button {
  font-size: 0.8em;
  text-decoration: none;
  background-color: #637acc;
}
.updates .container h2 {
  font-weight: 300;
  font-size: 2em;
  /* max-width: 425px; */
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1em;
}

@media (min-width: 768px) {
  .updates .container{
    padding: 7.5em 1.5em;
    flex-direction: row;
  }

  h2 {   
    text-align: initial;
    font-size: 2.5em;
  }

  .router-button {
    margin-left: auto;
  }
}
</style>