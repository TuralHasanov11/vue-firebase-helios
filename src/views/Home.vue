<template>
  <div class="home">
     <Loading v-if="loading" />
      <template v-else>
        <Banner v-if="!user" />
        <Post :post="post" v-for="(post, index) in postsRecent" :key="index" />
        <div class="blog-card-wrap">
          <div class="container">
            <h3>View More Recent Blogs</h3>
            <div class="blog-cards">
              <PostCard :post="post" v-for="(post, index) in posts" :key="index" />
            </div>
          </div>
        </div>
        <div v-if="!user" class="updates">
          <div class="container">
            <h2>never miss a post. Register for your free account today!</h2>
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
      return this.$store.getters['posts/postsRecent'];
    },
    posts() {
      return this.$store.getters['posts/posts'];
    },
    user() {
      return this.$store.state.auth.user;
    },

    loading(){
      return !this.$store.state.posts.postLoaded
    }
  },
};
</script>

<style scoped>
.blog-card-wrap h3{
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
}
.updates .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.updates .container .router-button {
  display: flex;
  font-size: 14px;
  text-decoration: none;
}
.updates .container h2 {
  font-weight: 300;
  font-size: 32px;
  max-width: 425px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .updates .container{
    padding: 125px 25px;
    flex-direction: row;
  }

  h2 {   
    text-align: initial;
    font-size: 40px;
  }

  .router-button {
    margin-left: auto;
  }
}
</style>