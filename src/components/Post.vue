<template>
  <div class="blog-wrapper" :class="{ 'no-user': !user }">
    <div class="blog-content">
      <div>
        <h2>{{ post.title }}</h2>
        <p class="content-preview" v-html="post.text"></p>
        <router-link class="link" :to="{ name: 'Post', params: { post: post.id } }">
          View The Post <i class="fa-solid fa-chevron-right arrow"></i>
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img :src="post.coverPhoto" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post:{
      type:Object,
      default: () => ({})
    }
  },
  
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style scoped>
.blog-wrapper {
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.blog-wrapper .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2; 
}

.blog-wrapper .blog-content div {
    max-width: 375px;
    padding: 72px 24px;   
}

.blog-wrapper .blog-content div h2{
    font-size: 32px;
    font-weight: 300;
    text-transform: uppercase;
    margin-bottom: 24px;
}
.blog-wrapper .blog-content div p {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.7;
}
.blog-wrapper .blog-content div .content-preview {
    font-size: 13px;
    max-height: 24px;
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.blog-wrapper .blog-content div .link {
    display: inline-flex;
    align-items: center;
    margin-top: 32px;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease-in all;
}

.blog-wrapper .blog-content div .link:hover {
    border-bottom-color: #303030;
} 
.blog-wrapper .blog-content div .link-light:hover {
    border-bottom-color: #ffff;
}
.blog-wrapper .blog-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.blog-wrapper .blog-photo img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@media (min-width: 692px) {
    .blog-wrapper {
        min-height: 650px;
        max-height: 650px;
        flex-direction: row;
    }
    
    .blog-wrapper .blog-content {
        order: 1;
    }
    .blog-wrapper .blog-photo{
        order: 2;

    }

    .blog-wrapper .blog-content div{
        padding: 0 24px;
    }

    .blog-wrapper .blog-content div h2 {
        font-size: 40px;
    }
}

@media (min-width: 768px) {
    .blog-wrapper .blog-photo{
        flex: 4;
    }

    .blog-wrapper .blog-content {
      flex: 3;
    }
}
.blog-wrapper:nth-child(even) .blog-content {
    order: 2;
}

.blog-wrapper:nth-child(even) .blog-photo {
    order: 1;
}
.no-user:first-child .blog-content {
    background-color: #303030;
    color: #fff;
}
</style>